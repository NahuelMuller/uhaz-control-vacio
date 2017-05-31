var socket = io.connect();


//Server ---> Client

socket.on('authFail', function(){
	window.alert('La contraseña es incorrecta');
	document.getElementById('auth').checked = false;
});

socket.on('authOK', function(){
	document.getElementById('disablingDiv').style.display = 'none';
	document.getElementById('auth').checked = true;
	document.getElementById('pass').style.display = 'none';
});

socket.on('ocupado', function(){
	window.alert('La aplicacion ya esta en uso por otro cliente');
	document.getElementById('auth').checked = false;
});

socket.on('serial', function (data) {
	//document.getElementById('text').innerHTML = data.value;
	document.getElementById('text').innerHTML = data;	//7.11.16 resta probar
});

socket.on('statusRv', function(data){
	for (id = 0; id < 10; id++){
		if (data[id + 3] == 0){
			document.getElementById('v' + id).checked = true;
		} else if (data[id + 3] == 1){
			document.getElementById('v' + id).checked = false;
		}
	}
	for (id = 10; id < 16; id++){
		if (data[id + 3] == 0){
			document.getElementById('v' + id.toString(16).toUpperCase()).checked = true;
		} else if (data[id + 3] == 1){
			document.getElementById('v' + id.toString(16).toUpperCase()).checked = false;
		}
	}
});

socket.on('statusRc', function(data){
	for (id = 0; id < 5; id++){
		if (data[id + 3] == 0){
			document.getElementById('c' + id).checked = true;
		} else if (data[id + 3] == 1){
			document.getElementById('c' + id).checked = false;
		}
	}
});

/* socket.on('statusMG', function(data){
	if (data[3] == 1){
		document.getElementById('M13').checked = true;
	} else {
		document.getElementById('M13').checked = false;
	}
	if (data[4] == 1){
		document.getElementById('M14').checked = true;
	} else {
		document.getElementById('M14').checked = false;
	}
	if (data[5] == 1){
		document.getElementById('M21').checked = true;
	} else {
		document.getElementById('M21').checked = false;
	}
}); */

socket.on('statusTC', function(data){
	for (id = 1; id < 4; id++){
		if (data[id + 2] == 1){
			document.getElementById('TC' + id).checked = true;
		} else {
			document.getElementById('TC' + id).checked = false;
		}
	}
});

socket.on('Mg', function(data){
	document.getElementById('Mg' + data.id + data.cabezal).innerHTML = data.mensaje;
	if (data.mensaje == 'SNOFF' || data.mensaje == 'NOSN' || data.mensaje == 'Error') {
		document.getElementById('M' + data.id + data.cabezal).checked = false;
	} else {
		document.getElementById('M' + data.id + data.cabezal).checked = true;
	}
});

socket.on('vTC', function(data){
	document.getElementById('vTC' + data.id).innerHTML = data.velocidad + ' Hz';
});

//Client ---> Server

function auth(enter){
	var pass = document.getElementById('pass').value;
	var checked = document.getElementById('auth').checked;
	if (checked == true || enter == 1){
		socket.emit('auth', pass);
	} else {
		socket.emit('deauth');
		document.getElementById('disablingDiv').style.display = 'block';
		document.getElementById('pass').style.display = 'block';
	}
	document.getElementById('pass').value = '';
}

function relaySet(rId){
	if (false) {	//condicion especial / modo mantenimiento (no implementada aun)
		socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
	} else if (document.getElementById(rId).checked == true && rId[0] == 'v') {	//Seccion Valvulas (Preverificacion Apertura)
		var check = confirm("Abrir Valvula " + document.getElementById(rId).name + "?");
		if (check == true) {	//Siempre realizar confirmacion
			if (rId == 'v0') {	//Valvula a verificar
				if (document.getElementById('v1').checked == true ||
					document.getElementById('v5').checked == true ||
					document.getElementById('v3').checked == true) {
					alert("~Cerrar Valvula Scroll End Station\n~Cerrar Plato End Station\n~Cerrar Plato Turbo 1");
					document.getElementById(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else if (rId == 'v1') {	//Valvula a verificar
				if (document.getElementById('v5').checked == true ||
					document.getElementById('v3').checked == true ||
					document.getElementById('c2').checked == false ||
					document.getElementById('v0').checked == true) {
					alert("~Cerrar Plato End Station\n~Cerrar Plato Turbo 1\n~Encender Scroll End Station\n~Cerrar Valvula Salida End Station");
					document.getElementById(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else if (rId == 'v2') {	//Valvula a verificar
				if (document.getElementById('c2').checked == false) {
					alert("~Encender Scroll End Station");
					document.getElementById(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else if (rId == 'v3') {	//Valvula a verificar
				if (document.getElementById('Mg13').innerHTML[6] != '-' ||
					(parseInt(document.getElementById('Mg13').innerHTML[7]) || 0) < 1 ||	// || 0 arregla parseInt NaN
					document.getElementById('v2').checked == false) {
					alert("~Verificar Presion End Station\n~Abrir Valvula Scroll Turbo 1");
					document.getElementById(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else if (rId == 'v4') {	//Valvula a verificar
				if (document.getElementById('c3').checked == false) {
					alert("~Encender Scroll Object Slit");
					document.getElementById(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else if (rId == 'v5') {	//Valvula a verificar
				if (document.getElementById('Mg13').innerHTML[6] != '-' ||
					document.getElementById('Mg14').innerHTML[6] != '-' ||
					(Math.abs(parseInt(document.getElementById('Mg13').innerHTML[7])-parseInt(document.getElementById('Mg14').innerHTML[7])) || 11) > 1 ||
					document.getElementById('v6').checked == true ||
					document.getElementById('v7').checked == true ||
					document.getElementById('v8').checked == true) {
					alert("~Verificar Presion End Station/Object Slit\n~Cerrar Plato Turbo 2\n~Cerrar Plato Ionica 1\n~Cerrar Plato Ionica 2");
					document.getElementById(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else if (rId == 'v6') {	//Valvula a verificar
				if (document.getElementById('v4').checked == false) {
					alert("~Abrir Valvula Scroll Turbo 2");
					document.getElementById(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else if (rId == 'v7' || rId == 'v8') {	//Valvula a verificar
				if (document.getElementById('Mg14').innerHTML[6] != '-' ||
					(parseInt(document.getElementById('Mg14').innerHTML[7]) || 0) < 5) {
					alert("~Verificar Presion Object Slit");
					document.getElementById(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else if (rId == 'v9') {	//Valvula a verificar
				if (true) {
					alert("~Apertura habilitada solo en modo mantenimiento");
					document.getElementById(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else if (rId == 'vA') {	//Valvula a verificar
				if (document.getElementById('c3').checked == false ||
					document.getElementById('v5').checked == true ||
					document.getElementById('v6').checked == true ||
					document.getElementById('vC').checked == true ||
					document.getElementById('vD').checked == true ||
					document.getElementById('v7').checked == true ||
					document.getElementById('v8').checked == true) {
					alert("~Encender Scroll Object Slit\n~Cerrar Plato End Station\n~~Cerrar Plato Turbo 2\n~Cerrar Plato Turbo 3\n~Cerrar Plato Object Slit\n~Cerrar Plato Ionica 1\n~Cerrar Plato Ionica 2");
					document.getElementById(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else if (rId == 'vB') {	//Valvula a verificar
				if (document.getElementById('c3').checked == false) {
					alert("~Encender Scroll Object Slit");
					document.getElementById(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else if (rId == 'vC') {	//Valvula a verificar
				if (document.getElementById('Mg14').innerHTML[6] != '-' ||
					(parseInt(document.getElementById('Mg14').innerHTML[7]) || 0) < 1 ||
					document.getElementById('vB').checked == false) {
					alert("~Verificar Presion Object Slit\n~Abrir Valvula Scroll Turbo 3");
					document.getElementById(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else if (rId == 'vD') {	//Valvula a verificar
				if (document.getElementById('Mg14').innerHTML[6] != '-' ||
					document.getElementById('Mg21').innerHTML[6] != '-' ||
					(Math.abs(parseInt(document.getElementById('Mg14').innerHTML[7])-parseInt(document.getElementById('Mg21').innerHTML[7])) || 11) > 1) {
					alert("~Verificar Presion Object Slit/Acelerador");
					document.getElementById(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else if (rId == 'vE') {	//Valvula a verificar
				if (document.getElementById('Mg21').innerHTML[6] != '-' ||
					(parseInt(document.getElementById('Mg21').innerHTML[7]) || 0) < 5) {
					alert("~Verificar Presion Acelerador");
					document.getElementById(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else if (rId == 'vF') {	//Valvula a verificar
				if (true) {
					alert("~Valvula no implementada / conectada");
					document.getElementById(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			}
		} else {	//check == false
			document.getElementById(rId).checked = false;
		}
	} else if (document.getElementById(rId).checked == false && rId[0] == 'c') {	//Seccion Controladores (Preverificacion Apagado)
		var check = confirm("Apagar " + document.getElementById(rId).name + "?");
		if (check == true) {
			if (rId == 'c0') {
				if (document.getElementById('M13').checked == true || 
						document.getElementById('M14').checked == true || 
						document.getElementById('M21').checked == true) {
					alert("~Apagar cabezales");
					document.getElementById(rId).checked = true;
				} else if (document.getElementById('TC1').checked == true || 
							document.getElementById('TC2').checked == true || 
							document.getElementById('TC3').checked == true) {
					alert("~Apagar turbos");
					document.getElementById(rId).checked = true;
				} else {
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else if (rId == 'c3') {
				if (document.getElementById('v4').checked == true ||
					document.getElementById('vA').checked == true ||
					document.getElementById('vB').checked == true) {
					alert("~Cerrar Valvula Scroll Turbo 2\n~Cerrar Valvula Scroll Object Slit\n~Cerrar Valvula Scroll Turbo 3");
					document.getElementById(rId).checked = true;
				} else {	//All OK, proceed to shutdown
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else if (rId == 'c2'){
				if (document.getElementById('v1').checked == true ||
					document.getElementById('v2').checked == true) {
					alert("~Cerrar Valvula Scroll End Station\n~Cerrar Valvula Scroll Turbo 1");
					document.getElementById(rId).checked = true;
				} else {	//All OK, proceed to shutdown
					socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
				}
			} else {
				socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
			}
		} else {
			document.getElementById(rId).checked = true;
		}
	} else if ((document.getElementById(rId).checked == false && rId[0] == 'v') ||
				(document.getElementById(rId).checked == true && rId[0] == 'c')) {	//Seccion Cerrado Valvulas y Prendido Controladores
		socket.emit('relaySet', {rId: rId, set: document.getElementById(rId).checked});
	}
}

function sensorSet(sId) {
	if (document.getElementById(sId).checked == true) {
		var check = confirm("Encender " + document.getElementById(sId).name + "?");
		if (check == true) {
			if (document.getElementById('c0').checked == false) {
				alert("Prender Maxigauge");
				document.getElementById(sId).checked = false;
			} else {
				socket.emit('sensorSet', {sId: sId, set: document.getElementById(sId).checked});
			}
		} else {
			document.getElementById(sId).checked = false;
		}
	} else {
		var check = confirm("Apagar " + document.getElementById(sId).name + "?");
		if (check == true) {
			socket.emit('sensorSet', {sId: sId, set: document.getElementById(sId).checked});
		} else {
			document.getElementById(sId).checked = true;
		}

	}
}

function turboSet(tId) {
	if (document.getElementById(tId).checked == true) {
		var check = confirm("Encender " + document.getElementById(tId).name + "?");
		if (check == true) {
			if (document.getElementById('c0').checked == false) {
				alert("Prender Controladora Turbo");
				document.getElementById(tId).checked = false;
			} else {
				socket.emit('turboSet', {tId: tId, set: document.getElementById(tId).checked});
			}
		} else {
			document.getElementById(tId).checked = false;
		}
	} else {
		var check = confirm("Apagar " + document.getElementById(tId).name + "?");
		if (check == true) {
			socket.emit('turboSet', {tId: tId, set: document.getElementById(tId).checked});
		} else {
			document.getElementById(tId).checked = true;
		}
	}
}
