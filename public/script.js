var socket = io.connect();

function $(id) {	//document.getElementById('id') => $('id')
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
	for (id = 1; id < 5; id++){
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

/* function relaySet(rId){
	if (false) {	//condicion especial / modo mantenimiento (no implementada aun)
		socket.emit('relaySet', {rId: rId, set: $(rId).checked});
	} else if ($(rId).checked == true && rId[0] == 'v') {	//Seccion Valvulas (Preverificacion Apertura)
		var check = confirm("Abrir Valvula " + $(rId).name + "?");
		if (check == true) {	//Siempre realizar confirmacion
			if (rId == 'v0') {	//Valvula a verificar
				if ($('v1').checked == true ||
					$('v5').checked == true ||
					$('v3').checked == true) {
					modalAlert("~Cerrar Valvula Scroll End Station<br>~Cerrar Plato End Station<br>~Cerrar Plato Turbo 1");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'v1') {	//Valvula a verificar
				if ($('v5').checked == true ||
					$('v3').checked == true ||
					$('c2').checked == false ||
					$('v0').checked == true) {
					modalAlert("~Cerrar Plato End Station<br>~Cerrar Plato Turbo 1<br>~Encender Scroll End Station<br>~Cerrar Valvula Salida End Station");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'v2') {	//Valvula a verificar
				if ($('c2').checked == false) {
					modalAlert("~Encender Scroll End Station");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'v3') {	//Valvula a verificar
				if ($('Mg13').innerHTML[6] != '-' ||
					(parseInt($('Mg13').innerHTML[7]) || 0) < 1 ||	// || 0 arregla parseInt NaN
					$('v2').checked == false) {
					modalAlert("~Verificar Presion End Station<br>~Abrir Valvula Scroll Turbo 1");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'v4') {	//Valvula a verificar
				if ($('c3').checked == false) {
					modalAlert("~Encender Scroll Object Slit");
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
					modalAlert("~Verificar Presion End Station/Object Slit<br>~Cerrar Plato Turbo 2<br>~Cerrar Plato Ionica 1<br>~Cerrar Plato Ionica 2");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'v6') {	//Valvula a verificar
				if ($('v4').checked == false) {
					modalAlert("~Abrir Valvula Scroll Turbo 2");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'v7' || rId == 'v8') {	//Valvula a verificar
				if ($('Mg14').innerHTML[6] != '-' ||
					(parseInt($('Mg14').innerHTML[7]) || 0) < 5) {
					modalAlert("~Verificar Presion Object Slit");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'v9') {	//Valvula a verificar
				if (true) {
					modalAlert("~Apertura habilitada solo en modo mantenimiento");
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
					modalAlert("~Encender Scroll Object Slit<br>~Cerrar Plato End Station<br>~~Cerrar Plato Turbo 2<br>~Cerrar Plato Turbo 3<br>~Cerrar Plato Object Slit<br>~Cerrar Plato Ionica 1<br>~Cerrar Plato Ionica 2");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'vB') {	//Valvula a verificar
				if ($('c3').checked == false) {
					modalAlert("~Encender Scroll Object Slit");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'vC') {	//Valvula a verificar
				if ($('Mg14').innerHTML[6] != '-' ||
					(parseInt($('Mg14').innerHTML[7]) || 0) < 1 ||
					$('vB').checked == false) {
					modalAlert("~Verificar Presion Object Slit<br>~Abrir Valvula Scroll Turbo 3");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'vD') {	//Valvula a verificar
				if ($('Mg14').innerHTML[6] != '-' ||
					$('Mg21').innerHTML[6] != '-' ||
					(Math.abs(parseInt($('Mg14').innerHTML[7])-parseInt($('Mg21').innerHTML[7])) || 11) > 1) {
					modalAlert("~Verificar Presion Object Slit/Acelerador");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'vE') {	//Valvula a verificar
				if ($('Mg21').innerHTML[6] != '-' ||
					(parseInt($('Mg21').innerHTML[7]) || 0) < 5) {
					modalAlert("~Verificar Presion Acelerador");
					$(rId).checked = false;
				} else {	//All OK, proceed to open
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'vF') {	//Valvula a verificar
				if (true) {
					modalAlert("~Valvula no implementada / conectada");
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
					modalAlert("~Apagar cabezales");
					$(rId).checked = true;
				} else if ($('TC1').checked == true || 
							$('TC2').checked == true || 
							$('TC3').checked == true) {
					modalAlert("~Apagar turbos");
					$(rId).checked = true;
				} else {
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'c3') {
				if ($('v4').checked == true ||
					$('vA').checked == true ||
					$('vB').checked == true) {
					modalAlert("~Cerrar Valvula Scroll Turbo 2<br>~Cerrar Valvula Scroll Object Slit<br>~Cerrar Valvula Scroll Turbo 3");
					$(rId).checked = true;
				} else {	//All OK, proceed to shutdown
					socket.emit('relaySet', {rId: rId, set: $(rId).checked});
				}
			} else if (rId == 'c2'){
				if ($('v1').checked == true ||
					$('v2').checked == true) {
					modalAlert("~Cerrar Valvula Scroll End Station<br>~Cerrar Valvula Scroll Turbo 1");
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
} */

/* function sensorSet(sId) {
	if ($(sId).checked == true) {
		var check = confirm("Encender " + $(sId).name + "?");
		if (check == true) {
			if ($('c0').checked == false) {
				modalAlert("Prender Maxigauge");
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
} */

/* function turboSet(tId) {
	if ($(tId).checked == true) {
		var check = confirm("Encender " + $(tId).name + "?");
		if (check == true) {
			if ($('c0').checked == false) {
				modalAlert("Prender Controladora Turbo");
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
} */

function modalAlert(textAlert) {
	$('modalAlert').style.display = 'block';
	$('modalAlert-text').innerHTML = textAlert;
}

function closeAlert() {
	$('modalAlert').style.display = 'none';
}

function set(id) {
	window.ultimoId = id;	//Stores last id in a global variable
	window.lastStat = $(id).checked;	//Stores last stat in a global variable
	if (revisarEnclavamientos(id, window.lastStat)) {
		$('modalConfirm').style.display = 'block';
		if (window.lastStat){
			$('modalConfirm-text').innerHTML = 'Abrir/Encender ' + $(id).name + '?';
		} else {
			$('modalConfirm-text').innerHTML = 'Cerrar/Apagar ' + $(id).name + '?';
		}
	} else {
		modalAlert(conditions(id, window.lastStat));
		$(id).checked = !window.lastStat;
	}
}

function modalConfirm(value) {
	var id = window.ultimoId;
	$('modalConfirm').style.display = 'none';
	if (value == 1){
		if (id[0] == 'v' || id[0] == 'c'){
			socket.emit('relaySet', {rId: id, set: window.lastStat});
		} else if (id[0] == 'M'){
			socket.emit('sensorSet', {sId: id, set: window.lastStat});
		} else if (id[0] == 'T'){
			socket.emit('turboSet', {tId: id, set: window.lastStat});
		}
		$(id).checked = window.lastStat;
	} else {
		$(id).checked = !window.lastStat;
	}
}



