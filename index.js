// Set up the webserver and websocket server

express = require('express');  //web server
app = express();
server = require('http').createServer(app);	//Probar cambiar createServer por Server
io = require('socket.io').listen(server);	//web socket server

app.use(express.static('public'));	//./public/ contiene los archivos estaticos

app.get('/uHaz', function(req, res){
  res.sendFile(__dirname + '/public/main.html');
});

server.listen(8080); //start the webserver on port 8080

var serialport = require('serialport')	//open the serial port
var SerialPort = serialport.SerialPort
var ttyS1 = new SerialPort('/dev/ttyACM0', {
	baud: 9600,	//probar con 115200
	parser: serialport.parsers.readline('\r')
});

var queue = 0;	//variable para la cola de actualizaciones
var timerScheduler;	//variable para resetear el timer del actualizador
var user;	//variable para guardar el socket.id del ultimo cliente
var userAuth = false;	//variable para bloquear multiples clientes
var vars = require(__dirname + '/private/vars.json');

io.sockets.on('connection', function (socket) { //gets called whenever a client connects

	console.log('Connection');
	
	socket.on('auth', function(data){
		if (userAuth == true){
			socket.emit('ocupado');	//CAMBIAR NOMBRE AL EVENTO
		} else if (data != vars.passwd){
			socket.emit('authFail');
		} else {
			console.log('Auth!');

			userAuth = true;
			user = socket.id;
			socket.emit('authOK');

			socket.on('relaySet', function(data){
				var mensaje;
				if (data.set == true) {
					mensaje = 'R' + data.rId + '0\r';
				} else {
					mensaje = 'R' + data.rId + '1\r';
				}
				ttyS1.write(mensaje);
				var end = Date.now() + 100;
				while (Date.now() < end) {};
			});

			socket.on('turboSet', function(data){
				var mensaje;
				if (data.set == true) {
					mensaje = data.tId + '1\r';
				} else {
					mensaje = data.tId + '0\r';
				}
				ttyS1.write(mensaje);
				var end = Date.now() + 100;
				while (Date.now() < end) {};
			});

			socket.on('sensorSet', function(data){
				var mensaje;
				if (data.set == true) {
					mensaje = data.sId + '1\r';
				} else {
					mensaje = data.sId + '0\r';
				}
				ttyS1.write(mensaje);
				var end = Date.now() + 100;
				while (Date.now() < end) {};
			});


			function scheduler(){
				switch (queue++){
					case 0:
					case 6:
					case 12:
						ttyS1.write('M13?\r');
						break;
					case 1:
					case 10:
						ttyS1.write('Rvx=\r');
						break;
					case 2:
						ttyS1.write('Rcx=\r');
						break;
					case 3:
					case 9:
					case 15:
						ttyS1.write('M14?\r');
						break;
					case 4:
					case 13:
						ttyS1.write('TC1?\r');
						break;
					case 5:
						ttyS1.write('M11?\r');
						break;
					case 7:
						ttyS1.write('TC2?\r');
						break;
					case 8:
						ttyS1.write('TC3?\r');
						break;
					case 11:
						ttyS1.write('M12?\r');
						break;
					case 14:
						ttyS1.write('M21?\r');
						break;
					case 16:
						ttyS1.write('TCx=\r');
						queue = 0;


					//Casos para clasificar (y asignar prioridad)
					//ttyS1.write('Rvx=\r');	M	1	10
					//ttyS1.write('Rcx=\r');	L	2
					//ttyS1.write('TC1?\r');	M	4	13
					//ttyS1.write('TC2?\r');	L	7
					//ttyS1.write('TC3?\r');	L	8
					//ttyS1.write('M11?\r');	L	5
					//ttyS1.write('M12?\r');	L	11
					//ttyS1.write('M13?\r');	Hi	0	6	12
					//ttyS1.write('M14?\r');	Hi	3	9	15
					//ttyS1.write('M21?\r');	L	14
					//ttyS1.write('TCx=\r');	L	16

				}
				timerScheduler = setTimeout(scheduler, 600);	//este se ejecuta cada cierto T
			}

			timerScheduler = setTimeout(scheduler, 100);	//este se ejecuta 1 sola vez (al conectarse un cliente)

		}
	});

	socket.on('deauth', function(data){
		console.log('Deauth!');
		if (socket.id == user){
			userAuth = false;
		}
		clearTimeout(timerScheduler);
		queue = 0;
	});

	socket.on('disconnect', function(){
		console.log('Disconnection');
		if (socket.id == user){
			userAuth = false;
		}
		clearTimeout(timerScheduler);
		socket.disconnect();
	});

});

ttyS1.on('data', function (data){	//Arduino ---> Host
	io.sockets.emit('serial', data);
	console.log(data);

	if (data[0] == 's' && data[2] == 'v'){	//sRv0000000000000000
		io.sockets.emit('statusRv', data);
	}

	if (data[0] == 's' && data[2] == 'c'){	//sRc00000
		io.sockets.emit('statusRc', data);
	}

/* 	if (data[0] == 's' && data[1] == 'M'){	//sMG000
		io.sockets.emit('statusMG', data);
	} */

	if (data[0] == 's' && data[1] == 'T'){	//sTC0000
		io.sockets.emit('statusTC', data);
	}

	if (data[0] == 'M'){
		var mensaje = 'Error';
		switch (data[3]){	//Byte status
			case '0':	//0 - Lectura OK
				if(isNaN(data[4]) || isNaN(data[5]) || isNaN(data[6]) || isNaN(data[7]) || isNaN(data[9])){
					mensaje = 'Error';
				} else {
					mensaje = data[4] + '.' + data[5] + data[6] + data[7] + 'E' + data[8] + data[9];
				}
				break;
			case '1':	//1 - Under Range
				mensaje = 'UNDRNG';
				break;
			case '2':	//2 - Over Range
				mensaje = 'OVRRNG';
				break;
			case '3':	//3 - Sensor Error
				mensaje = 'SNERR';
				break;
			case '4':	//4 - Sensor OFF
				mensaje = 'SNOFF';
				break;
			case '5':	//5 - No Sensor
				mensaje = 'NOSN';
				break;
			case '6':	//6 - Sensor Identification Error
				mensaje = 'IDERR';
		}
		io.sockets.emit('Mg', {id: data[1], cabezal: data[2], mensaje: mensaje});
	}

	if (data[0] == 'T'){
		var velocidad = data[2] + data[3] + data[4];
		io.sockets.emit('vTC', {id: data[1], velocidad: velocidad});
	}
});







