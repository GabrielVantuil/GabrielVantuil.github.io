function cheat(){
    if(document.getElementById("entrada").value == "/cheat"){
    document.getElementById("entrada").value=
    "from machine import PWM, Pin"+
    "\nimport time"+
    "\nservo1 = PWM(Pin(2))"+
    "\nservo2 = PWM(Pin(0))"+
    "\nservo2.freq(50)"+
    "\nservo1.freq(50)";

    document.getElementById("direita_txt").value=
    "servo2.duty(110)"+
    "\nservo1.duty(0)";
    
    document.getElementById("esquerda_txt").value=
    "servo2.duty(210)"+
    "\nservo1.duty(0)";
    
    document.getElementById("frente_txt").value=
    "servo2.duty(210)"+
    "\nservo1.duty(10)";

    document.getElementById("tras_txt").value=
    "servo2.duty(50)"+
    "\nservo1.duty(110)";

    document.getElementById("parar_txt").value=
    "servo2.duty(0)"+
    "\nservo1.duty(0)";

  }
}