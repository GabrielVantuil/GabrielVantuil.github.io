    
var joystick = document.getElementById("joystick");

var config_t = document.createTextNode("joystick");
var cxConfig = document.createElement("input");
joystick.appendChild(cxConfig);
joystick.appendChild(config_t);
cxConfig.setAttribute("type","checkbox");//caixa de texto para exibir joystick

var div2 = document.createElement("div");
var funcao = document.createElement("textarea");
cxConfig.checked=false;
cxConfig.onchange=function(){
    if(cxConfig.checked){
        joystick.appendChild(div2);
    }
    if(!cxConfig.checked){
        joystick.removeChild(div2);
    }
}
var canvas = document.createElement("canvas");
div2.onmousemove = function(){atualiza(event)};
div2.onmouseleave = function(){apaga(event)};
canvas.onmousedown = function(){press(event)};
canvas.onmouseup = function(){release(event)};
canvas.style.cursor = "none";
canvas.width  = window.innerWidth*2/5;
canvas.height  = window.innerHeight*2/3;
canvas.style.border   = "1px solid";
canvas.style.backgroundColor = "black"; 
div2.appendChild(canvas);
/////*///
var ctx = canvas.getContext("2d");
ctx.font = "20px Arial";
ctx.fillStyle = "red";
ctx.textAlign = "center";
var clicou = 0;
var bolaRefX=0;
var bolaRefY=0;
var desloc;
function atualiza(event){
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX-rect.left;
    var y = event.clientY-rect.top;
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "red";
    ctx.lineWidth=5;
    ctx.arc(x,y,20,0,2*Math.PI);
    ctx.stroke();
    if(clicou==1){
        ctx.beginPath();
        ctx.arc(bolaRefX,bolaRefY,20,0,2*Math.PI);
        ctx.stroke();
        var coords =  (event.clientX-desloc[0])+" ; "+ (event.clientY-desloc[1]);
        ctx.fillText(coords,canvas.width/2,20);
    }
}
function apaga(event){
ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function press(event){
    var rect = canvas.getBoundingClientRect();
    clicou = 1;
    bolaRefX = (event.clientX-rect.left);
    bolaRefY = (event.clientY-rect.top);
    desloc = new Array(event.clientX, event.clientY);
    atualiza(event);    
}
function release(event){
    var rect = canvas.getBoundingClientRect();
    clicou = 0;
    desloc = new Array(event.clientX-desloc[0], event.clientY-desloc[1]);
    enviar(funcao.value);
    /*var comandos ="import machine"+ '\n'+'\r'+
                  "p2 = machine.Pin(2)"+'\n'+'\r'+
                  "p2 = machine.PWM(p2)"+'\n'+'\r'+
                  "p2.freq(500)"+'\n'+'\r'+
                  "p2.duty(" + (1023-desloc[1]*2)+")";
    doSend(comandos);
    */
      

    var coords =  desloc[0]+" : "+desloc[1];
    ctx.fillText(coords,canvas.width/2,20);
}

var br = document.createElement("br");
div2.appendChild(br);
div2.appendChild(funcao);


var joystick_exemplo="var comandos = \"import machine \" + \'\\n\'+\'\\r\'+"+'\n'
                  +"\"p2 = machine.Pin(2)\" + \'\\n\'+\'\\r\'+"+'\n'
                  +"\"p2 = machine.PWM(p2)\" + \'\\n\'+\'\\r\'+"+'\n'
                  +"\"p2.freq(500)\" + \'\\n\'+\'\\r\'+"+'\n'
                  +"\"p2.duty(\" + (1023-desloc[1]*2) +\")\";" +'\n' + "doSend(comandos);";
/*
var joystick_exemplo="var comandos = \"import machine \" + \'\\n\'+\'\\r\'+"
                  +"p2 = machine.Pin(2)"+'"'+'\n'+'\r'+
                  +"p2 = machine.PWM(p2)"+'"'+'\n'+'\r'+
                  +"p2.freq(500)"+'"'+'\n'+'\r'+
                  +"p2.duty("+'"'+"(1023-desloc[1]*2)"+")"+"doSend(comandos)";*/
exemplo(joystick_exemplo,div2);
function exemplo(texto, div){
    var exemplo_bt = document.createElement("button");
    div.appendChild(exemplo_bt);
    exemplo_bt.appendChild(document.createTextNode("exemplo"));
    exemplo_bt.onclick=function(){
        funcao.value = texto;   
    }
}

  /*
  function exemplo(texto, div){
    var exemplo_t = document.createTextNode("exemplo");
    var exemplo_cx = document.createElement("input");
    div.appendChild(exemplo_cx);
    div.appendChild(exemplo_t);
    exemplo_cx.setAttribute("type","checkbox");//caixa de texto para exibir joystick

    var p = document.createElement("textarea");
    p.disable;
    var texto2 =document.createTextNode(texto);
    p.appendChild(texto2);
    exemplo_cx.checked=false;
    exemplo_cx.onchange=function(){
      if(exemplo_cx.checked){
        div.appendChild(p);
      }
      if(!exemplo_cx.checked){
        div.removeChild(p);
      }
    }
  }*/
