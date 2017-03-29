var valor;
var elem_config =document.getElementById("elem_config");
var exibir_t = document.createElement("span");
var exibir_checkbox = document.createElement("input");
var elem_config_list =document.createElement("div");
var div = new Array();


elem_config.appendChild(exibir_checkbox);
elem_config.appendChild(exibir_t);
exibir_t.appendChild(document.createTextNode("Configurar elementos"));
exibir_checkbox.setAttribute("type","checkbox");


function cria(elemTipo,modo_tab,num_tab){
  var id_div = div.length;
  div[id_div] = document.createElement("div");              

  var elementos = document.getElementById("elementos");     //Elemento comum
  
  var config_div = document.createElement("div");           
  var elemConfig_div = document.createElement("div");
  var funcao = document.createElement("textarea");
  var fechar = document.createElement("button");
  var showConfig_checkbox = document.createElement("input"); 
  elementos.appendChild(div[id_div]);
  elem_config_list.appendChild(config_div);
  config_div.appendChild(fechar);
  config_div.appendChild(showConfig_checkbox);
  config_div.appendChild(elemConfig_div);
  elemConfig_div.appendChild(funcao);

  div[id_div].appendChild(document.createTextNode(" \  ("+id_div+")  ")); 
  fechar.appendChild(document.createTextNode(" \  ("+id_div+")  "));

  div[id_div].style.border="1px solid";
  config_div.style.border="1px solid";
  showConfig_checkbox.setAttribute("type","checkbox");
  showConfig_checkbox.style.slideThree;
  showConfig_checkbox.checked=true;
  funcao.setAttribute("placeHolder","Escreva a função a atribuir ao elemento.");

/////////////////////BOTAO//////////////////////////////////
  if(elemTipo=="botao"){
    var botao2 = document.createElement("button");
    var titulo=  document.getElementById("nome").value;
    div[id_div].appendChild(botao2); 
    botao2.appendChild(document.createTextNode(titulo)); 
    botao2.onclick = function(){
      enviarPy(funcao.value);
    }
  }
/////////////////////SLIDER/////////////////////////////////
  if(elemTipo=="slider"){
    var slider = document.createElement("input");
    var valorAtual = document.createTextNode("   Valor: ");
    var val = document.createElement("span");
    var min = document.createElement("input");
    var max = document.createElement("input");
    var txEnvio_txt = document.createTextNode("   Atualizar ao soltar: ");
    var txEnvio_CBox = document.createElement("input");
    var contTempo=0;

    div[id_div].appendChild(slider);
    div[id_div].appendChild(valorAtual);
    div[id_div].appendChild(val);
    elemConfig_div.appendChild(min);
    elemConfig_div.appendChild(max);
    elemConfig_div.appendChild(txEnvio_txt);
    elemConfig_div.appendChild(txEnvio_CBox);

    min.setAttribute("placeHolder","Min");
    max.setAttribute("placeHolder","Max");
    slider.setAttribute("type","range");  
    txEnvio_CBox.setAttribute("type","checkbox");
    min.size=4;
    max.size=4;
    
    min.onchange=function(){
      slider.setAttribute("min",min.value);
    }
    max.onchange=function(){
      slider.setAttribute("max",max.value);
    }
    slider.oninput = function(){
      val.innerHTML= slider.value;
      if(!txEnvio_CBox.checked){
        //doSend(funcao.value);
        setTimeout(function(){contTempo++;},10);////////////////////////////////////////
          if(contTempo>=10){
            contTempo=0;
            valor=slider.value;
            doSend("valor="+valor);
            enviarPy(funcao.value);
          }
        }
    }
    slider.onchange = function(){
      if(txEnvio_CBox.checked){
        valor=slider.value;
        doSend("valor="+valor);
        enviarPy(funcao.value);
      }
    }
  }

/////////////////////FUNCOES////////////////////////////////

  fechar.onclick = function(){
    div[id_div-1].parentNode.removeChild(div[id_div-1]);
    config_div.parentNode.removeChild(config_div);
  }
  exibir_checkbox.onchange= function(){
    if(exibir_checkbox.checked){
      elem_config.appendChild(elem_config_list);
    }
    else{
      elem_config.removeChild(elem_config_list);
    }
  }
  showConfig_checkbox.onchange= function() { 
    if(showConfig_checkbox.checked){
      config_div.appendChild(elemConfig_div);
    }
    else{
      config_div.removeChild(elemConfig_div);  
    }
  }
  funcao.id="funcao";
  id_div++;
}
//
function enviarJS(texto){
  var script = document.createElement("SCRIPT");
  var texto2 =document.createTextNode(texto);
  script.appendChild(texto2);
  document.getElementById("elementos").appendChild(script);
}
function enviarPy(texto){
  texto=texto.replace(/\n/g,"\r");
  doSend(texto);
}




































  /*
  if(elemTipo=="tabela"){
    var tabela = document.createElement("table");
    var tabela_div = document.createElement("div");
    var tabela_H = document.createElement("input");
    var tabela_V = document.createElement("input");
    var tabela_criar = document.createElement("button");
    var tab_H = new Array();
    var tab_V = new Array();
    var select_tab = document.getElementById("select_tab");
    var tab_sel_CB = document.createElement("input");

    div[id_div].appendChild(tabela_div);
    div[id_div].appendChild(tabela);
    tabela_div.appendChild(tabela_H); 
    tabela_div.appendChild(tabela_V); 
    tabela_div.appendChild(tabela_criar);
    select_tab.appendChild(document.createTextNode(id_div+" :"));
    select_tab.appendChild(tab_sel_CB);

    tabela_criar.appendChild(document.createTextNode("criar"));
    tab_sel_CB.setAttribute("type","checkbox");
    tab_sel_CB.setAttribute("checked","1");
    tabela_criar.onclick = function(){
      for(var i=0;i<tabela_V.value;i++){
          tab_V[i] = document.createElement("tr");
          tabela.appendChild(tab_V[i]);
      }
      for(var i=0;i<tabela_V.value;i++){
        for(var j=0;j<tabela_H.value;j++){
            tab_H[i*10+j] = document.createElement("td");
            tab_V[i].appendChild(tab_H[i*10+j]);
            tab_H[i*10+j].appendChild(document.createTextNode("("+i+","+j+")"));
        }
      }
      //div[id_div].parentNode.removeChild(tabela_div);
    }
  }
*/



/*


var x = 0, y = 0,
    vx = 0, vy = 0,
  ax = 0, ay = 0;
  
//var sphere = document.getElementById("sphere");
var coords = document.createElement("span");

//var Y = document.createElement("span");
//var Z = document.createElement("span");

//document.getElementById("conectar").appendChild(coords);
//document.getElementById("conectar").appendChild(Y);
//document.getElementById("conectar").appendChild(Z);

if (window.DeviceMotionEvent != undefined) {
  window.ondevicemotion = function(e) {
    ax = event.accelerationIncludingGravity.x * 5;
    ay = event.accelerationIncludingGravity.y * 5;
    var txt_coord=document.createTextNode(e.accelerationIncludingGravity.x+"  \n"+
      e.accelerationIncludingGravity.y+"  \n"+
      e.accelerationIncludingGravity.z+"  \n"
      );
    coords.appendChild(txt_coord);
    //Y.appendChild(document.createTextNode(e.accelerationIncludingGravity.y));
    //Z.appendChild(document.createTextNode(e.accelerationIncludingGravity.z));
  
    //if ( e.rotationRate ) {
      //document.getElementById("rotationAlpha").innerHTML = e.rotationRate.alpha;
      //document.getElementById("rotationBeta").innerHTML = e.rotationRate.beta;
      //document.getElementById("rotationGamma").innerHTML = e.rotationRate.gamma;
    //}   
  }*/
/*
  setInterval( function() {
    var landscapeOrientation = window.innerWidth/window.innerHeight > 1;
    if ( landscapeOrientation) {
      vx = vx + ay;
      vy = vy + ax;
    } else {
      vy = vy - ay;
      vx = vx + ax;
    }
    vx = vx * 0.98;
    vy = vy * 0.98;
    y = parseInt(y + vy / 50);
    x = parseInt(x + vx / 50);
    
    boundingBoxCheck();
    
    //sphere.style.top = y + "px";
    //sphere.style.left = x + "px";
    
  }, 25);
} 


function boundingBoxCheck(){
  if (x<0) { x = 0; vx = -vx; }
  if (y<0) { y = 0; vy = -vy; }
  if (x>document.documentElement.clientWidth-20) { x = document.documentElement.clientWidth-20; vx = -vx; }
  if (y>document.documentElement.clientHeight-20) { y = document.documentElement.clientHeight-20; vy = -vy; }
  
}
*/
