var socket = io.connect();

var $ = function(id){	//document.getElementById('id') => $('id')
	return document.getElementById(id);
};

//Server ---> Client

socket.on('authFail', function(){
	window.alert('La contraseña es incorrecta');
	$('auth').checked = false;
});

socket.on('authOK', function(){
	$('disablingDiv').style.display = 'none';
	$('auth').checked = true;
	$('pass').style.display = 'none';
});

socket.on('ocupado', function(){
	window.alert('La aplicacion ya esta en uso por otro cliente');
	$('auth').checked = false;
});

socket.on('serial', function (data) {
	$('text').innerHTML = data;
});

socket.on('statusRv', function(data){
	for (id = 0; id < 10; id++){
		if (data[id + 3] == 0){
			$('v' + id).checked = true;
		} else if (data[id + 3] == 1){
			$('v' + id).checked = false;
		}
	}
	for (id = 10; id < 16; id++){
		if (data[id + 3] == 0){
			$('v' + id.toString(16).toUpperCase()).checked = true;
		} else if (data[id + 3] == 1){
			$('v' + id.toString(16).toUpperCase()).checked = false;
		}
	}
});

socket.on('statusRc', function(data){
	for (id = 0; id < 5; id++){
		if (data[id + 3] == 0){
			$('c' + id).checked = true;
		} else if (data[id + 3] == 1){
			$('c' + id).checked = false;
		}
	}
});

/* socket.on('statusMG', function(data){
	if (data[3] == 1){
		$('M13').checked = true;
	} else {
		$('M13').checked = false;
	}
	if (data[4] == 1){
		$('M14').checked = true;
	} else {
		$('M14').checked = false;
	}
	if (data[5] == 1){
		$('M21').checked = true;
	} else {
		$('M21').checked = false;
	}
}); */

socket.on('statusTC', function(data){
	for (id = 1; id < 4; id++){
		if (data[id + 2] == 1){
			$('TC' + id).checked = true;
		} else {
			$('TC' + id).checked = false;
		}
	}
});

socket.on('Mg', function(data){
	$('Mg' + data.id + data.cabezal).innerHTML = data.mensaje;
	if (data.mensaje == 'SNOFF' || data.mensaje == 'NOSN' || data.mensaje == 'Error') {
		$('M' + data.id + data.cabezal).checked = false;
	} else {
		$('M' + data.id + data.cabezal).checked = true;
	}
});

socket.on('vTC', function(data){
	$('vTC' + data.id).innerHTML = data.velocidad + ' Hz';
});

//Client ---> Server

function auth(enter){
	var pass = $('pass').value;
	var checked = $('auth').checked;
	if (checked == true || enter == 1){
		socket.emit('auth', pass);
	} else {
		socket.emit('deauth');
		$('disablingDiv').style.display = 'block';
		$('pass').style.display = 'block';
	}
	$('pass').value = '';
}

function relaySet(rId){
	if (false) {	//condicion especial / modo mantenimiento (no implementada aun)
		socket.emit('relaySet', {rId: rId, set: $(rId).checked});
	} else if ($(rId).checked == true && rId[0] == 'v') {	//Seccion Valvulas (Preverificacion Apertura)
		var check = confirm("Abrir Valvula " + $(rId).name + "?");
		if (check == true) {	//Siempre realizar confirmacion
			if (rId == 'v0') {	//Valvula a verificar
				if ($('v1').checked == true ||
					$('v5').checked == true ||
					$('v3').checked == true) {
					alert("~Cerrar Valvula Scroll End Station\n~Cerrar Plato End Station\n~Cerrar Plato Turbo 1");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'v1') {	//Valvula a verificar
				if ($('v5').checked == true ||
					$('v3').checked == true ||
					$('c2').checked == false ||
					$('v0').checked == true) {
					alert("~Cerrar Plato End Station\n~Cerrar Plato Turbo 1\n~Encender Scroll End Station\n~Cerrar Valvula Salida End Station");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'v2') {	//Valvula a verificar
				if ($('c2').checked == false) {
					alert("~Encender Scroll End Station");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'v3') {	//Valvula a verificar
				if ($('Mg13').innerHTML[6] != '-' ||
					(parseInt($('Mg13').innerHTML[7]) || 0) < 1 ||	// || 0 arregla parseInt NaN
					$('v2').checked == false) {
					alert("~Verificar Presion End Station\n~Abrir Valvula Scroll Turbo 1");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'v4') {	//Valvula a verificar
				if ($('c3').checked == false) {
					alert("~Encender Scroll Object Slit");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'v5') {	//Valvula a verificar
				if ($('Mg13').innerHTML[6] != '-' ||
					$('Mg14').innerHTML[6] != '-' ||
					(Math.abs(parseInt($('Mg13').innerHTML[7])-parseInt($('Mg14').innerHTML[7])) || 11) > 1 ||
					$('v6').checked == true ||
					$('v7').checked == true ||
					$('v8').checked == true) {
					alert("~Verificar Presion End Station/Object Slit\n~Cerrar Plato Turbo 2\n~Cerrar Plato Ionica 1\n~Cerrar Plato Ionica 2");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'v6') {	//Valvula a verificar
				if ($('v4').checked == false) {
					alert("~Abrir Valvula Scroll Turbo 2");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'v7' || rId == 'v8') {	//Valvula a verificar
				if ($('Mg14').innerHTML[6] != '-' ||
					(parseInt($('Mg14').innerHTML[7]) || 0) < 5) {
					alert("~Verificar Presion Object Slit");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'v9') {	//Valvula a verificar
				if (true) {
					alert("~Apertura habilitada solo en modo mantenimiento");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'vA') {	//Valvula a verificar
				if ($('c3').checked == false ||
					$('v5').checked == true ||
					$('v6').checked == true ||
					$('vC').checked == true ||
					$('vD').checked == true ||
					$('v7').checked == true ||
					$('v8').checked == true) {
					alert("~Encender Scroll Object Slit\n~Cerrar Plato End Station\n~~Cerrar Plato Turbo 2\n~Cerrar Plato Turbo 3\n~Cerrar Plato Object Slit\n~Cerrar Plato Ionica 1\n~Cerrar Plato Ionica 2");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'vB') {	//Valvula a verificar
				if ($('c3').checked == false) {
					alert("~Encender Scroll Object Slit");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'vC') {	//Valvula a verificar
				if ($('Mg14').innerHTML[6] != '-' ||
					(parseInt($('Mg14').innerHTML[7]) || 0) < 1 ||
					$('vB').checked == false) {
					alert("~Verificar Presion Object Slit\n~Abrir Valvula Scroll Turbo 3");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'vD') {	//Valvula a verificar
				if ($('Mg14').innerHTML[6] != '-' ||
					$('Mg21').innerHTML[6] != '-' ||
					(Math.abs(parseInt($('Mg14').innerHTML[7])-parseInt($('Mg21').innerHTML[7])) || 11) > 1) {
					alert("~Verificar Presion Object Slit/Acelerador");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'vE') {	//Valvula a verificar
				if ($('Mg21').innerHTML[6] != '-' ||
					(parseInt($('Mg21').innerHTML[7]) || 0) < 5) {
					alert("~Verificar Presion Acelerador");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'vF') {	//Valvula a verificar
				if (true) {
					alert("~Valvula no implementada / conectada");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			}
		} else {	//check == false
			$(rId).checked = false;
		}
	} else if ($(rId).checked == false && rId[0] == 'c') {	//Seccion Controladores (Preverificacion Apagado)
		var check = confirm("Apagar " + $(rId).name + "?");
		if (check == true) {
			if (rId == 'c0') {
				if ($('M13').checked == true || 
						$('M14').checked == true || 
						$('M21').checked == true) {
					alert("~Apagar cabezales");
					$(rId).checked = true;
				} else if ($('TC1').checked == true || 
							$('TC2').checked == true || 
							$('TC3').checked == true) {
					alert("~Apagar turbos");
					$(rId).checked = true;
				} else {
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'c3') {
				if ($('v4').checked == true ||
					$('vA').checked == true ||
					$('vB').checked == true) {
					alert("~Cerrar Valvula Scroll Turbo 2\n~Cerrar Valvula Scroll Object Slit\n~Cerrar Valvula Scroll Turbo 3");
					$(rId).checked = true;
				} else {	//All OK, proceed to shutdown
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'c2'){
				if ($('v1').checked == true ||
					$('v2').checked == true) {
					alert("~Cerrar Valvula Scroll End Station\n~Cerrar Valvula Scroll Turbo 1");
					$(rId).checked = true;
				} else {	//All OK, proceed to shutdown
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else {
				socket.emit('relaySet', {rId: rId, set: $(rId).checked});
			}
		} else {
			$(rId).checked = true;
		}
	} else if (($(rId).checked == false && rId[0] == 'v') ||
				($(rId).checked == true && rId[0] == 'c')) {	//Seccion Cerrado Valvulas y Prendido Controladores
		socket.emit('relaySet', {rId: rId, set: $(rId).checked});
	}
}

function sensorSet(sId) {
	if ($(sId).checked == true) {
		var check = confirm("Encender " + $(sId).name + "?");
		if (check == true) {
			if ($('c0').checked == false) {
				alert("Prender Maxigauge");
				$(sId).checked = false;
			} else {
				socket.emit('sensorSet', {sId: sId, set: $(sId).checked});
			}
		} else {
			$(sId).checked = false;
		}
	} else {
		var check = confirm("Apagar " + $(sId).name + "?");
		if (check == true) {
			socket.emit('sensorSet', {sId: sId, set: $(sId).checked});
		} else {
			$(sId).checked = true;
		}

	}
}

function turboSet(tId) {
	if ($(tId).checked == true) {
		var check = confirm("Encender " + $(tId).name + "?");
		if (check == true) {
			if ($('c0').checked == false) {
				alert("Prender Controladora Turbo");
				$(tId).checked = false;
			} else {
				socket.emit('turboSet', {tId: tId, set: $(tId).checked});
			}
		} else {
			$(tId).checked = false;
		}
	} else {
		var check = confirm("Apagar " + $(tId).name + "?");
		if (check == true) {
			socket.emit('turboSet', {tId: tId, set: $(tId).checked});
		} else {
			$(tId).checked = true;
		}
	}
}
