var valor;
var contElem=0;
var elem_config =document.getElementById("elem_config");
var exibir_t = document.createElement("span");
var exibir_checkbox = document.createElement("input");
var elem_config_list =document.createElement("div");
var elementos = document.getElementById("elementos");

elem_config.appendChild(exibir_checkbox);
elem_config.appendChild(exibir_t);
//elem_config.appendChild(elem_config_list);
exibir_t.appendChild(document.createTextNode("Configurar elementos "));
exibir_checkbox.setAttribute("type","checkbox");

function cria(elemTipo, ){
  div = document.createElement("div"); 
  var config_div = document.createElement("div");
  var elemConfig_div = document.createElement("div");
  var funcao = document.createElement("textarea");
  var fechar = document.createElement("button");
  var id= document.createElement("span");
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
    var contTempo=0;

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
  if(elemTipo=="tabela"){
    var tabela = document.createElement("table");
    var tabela_div = document.createElement("div");
    var tabela_H = document.createElement("input");
    var tabela_V = document.createElement("input");
    var tabela_criar = document.createElement("button");
    var tab_H = new Array();
    var tab_V = new Array();
    div.appendChild(tabela_div);
    div.appendChild(tabela);
    tabela_div.appendChild(tabela_H); 
    tabela_div.appendChild(tabela_V); 
    tabela_div.appendChild(tabela_criar);

    tabela_criar.appendChild(document.createTextNode("criar")); 
    tabela_criar.onclick = function(){
      for(var i=0;i<tabela_V.value;i++){
          tab_V[i] = document.createElement("tr");
          tabela_div.appendChild(tab_V[i]);
      }
      for(var i=0;i<tabela_V.value;i++){
        for(var j=0;j<tabela_H.value;j++){
            tab_H[i*10+j] = document.createElement("td");
            tab_V[i].appendChild(tab_H[i*10+j]);
            tab_H[i*10+j].appendChild(document.createTextNode("("+i+","+j+")"));
        }
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
  /*for(var i = 0;i<texto.length;i++){
    if(texto[i]=='\n'){

      doSend("contem \\n");
    }
        if(texto[i]=='\r'){

      doSend("contem \\r");
    }
  }*/
}
/*
var texto1 = document.getElementById("texto");
texto1.innerHTML= valor;      
*/