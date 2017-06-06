/*---( Mega 2560 <---> Raspberry )---*/
/*---( Programa Principal del Arduino Mega Esclavo )---*/
/*---( Interfaz entre equipos de vacio y Raspberry )---*/

/*---( Import needed libraries )---*/

/*---( Declare Constants and Pin Numbers )---*/
#define Transmit HIGH  //Transceiver Modo Transmision
#define Receive LOW  //Transceiver Modo Recepcion
#define Serial2Control 2  //Pin Direccion Transceiver Serial2 (TC)
#define Serial3Control 3  //Pin Direccion Transceiver Serial3 (MG)

/*---( Declare objects )---*/

/*---( Declare Variables )---*/
byte fromHost[5];
byte toTest[] = {84, 69, 83, 84, 13};
byte i, c, input;
byte mgId = 0, mgCabezal = 0, tcId = 0;  //guardan la ultima seleccion
//statusRv[] = sRv(0 x 16)<CR>
byte statusRv[] = {115, 82, 118, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 13};
//statusRc[] = sRc(0 x 5)<CR>
byte statusRc[] = {115, 82, 99, 49, 49, 49, 49, 49, 13};
//statusTC[] = sTC(0 x 3)<CR>
byte statusTC[] = {115, 84, 67, 48, 48, 48, 13};
//errorPlato[] = ePl(0 x 9)<CR>
byte errorPlato[] = {101, 80, 108, 48, 48, 48, 48, 48, 48, 48, 48, 48, 13};

/*---( SETUP )---*/
void setup(){
  pinMode(Serial2Control, OUTPUT);
  pinMode(Serial3Control, OUTPUT);
  digitalWrite(Serial2Control, Transmit);
  digitalWrite(Serial3Control, Transmit);
  for (byte j = 22; j <= 37; j++){  //Salidas Rv
    pinMode(j, OUTPUT);
    digitalWrite(j, HIGH);  //Logica negativa (Modulos de rele)
  }
  for (byte j = 40; j <= 44; j++){  //Salidas Rc
    pinMode(j, OUTPUT);
    digitalWrite(j, HIGH);  //Logica negativa (Modulos de rele)
  }
  for (byte j = 67; j <= 69; j++){  //Enables Modulos de rele
    pinMode(j, OUTPUT);
    digitalWrite(j, HIGH);  //Enabled
  }
  for (byte j = 45; j <= 53; j++){  //Entradas Plato
    pinMode(j, INPUT_PULLUP);
  }
  Serial.begin(9600);  //Raspberry, probar con 115200
  Serial2.begin(9600);  //Pfeiffer TCM1601 y TC600
  Serial3.begin(9600);  //Pfeiffer MaxiGauge
}

/*---( LOOP )---*/
void loop(){
  if (Serial.available()){  //Host --> Mega
    delay(10);  //Espero que se llene el buffer
    i = 0;
    while (Serial.available()){
      fromHost[i++] = Serial.read();
    }
    if (fromHost[4] != 13){  //Error Serial
      Serial.print("Error Serial");
      Serial.write(13);
      return;
    }
    input = analizarComando(fromHost);
    if (input == 255){  //Error Comando
      Serial.print("Error Comando");
      Serial.write(13);
      return;
    }
    switch (input){

    //Acciones MaxiGauge

      case 1: {  //Mxy? : Informar valor sensor y del MaxiGauge x
        digitalWrite(Serial3Control, Transmit);
        //mg[] = <ETX><ESC>0<NUL>PR<NUL><CR>
        byte mg[] = {3, 27, 48, 0, 80, 82, 0, 13};
        mg[3] = fromHost[1];  //mgId
        mgId = fromHost[1];
        mg[6] = fromHost[2];  //mgCabezal
        mgCabezal = fromHost[2];
        Serial3.write(mg, sizeof(mg));
        Serial3.flush();
        delay(40);
        Serial3.write(5);
        delay(1);
        digitalWrite(Serial3Control, Receive);
      } break;
      case 3: {  //Mxy1 : ON sensor y del MaxiGauge x
        //mg[] = <ETX><ESC>0<NUL>SEN,0,0,0,0,0,0<CR>
        byte mg[] = {3, 27, 48, 0, 83, 69, 78, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 13};
        mg[3] = fromHost[1];
        mg[2 * fromHost[2] - 90] = 50;  //set 2 (ON) al sensor y; {49:54} --> {8,10,12,14,16,18}
        Serial3.write(mg, sizeof(mg));
        Serial3.flush();
      } break;
      case 4: {  //Mxy0 : OFF sensor y del MaxiGauge x
        //mg[] = <ETX><ESC>0<NUL>SEN,0,0,0,0,0,0<CR>
        byte mg[] = {3, 27, 48, 0, 83, 69, 78, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 44, 48, 13};
        mg[3] = fromHost[1];
        mg[2 * fromHost[2] - 90] = 49;  //set 1 (OFF) al sensor y; {49:54} --> {8,10,12,14,16,18}
        Serial3.write(mg, sizeof(mg));
        Serial3.flush();
      } break;

    //Acciones Relays Valvula

      case 5: {  //Rvx= : Informar ON/OFF relays valvula

        //En este lugar deberia (DEBERIA?) chequear errorPlato y combinar con statusRv

        Serial.write(statusRv, sizeof(statusRv));
        Serial.flush();
      } break;
      case 6: {  //Rvx1 : ON relay valvula x, x = {"0":"9", "A":"F"} = {48:57, 65:70}
        byte pinRv;
        if (fromHost[2] < 58){  //ASCII{0:F} --> OutputPin{22:37}
          pinRv = fromHost[2] - 26;
        } else {
          pinRv = fromHost[2] - 33;
        }
        digitalWrite(pinRv, HIGH);
        statusRv[pinRv - 19] = 49;  //OutputPin{22:37} --> statusRv{3:18}
      } break;
      case 7: {  //Rvx0 : OFF relay valvula x, x = {"0":"9", "A":"F"} = {48:57, 65:70}
        byte pinRv;
        if (fromHost[2] < 58){  //ASCII{0:F} --> OutputPin{22:37}
          pinRv = fromHost[2] - 26;
        } else {
          pinRv = fromHost[2] - 33;
        }
        digitalWrite(pinRv, LOW);
        statusRv[pinRv - 19] = 48;  //OutputPin{22:37} --> statusRv{3:18}
      } break;

    //Acciones TC600 y TCM1601

      case 8: {  //TCx? : Informar velocidad bomba Pfeiffer TCx
        digitalWrite(Serial2Control, Transmit);
        //tc[] = 00<NUL>|00|309|02|=?|<NUL><NUL><NUL>|<CR>
        byte tc[] = {48, 48, 0, 48, 48, 51, 48, 57, 48, 50, 61, 63, 0, 0, 0, 13};
        tc[2] = fromHost[2];  //tcId = 49, 50, 51
        tcId = fromHost[2];
        //Checksum = 107, 108 o 109
        tc[12] = 49;
        tc[13] = 48;
        tc[14] = fromHost[2] + 6;
        Serial2.write(tc, sizeof(tc));
        Serial2.flush();
        digitalWrite(Serial2Control, Receive);
      } break;
      case 9: {  //TCx= : Informar ON/OFF bomba Pfeiffer TCx
        Serial.write(statusTC, sizeof(statusTC));
        Serial.flush();
      } break;
      case 10: {  //TCx1 : ON Pfeiffer TCx
        //tc[] = 00<NUL>|10|010|06|111111|<NUL><NUL><NUL>|<CR>
        byte tc[] = {48, 48, 0, 49, 48, 48, 49, 48, 48, 54, 49, 49, 49, 49, 49, 49, 0, 0, 0, 13};
        tc[2] = fromHost[2];  //tcId = 49, 50 o 51
        //Checksum = 015, 016 o 017
        tc[16] = 48;
        tc[17] = 49;
        tc[18] = fromHost[2] + 4;
        Serial2.write(tc, sizeof(tc));
        Serial2.flush();
        statusTC[fromHost[2] - 46] = 49;	//tcId{49,50,51} --> statusTC{3,4,5}
      } break;
      case 11: {  //TCx0 : OFF Pfeiffer TCx
        //tc[] = 00<NUL>|10|010|06|000000|<NUL><NUL><NUL>|<CR>
        byte tc[] = {48, 48, 0, 49, 48, 48, 49, 48, 48, 54, 48, 48, 48, 48, 48, 48, 0, 0, 0, 13};
        tc[2] = fromHost[2];  //tcId = 49, 50 o 51
        //Checksum = 009, 010 o 011
        tc[16] = 48;
        if (fromHost[2] == 49){
          tc[17] = 48;
          tc[18] = 57;
        } else if(fromHost[2] == 50){
          tc[17] = 49;
          tc[18] = 48;
        } else {
          tc[17] = 49;
          tc[18] = 49;
        }
        Serial2.write(tc, sizeof(tc));
        Serial2.flush();
        statusTC[fromHost[2] - 46] = 48;	//tcId{49,50,51} --> statusTC{3,4,5}
      } break;

    //Acciones Relays Controladores

      case 15: {  //Rcx= : Informar ON/OFF relays controlador
        Serial.write(statusRc, sizeof(statusRc));
        Serial.flush();
      } break;
      case 16: {  //Rcx1 : ON relay controlador x
        byte pinRc = fromHost[2] - 8;  //ASCII{0:4} --> OutputPin{40:44}
        digitalWrite(pinRc, HIGH);
        statusRc[pinRc - 37] = 49;  //OutputPin{40:44} --> statusRc{3:7}
      } break;
      case 17: {  //Rcx0 : OFF relay controlador x
        byte pinRc = fromHost[2] - 8;  //ASCII{0:8} --> OutputPin{40:44}
        digitalWrite(pinRc, LOW);
        statusRc[pinRc - 37] = 48;  //OutputPin{40:44} --> statusRc{3:7}
      }
    }
  }

  if (Serial2.available()){  //Pfeiffer TCM1601 y TC600 (velocidad bomba) --> Mega
    delay(20);
    i = 0;
    c = 0;
    byte fromTC[20];  //00x|10|309|06|yyyyyy|zzz|<CR>
    while (Serial2.available() && c != 13){
      c = Serial2.read();
      fromTC[i++] = c;
    }
    //toHost[] = T,tcId,y,y,y,<CR>
    byte toHost[] = {84, tcId, fromTC[13], fromTC[14], fromTC[15], 13};
    Serial.write(toHost, sizeof(toHost));
    Serial.flush();
    digitalWrite(Serial2Control, Transmit);
  }

  if (Serial3.available()){  //Pfeiffer MaxiGauge (valor sensor) --> Mega
    delay(20);
    i = 0;
    c = 0;
    byte fromMG[12];
    while (Serial3.available() && c != 10){
      c = Serial3.read();
      fromMG[i++] = c;
    }
    //toHost[] = M,mgId,mgCabezal,fromMG(status, entero, decima, centesima, milesima, signo, exp),<CR>
    byte toHost[] = {77, mgId, mgCabezal, fromMG[0], fromMG[2], fromMG[4], fromMG[5],
      fromMG[6], fromMG[8], fromMG[9], 13};
    Serial.write(toHost, sizeof(toHost));
    Serial.flush();
    digitalWrite(Serial3Control, Transmit);
  }

}

/*---( Declare User-written Functions )---*/
int analizarComando(byte input[]){
  if (input[0] == 77){  //M
    if (input[3] == 63){  //?
      return 1;
    } else if (input[3] == 49){  //1
      return 3;
    } else if (input[3] == 48){  //0
      return 4;
    } else {  //Error Comando
      return 255;
    }
  } else if (input[0] == 82 && input[1] == 118){  //Rv
    if (input[3] == 61){  //=
      return 5;
    } else if (input[3] == 49){  //1
      return 6;
    } else if (input[3] == 48){  //0
      return 7;
    } else {  //Error Comando
      return 255;
    }
  } else if (input[0] == 84){  //T
    if (input[3] == 63){  //?
      return 8;
    } else if (input[3] == 61){  //=
      return 9;
    } else if (input[3] == 49){  //1
      return 10;
    } else if (input[3] == 48){  //0
      return 11;
    } else {  //Error Comando
      return 255;
    }
  } else if (input[0] == 82 && input[1] == 99){  //Rc
    if (input[3] == 61){  //=
      return 15;
    } else if (input[3] == 49){  //1
      return 16;
    } else if (input[3] == 48){  //0
      return 17;
    } else {  //Error Comando
      return 255;
    }
  }  else {  //Error Comando
    return 255;
  }
}

/*---( THE END )---*/
