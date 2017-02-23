var valor;
var contElem=0;
var elem_config =document.getElementById("elem_config");
var exibir_t = document.createElement("span");
var exibir_checkbox = document.createElement("input");
var elem_config_list =document.createElement("div");

elem_config.appendChild(exibir_checkbox);
elem_config.appendChild(exibir_t);
//elem_config.appendChild(elem_config_list);
exibir_t.appendChild(document.createTextNode("Configurar elementos "));
exibir_checkbox.setAttribute("type","checkbox");

function cria(elemTipo){
  var div = document.createElement("div"); 
  var elementos = document.getElementById("elementos");
  var config_div = document.createElement("div");
  var elemConfig_div = document.createElement("div");
  var funcao = document.createElement("textarea");
  var fechar = document.createElement("button");
  var id = document.createElement("span");
  var showConfig_checkbox = document.createElement("input"); 

  elementos.appendChild(div);
  elem_config_list.appendChild(config_div);
  config_div.appendChild(fechar);
  config_div.appendChild(showConfig_checkbox);
  config_div.appendChild(elemConfig_div);
  elemConfig_div.appendChild(funcao);

  div.appendChild(id); 

  id.appendChild(document.createTextNode(" \  ("+contElem+")  ")); 
  fechar.appendChild(document.createTextNode(" \  ("+contElem+")  "));

  div.style.border="1px solid";
  config_div.style.border="1px solid";
  showConfig_checkbox.setAttribute("type","checkbox");
  showConfig_checkbox.style.slideThree;
  showConfig_checkbox.checked=true;
  funcao.setAttribute("placeHolder","Escreva a função à atribuir ao elemento.");

/////////////////////BOTAO//////////////////////////////////
  if(elemTipo=="botao"){
    var botao2 = document.createElement("button");
    var titulo=  document.getElementById("nome").value;
    div.appendChild(botao2); 
    botao2.appendChild(document.createTextNode(titulo)); 
    botao2.onclick = function(){
      enviar(funcao.value);
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

    div.appendChild(slider);
    div.appendChild(valorAtual);
    div.appendChild(val);
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
        valor=slider.value;
        enviarPy(funcao.value);
        /*
        doSend("valor="+valor);
        doSend(funcao.value);
        ///*///
      }
    }
    slider.onchange = function(){
      if(txEnvio_CBox.checked){
        valor=slider.value;
        enviar(funcao.value);
      }
    }
  }
/////////////////////FUNCOES////////////////////////////////

  fechar.onclick = function(){
    div.parentNode.removeChild(div);
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
  contElem++;
}//
function enviarJS(texto){
  var script = document.createElement("SCRIPT");
  var texto2 =document.createTextNode(texto);
  script.appendChild(texto2);
  document.getElementById("elementos").appendChild(script);
}
function enviarPy(texto){
  //doSend(texto.replace('\n',"\n\r"));
  for(var i = 0;i<texto.length;i++){
    if(texto[i]=='\n'){

      doSend("contem \\n");
    }
        if(texto[i]=='\r'){

      doSend("contem \\r");
    }
  }
}
/*
var texto1 = document.getElementById("texto");
texto1.innerHTML= valor;      
*/