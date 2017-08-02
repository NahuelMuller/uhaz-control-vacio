function revisarEnclavamientos(id, stat) {	//returns true if (id) can be (stat)
	switch (id){
		
		case 'v0':
			if (stat == true){
				if ($('v1').checked == true
					|| $('v3').checked == true
					|| $('v5').checked == true
					|| $('M13').checked == true
					|| (parseInt($('vTC1').innerHTML) || 1) > 0) {	// (|| 0) fix parseInt(NaN), (NaN || 0 => 0)
					return false;									// When not used with boolean values, the OR (||) operator
				} else {											// returns the first expression that can be evaluated to true
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
					|| (parseInt($('vTC1').innerHTML) || 1) > 0) {
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
				if ((parseInt($('vTC1').innerHTML) || 1) > 0) {
					return false;
				} else {
					return true;
				}
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
				if ((parseInt($('vTC2').innerHTML) || 1) > 0) {
					return false;
				} else {
					return true;
				}
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
					|| (parseInt($('Mg13').innerHTML[7]) || 0) < 3
					|| (parseInt($('Mg14').innerHTML[7]) || 0) < 3) {
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
					|| (parseInt($('Mg14').innerHTML[7]) || 0) < 4) {
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
					|| (parseInt($('vTC2').innerHTML) || 1) > 0
					|| (parseInt($('vTC3').innerHTML) || 1) > 0) {
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
					|| (parseInt($('vTC2').innerHTML) || 1) > 0
					|| (parseInt($('vTC3').innerHTML) || 1) > 0) {
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
				if ((parseInt($('vTC3').innerHTML) || 1) > 0) {
					return false;
				} else {
					return true;
				}
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
					|| (parseInt($('Mg14').innerHTML[7]) || 0) < 3
					|| (parseInt($('Mg21').innerHTML[7]) || 0) < 3) {
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
					|| (parseInt($('Mg21').innerHTML[7]) || 0) < 4) {
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
					|| (parseInt($('vTC1').innerHTML) || 1) > 0
					|| (parseInt($('vTC2').innerHTML) || 1) > 0
					|| (parseInt($('vTC3').innerHTML) || 1) > 0) {
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
				if ((parseInt($('vTC1').innerHTML) || 1) > 0
					|| (parseInt($('vTC2').innerHTML) || 1) > 0
					|| (parseInt($('vTC3').innerHTML) || 1) > 0) {
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
	var condition = "";
	switch (id){
		case 'v0':
			if (stat == true){
				condition = "-Cerrar " + $('v1').name + "<br>-Cerrar " + $('v3').name
							+ "<br>-Cerrar " + $('v5').name + "<br>-Apagar " + $('M13').name
							+ "<br>-Esperar frenado " + $('TC1').name;
			}
			break;
		case 'v1':
			if (stat == true){
				condition = "-Cerrar " + $('v0').name + "<br>-Cerrar " + $('v3').name
							+ "<br>-Cerrar " + $('v5').name + "<br>-Encender " + $('c2').name
							+ "<br>-Esperar frenado " + $('TC1').name;
			}
			break;
		case 'v2':
			if (stat == true){
				condition = "<br>-Encender " + $('c2').name;
			} else {
				condition = "<br>-Esperar frenado " + $('TC1').name;
			}
			break;
		case 'v3':
			if (stat == true){
				condition = "-Cerrar " + $('v0').name + "<br>-Cerrar " + $('v1').name
							+ "<br>-Abrir " + $('v2').name + "<br>-Verificar Presión End Station";
			}
			break;
		case 'v4':
			if (stat == true){
				condition = "<br>-Encender " + $('c3').name;
			} else {
				condition = "<br>-Esperar frenado " + $('TC2').name;
			}
			break;
		case 'v5':
			if (stat == true){
				condition = "-Cerrar " + $('v3').name + "<br>-Cerrar " + $('v6').name
							+"-Cerrar " + $('v7').name + "<br>-Cerrar " + $('v8').name
							+"-Cerrar " + $('vD').name + "<br>-Verificar Presión End Station/Object Slit";
			}
			break;
		case 'v6':
			if (stat == true){
				condition = "-Abrir " + $('v4').name + "<br>-Cerrar " + $('v9').name
							+ "<br>-Cerrar " + $('vA').name + "<br>-Verificar Presión Object Slit";
			}
			break;
		case 'v7':
		case 'v8':
			if (stat == true){
				condition = "<br>-Verificar Presión Object Slit";
			}
			break;
		case 'v9':
			if (stat == true){
				condition = "-Cerrar " + $('v5').name + "<br>-Cerrar " + $('v6').name
							+ "<br>-Cerrar " + $('v7').name + "<br>-Cerrar " + $('v8').name
							+ "<br>-Cerrar " + $('vA').name + "<br>-Cerrar " + $('vC').name
							+ "<br>-Cerrar " + $('vD').name	+ "<br>-Apagar " + $('M14').name
							+ "<br>-Esperar frenado " + $('TC2').name
							+ "<br>-Esperar frenado " + $('TC3').name;
			}
			break;
		case 'vA':
			if (stat == true){
				condition = "-Cerrar " + $('v5').name + "<br>-Cerrar " + $('v6').name
							+ "<br>-Cerrar " + $('v7').name + "<br>-Cerrar " + $('v8').name
							+ "<br>-Cerrar " + $('v9').name + "<br>-Cerrar " + $('vC').name
							+ "<br>-Cerrar " + $('vD').name	+ "<br>-Encender " + $('c3').name
							+ "<br>-Esperar frenado " + $('TC2').name
							+ "<br>-Esperar frenado " + $('TC3').name;
			}
			break;
		case 'vB':
			if (stat == true){
				condition = "<br>-Encender " + $('c3').name;
			} else {
				condition = "<br>-Esperar frenado " + $('TC3').name;
			}
			break;
		case 'vC':
			if (stat == true){
				condition = "-Cerrar " + $('v9').name + "<br>-Cerrar " + $('vA').name 
							"<br>-Abrir " + $('vB').name + "<br>-Verificar Presión Object Slit";
			}
			break;
		case 'vD':
			if (stat == true){
				condition = "-Verificar Presión Object Slit/Acelerador";
			}
			break;
		case 'vE':
			if (stat == true){
				condition = "-Verificar Presión Acelerador";
			}
			break;
		case 'vF':
			if (stat == true){
				condition = "-Válvula no implementada/conectada";
			}
			break;

		case 'M13':
		case 'M14':
		case 'M21':
			if (stat == true){
				condition = "-Encender " + $('c0').name;
			}
			break;

		case 'c0':
			if (stat == false){
				condition = "-Apagar " + $('M13').name + "<br>-Apagar " + $('M14').name
							+ "<br>-Apagar " + $('M21').name
							+ "<br>-Esperar frenado " + $('TC1').name
							+ "<br>-Esperar frenado " + $('TC2').name
							+ "<br>-Esperar frenado " + $('TC3').name;
			}
			break;
		case 'c1':
			if (stat == false){
				condition = "-Cerrar " + $('v7').name + "<br>-Cerrar " + $('v8').name
							+ "<br>-Cerrar " + $('vE').name;
			}
			break;
		case 'c2':
			if (stat == false){
				condition = "-Cerrar " + $('v1').name + "<br>-Cerrar " + $('v2').name;
			}
			break;
		case 'c3':
			if (stat == false){
				condition = "-Cerrar " + $('v4').name + "<br>-Cerrar " + $('vA').name
							+ "<br>-Cerrar " + $('vB').name;
			}
			break;
		case 'c4':
			if (stat == false){
				condition = "-Esperar frenado " + $('TC1').name
							+ "<br>-Esperar frenado " + $('TC2').name
							+ "<br>-Esperar frenado " + $('TC3').name;
			}
			break;

		case 'TC1':
			if (stat == true){
				condition = "-Abrir " + $('v2').name + "<br>-Encender " + $('c0').name;
			} else {
				condition = "-Cerrar " + $('v3').name;
			}
			break;
		case 'TC2':
			if (stat == true){
				condition = "-Abrir " + $('v4').name + "<br>-Encender " + $('c0').name;
			} else {
				condition = "-Cerrar " + $('v6').name;
			}
			break;
		case 'TC3':
			if (stat == true){
				condition = "-Abrir " + $('vB').name + "<br>-Encender " + $('c0').name;
			} else {
				condition = "-Cerrar " + $('vC').name;
			}
			break;
	}
	return condition;
}