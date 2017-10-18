function revisarEnclavamientos(id, stat) {	//returns true if (id) can be (stat)
	switch (id){
		
		case 'v0':
			if (stat == true){
				if ($('v1').checked == true
					|| $('v3').checked == true
					|| $('v5').checked == true
					|| $('M13').checked == true
					|| parseInt($('vTC1').innerHTML) > 0) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			break;
			
		case 'v1':
			if (stat == true){
				if ($('v0').checked == true
					|| $('v3').checked == true
					|| $('v5').checked == true
					|| $('c2').checked == false
					|| parseInt($('vTC1').innerHTML) > 0) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			break;
			
		case 'v2':
			if (stat == true){
				if ($('c2').checked == false) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			break;
			
		case 'v3':
			if (stat == true){
				if ($('v0').checked == true
					|| $('v1').checked == true
					|| $('v2').checked == false
					|| $('Mg13').innerHTML[6] != '-') {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			break;
			
		case 'v4':
			if (stat == true){
				if ($('c3').checked == false) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			break;
			
		case 'v5':
			if (stat == true){
				if ($('v3').checked == true
					|| $('v6').checked == true
					|| $('v7').checked == true
					|| $('v8').checked == true
					|| $('vD').checked == true
					|| $('Mg13').innerHTML[6] != '-'
					|| $('Mg14').innerHTML[6] != '-'
					|| parseInt($('Mg13').innerHTML[7]) < 3
					|| parseInt($('Mg14').innerHTML[7]) < 3) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			break;
			
		case 'v6':
			if (stat == true){
				if ($('v4').checked == false
					|| $('v9').checked == true
					|| $('vA').checked == true
					|| $('Mg14').innerHTML[6] != '-') {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			break;
			
		case 'v7':
		case 'v8':
			if (stat == true){
				if ($('Mg14').innerHTML[6] != '-'
					|| parseInt($('Mg14').innerHTML[7]) < 4) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			break;
			
		case 'v9':
			if (stat == true){
				if ($('v5').checked == true
					|| $('v6').checked == true
					|| $('v7').checked == true
					|| $('v8').checked == true
					|| $('vA').checked == true
					|| $('vC').checked == true
					|| $('vD').checked == true
					|| $('M14').checked == true
					|| parseInt($('vTC2').innerHTML) > 0
					|| parseInt($('vTC3').innerHTML) > 0) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			break;
			
		case 'vA':
			if (stat == true){
				if ($('v5').checked == true
					|| $('v6').checked == true
					|| $('v7').checked == true
					|| $('v8').checked == true
					|| $('v9').checked == true
					|| $('vC').checked == true
					|| $('vD').checked == true
					|| $('c3').checked == false
					|| parseInt($('vTC2').innerHTML) > 0
					|| parseInt($('vTC3').innerHTML) > 0) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			break;
			
		case 'vB':
			if (stat == true){
				if ($('c3').checked == false) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			break;
			
		case 'vC':
			if (stat == true){
				if ($('v9').checked == true
					|| $('vA').checked == true
					|| $('vB').checked == false
					|| $('Mg14').innerHTML[6] != '-') {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			break;
			
		case 'vD':
			if (stat == true){
				if ($('Mg14').innerHTML[6] != '-'
					|| $('Mg21').innerHTML[6] != '-'
					|| parseInt($('Mg14').innerHTML[7]) < 3
					|| parseInt($('Mg21').innerHTML[7]) < 3) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			break;
			
		case 'vE':
			if (stat == true){
				if ($('Mg21').innerHTML[6] != '-'
					|| parseInt($('Mg21').innerHTML[7]) < 4) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			break;
			
		case 'vF':	// "-Válvula no implementada/conectada"
			return false;
			break;
			
		case 'M13':
		case 'M14':
		case 'M21':
			if (stat == true){
				if ($('c0').checked == false) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			break;
			
		case 'c0':
			if (stat == true){
				return true;
			} else {
				if ($('M13').checked == true
					|| $('M14').checked == true
					|| $('M21').checked == true
					|| parseInt($('vTC1').innerHTML) > 0
					|| parseInt($('vTC2').innerHTML) > 0
					|| parseInt($('vTC3').innerHTML) > 0) {
					return false;
				} else {
					return true;
				}
			}
			break;
			
		case 'c1':
			if (stat == true){
				return true;
			} else {
				if ($('v7').checked == true
					|| $('v8').checked == true
					|| $('vE').checked == true) {
					return false;
				} else {
					return true;
				}
			}
			break;
			
		case 'c2':
			if (stat == true){
				return true;
			} else {
				if ($('v1').checked == true
					|| $('v2').checked == true) {
					return false;
				} else {
					return true;
				}
			}
			break;
			
		case 'c3':
			if (stat == true){
				return true;
			} else {
				if ($('v4').checked == true
					|| $('vA').checked == true
					|| $('vB').checked == true) {
					return false;
				} else {
					return true;
				}
			}
			break;
			
		case 'c4':
			if (stat == true){
				return true;
			} else {
				if (parseInt($('vTC1').innerHTML) > 0
					|| parseInt($('vTC2').innerHTML) > 0) {
					return false;
				} else {
					return true;
				}
			}
			break;
			
		case 'TC1':
			if (stat == true){
				if ($('v2').checked == false
					|| $('c0').checked == false) {
					return false;
				} else {
					return true;
				}
			} else {
				if ($('v3').checked == true) {
					return false;
				} else {
					return true;
				}
			}
			break;
			
		case 'TC2':
			if (stat == true){
				if ($('v4').checked == false
					|| $('c0').checked == false) {
					return false;
				} else {
					return true;
				}
			} else {
				if ($('v6').checked == true) {
					return false;
				} else {
					return true;
				}
			}
			break;
			
		case 'TC3':
			if (stat == true){
				if ($('vB').checked == false
					|| $('c0').checked == false) {
					return false;
				} else {
					return true;
				}
			} else {
				if ($('vC').checked == true) {
					return false;
				} else {
					return true;
				}
			}
			break;
	}
}


function conditions(id, stat) {	//returns a string that describes the condition to put (id) on (stat)
	var condition = "";			//Warning: Bad code ¯\_(ツ)_/¯
	switch (id){
		case 'v0':
			if (stat == true){
				if ($('v1').checked == true){
					condition = condition + "-Cerrar " + $('v1').name + "<br>";
				}
				if ($('v3').checked == true){
					condition = condition + "-Cerrar " + $('v3').name + "<br>";
				}
				if ($('v5').checked == true){
					condition = condition + "-Cerrar " + $('v5').name + "<br>";
				}
				if ($('M13').checked == true){
					condition = condition + "-Apagar " + $('M13').name + "<br>";
				}
				if (parseInt($('vTC1').innerHTML) > 0){
					condition = condition + "-Esperar frenado " + $('TC1').name + "<br>";
				}
			}
			break;
		case 'v1':
			if (stat == true){
				if ($('v0').checked == true){
					condition = condition + "-Cerrar " + $('v0').name + "<br>";
				}
				if ($('v3').checked == true){
					condition = condition + "-Cerrar " + $('v3').name + "<br>";
				}
				if ($('v5').checked == true){
					condition = condition + "-Cerrar " + $('v5').name + "<br>";
				}
				if ($('c2').checked == false){
					condition = condition + "-Encender " + $('c2').name + "<br>";
				}
				if (parseInt($('vTC1').innerHTML) > 0){
					condition = condition + "-Esperar frenado " + $('TC1').name + "<br>";
				}
			}
			break;
		case 'v2':
			if (stat == true){
				if ($('c2').checked == false){
					condition = condition + "-Encender " + $('c2').name + "<br>";
				}
			}
			break;
		case 'v3':
			if (stat == true){
				if ($('v0').checked == true){
					condition = condition + "-Cerrar " + $('v0').name + "<br>";
				}
				if ($('v1').checked == true){
					condition = condition + "-Cerrar " + $('v1').name + "<br>";
				}
				if ($('v2').checked == false){
					condition = condition + "-Abrir " + $('v2').name + "<br>";
				}
				if ($('Mg13').innerHTML[6] != '-'){
					condition = condition + "-Verificar Presi&oacuten End Station<br>";
				}
			}
			break;
		case 'v4':
			if (stat == true){
				if ($('c3').checked == false){
					condition = condition + "-Encender " + $('c3').name + "<br>";
				}
			}
			break;
		case 'v5':
			if (stat == true){
				if ($('v3').checked == true){
					condition = condition + "-Cerrar " + $('v3').name + "<br>";
				}
				if ($('v6').checked == true){
					condition = condition + "-Cerrar " + $('v6').name + "<br>";
				}
				if ($('v7').checked == true){
					condition = condition + "-Cerrar " + $('v7').name + "<br>";
				}
				if ($('v8').checked == true){
					condition = condition + "-Cerrar " + $('v8').name + "<br>";
				}
				if ($('vD').checked == true){
					condition = condition + "-Cerrar " + $('vD').name + "<br>";
				}
				if ($('Mg13').innerHTML[6] != '-'
					|| $('Mg14').innerHTML[6] != '-'
					|| parseInt($('Mg13').innerHTML[7]) < 3
					|| parseInt($('Mg14').innerHTML[7]) < 3){
					condition = condition + "-Verificar Presi&oacuten End Station/Object Slit<br>";
				}
			}
			break;
		case 'v6':
			if (stat == true){
				if ($('v4').checked == false){
					condition = condition + "-Abrir " + $('v4').name + "<br>";
				}
				if ($('v9').checked == true){
					condition = condition + "-Cerrar " + $('v9').name + "<br>";
				}
				if ($('vA').checked == true){
					condition = condition + "-Cerrar " + $('vA').name + "<br>";
				}
				if ($('Mg14').innerHTML[6] != '-'){
					condition = condition + "-Verificar Presi&oacuten Object Slit<br>";
				}
			}
			break;
		case 'v7':
		case 'v8':
			if (stat == true){
				if ($('Mg14').innerHTML[6] != '-'
					|| parseInt($('Mg14').innerHTML[7]) < 4){
					condition = condition + "-Verificar Presi&oacuten Object Slit<br>";
				}
			}
			break;
		case 'v9':
			if (stat == true){
				if ($('v5').checked == true){
					condition = condition + "-Cerrar " + $('v5').name + "<br>";
				}
				if ($('v6').checked == true){
					condition = condition + "-Cerrar " + $('v6').name + "<br>";
				}
				if ($('v7').checked == true){
					condition = condition + "-Cerrar " + $('v7').name + "<br>";
				}
				if ($('v8').checked == true){
					condition = condition + "-Cerrar " + $('v8').name + "<br>";
				}
				if ($('vA').checked == true){
					condition = condition + "-Cerrar " + $('vA').name + "<br>";
				}
				if ($('vC').checked == true){
					condition = condition + "-Cerrar " + $('vC').name + "<br>";
				}
				if ($('vD').checked == true){
					condition = condition + "-Cerrar " + $('vD').name	+ "<br>";
				}
				if ($('M14').checked == true){
					condition = condition + "-Apagar " + $('M14').name + "<br>";
				}
				if (parseInt($('vTC2').innerHTML) > 0){
					condition = condition + "-Esperar frenado " + $('TC2').name + "<br>";
				}
				if (parseInt($('vTC3').innerHTML) > 0){
					condition = condition + "-Esperar frenado " + $('TC3').name + "<br>";
				}
			}
			break;
		case 'vA':
			if (stat == true){
				if ($('v5').checked == true){
					condition = condition + "-Cerrar " + $('v5').name + "<br>";
				}
				if ($('v6').checked == true){
					condition = condition + "-Cerrar " + $('v6').name + "<br>";
				}
				if ($('v7').checked == true){
					condition = condition + "-Cerrar " + $('v7').name + "<br>";
				}
				if ($('v8').checked == true){
					condition = condition + "-Cerrar " + $('v8').name + "<br>";
				}
				if ($('v9').checked == true){
					condition = condition + "-Cerrar " + $('v9').name + "<br>";
				}
				if ($('vC').checked == true){
					condition = condition + "-Cerrar " + $('vC').name + "<br>";
				}
				if ($('vD').checked == true){
					condition = condition + "-Cerrar " + $('vD').name	+ "<br>";
				}
				if ($('c3').checked == false){
					condition = condition + "-Encender " + $('c3').name + "<br>";
				}
				if (parseInt($('vTC2').innerHTML) > 0){
					condition = condition + "-Esperar frenado " + $('TC2').name + "<br>";
				}
				if (parseInt($('vTC3').innerHTML) > 0){
					condition = condition + "-Esperar frenado " + $('TC3').name + "<br>";
				}
			}
			break;
		case 'vB':
			if (stat == true){
				if ($('c3').checked == false){
					condition = condition + "-Encender " + $('c3').name + "<br>";
				}
			}
			break;
		case 'vC':
			if (stat == true){
				if ($('v9').checked == true){
					condition = condition + "-Cerrar " + $('v9').name + "<br>";
				}
				if ($('vA').checked == true){
					condition = condition + "-Cerrar " + $('vA').name + "<br>";
				}
				if ($('vB').checked == false){
					condition = condition + "-Abrir " + $('vB').name + "<br>";
				}
				if ($('Mg14').innerHTML[6] != '-'){
					condition = condition + "-Verificar Presi&oacuten Object Slit<br>";
				}
			}
			break;
		case 'vD':
			if (stat == true){
				if ($('Mg14').innerHTML[6] != '-'
					|| $('Mg21').innerHTML[6] != '-'
					|| parseInt($('Mg14').innerHTML[7]) < 3
					|| parseInt($('Mg21').innerHTML[7]) < 3){
					condition = condition + "-Verificar Presi&oacuten Object Slit/Acelerador<br>";
				}
			}
			break;
		case 'vE':
			if (stat == true){
				if ($('Mg21').innerHTML[6] != '-'
					|| parseInt($('Mg21').innerHTML[7]) < 4){
					condition = condition + "-Verificar Presi&oacuten Acelerador<br>";
				}
			}
			break;
		case 'vF':
			if (stat == true){
				condition = condition + "-V&aacutelvula no implementada/conectada<br>";
			}
			break;

		case 'M13':
		case 'M14':
		case 'M21':
			if (stat == true){
				if ($('c0').checked == false){
					condition = condition + "-Encender " + $('c0').name + "<br>";
				}
			}
			break;

		case 'c0':
			if (stat == false){
				if ($('M13').checked == true){
					condition = condition + "-Apagar " + $('M13').name + "<br>";
				}
				if ($('M14').checked == true){
					condition = condition + "-Apagar " + $('M14').name + "<br>";
				}
				if ($('M21').checked == true){
					condition = condition + "-Apagar " + $('M21').name + "<br>";
				}
				if (parseInt($('vTC1').innerHTML) > 0){
					condition = condition + "-Esperar frenado " + $('TC1').name + "<br>";
				}
				if (parseInt($('vTC2').innerHTML) > 0){
					condition = condition + "-Esperar frenado " + $('TC2').name + "<br>";
				}
				if (parseInt($('vTC3').innerHTML) > 0){
					condition = condition + "-Esperar frenado " + $('TC3').name + "<br>";
				}
			}
			break;
		case 'c1':
			if (stat == false){
				if ($('v7').checked == true){
					condition = condition + "-Cerrar " + $('v7').name + "<br>";
				}
				if ($('v8').checked == true){
					condition = condition + "-Cerrar " + $('v8').name + "<br>";
				}
				if ($('vE').checked == true){
					condition = condition + "-Cerrar " + $('vE').name + "<br>";
				}
			}
			break;
		case 'c2':
			if (stat == false){
				if ($('v1').checked == true){
					condition = condition + "-Cerrar " + $('v1').name + "<br>";
				}
				if ($('v2').checked == true){
					condition = condition + "-Cerrar " + $('v2').name + "<br>";
				}
			}
			break;
		case 'c3':
			if (stat == false){
				if ($('v4').checked == true){
					condition = condition + "-Cerrar " + $('v4').name + "<br>";
				}
				if ($('vA').checked == true){
					condition = condition + "-Cerrar " + $('vA').name + "<br>";
				}
				if ($('vB').checked == true){
					condition = condition + "-Cerrar " + $('vB').name + "<br>";
				}
			}
			break;
		case 'c4':
			if (stat == false){
				if (parseInt($('vTC1').innerHTML) > 0){
					condition = condition + "-Esperar frenado " + $('TC1').name + "<br>";
				}
				if (parseInt($('vTC2').innerHTML) > 0){
					condition = condition + "-Esperar frenado " + $('TC2').name + "<br>";
				}
			}
			break;

		case 'TC1':
			if (stat == true){
				if ($('v2').checked == false){
					condition = condition + "-Abrir " + $('v2').name + "<br>";
				}
				if ($('c0').checked == false){
					condition = condition + "-Encender " + $('c0').name + "<br>";
				}
			} else {
				if ($('v3').checked == true){
					condition = condition + "-Cerrar " + $('v3').name + "<br>";
				}
			}
			break;
		case 'TC2':
			if (stat == true){
				if ($('v4').checked == false){
					condition = condition + "-Abrir " + $('v4').name + "<br>";
				}
				if ($('c0').checked == false){
					condition = condition + "-Encender " + $('c0').name + "<br>";
				}
			} else {
				if ($('v6').checked == true){
					condition = condition + "-Cerrar " + $('v6').name + "<br>";
				}
			}
			break;
		case 'TC3':
			if (stat == true){
				if ($('vB').checked == false){
					condition = condition + "-Abrir " + $('vB').name + "<br>";
				}
				if ($('c0').checked == false){
					condition = condition + "-Encender " + $('c0').name + "<br>";
				}
			} else {
				if ($('vC').checked == true){
					condition = condition + "-Cerrar " + $('vC').name + "<br>";
				}
			}
			break;
	}
	return condition;
}