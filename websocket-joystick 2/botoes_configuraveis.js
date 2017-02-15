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

function cria(){
  var div = document.createElement("div"); 
  var elementos = document.getElementById("elementos");
  var config_div = document.createElement("div");
  var funcao = document.createElement("textarea");
  var fechar = document.createElement("button");
  var id = document.createElement("span");
  
  elem_config_list.appendChild(config_div);
  config_div.appendChild(fechar);
  config_div.appendChild(funcao);
  elementos.appendChild(div);

  div.appendChild(id); 
  id.appendChild(document.createTextNode(" \  ("+contElem+")  ")); 
  fechar.appendChild(document.createTextNode(" \  ("+contElem+")  "));

  div.style.border="1px solid";
  config_div.style.border="1px solid";

/////////////////////Botao/////////////////////////////////
  if(document.getElementById("botao").checked){
    var botao2 = document.createElement("button");
    var titulo=  document.getElementById("nome").value;
    div.appendChild(botao2); 
    botao2.appendChild(document.createTextNode(titulo)); 
    botao2.onclick = function(){
      enviar(funcao.value);
    }
  }
/////////////////////SLIDER/////////////////////////////////
  if(document.getElementById("slider").checked){
    var slider = document.createElement("input");
    var p2 = document.createElement("br");
    var t1 = document.createTextNode("max: ");
    var t2 = document.createTextNode("   Atualizar ao soltar: ");
    var tx_envio = document.createElement("input");
    var max = document.createElement("input");
    var t3 = document.createTextNode("   Valor: ");
    var val = document.createElement("span");

    div.appendChild(slider);
    div.appendChild(t3);
    div.appendChild(val);
    config_div.appendChild(t1);
    config_div.appendChild(max);
    config_div.appendChild(t2);
    config_div.appendChild(tx_envio);

    slider.setAttribute("type","range");  
    max.setAttribute("type","text");
    max.size=4;
    slider.setAttribute("min","0");
    tx_envio.setAttribute("type","checkbox");

    max.onchange=function(){
      slider.setAttribute("max",max.value);
    }
    slider.oninput = function(){
      val.innerHTML= slider.value;
      if(!tx_envio.checked){
        valor=slider.value;
        enviar(funcao.value);
      }
    }
    slider.onchange = function(){
      if(tx_envio.checked){
        valor=slider.value;
        enviar(funcao.value);
      }
    }
  }
//////////////////////////////

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
  /*cxConfig.checked=true;
  cxConfig.onchange=function(){
    if(cxConfig.checked){
      elem_config.appendChild(config_div);
    }
    if(!cxConfig.checked){
      elem_config.removeChild(config_div);
    }
  }*/
  funcao.id="funcao";
  contElem++;
}//
function enviar(texto){
  var script = document.createElement("SCRIPT");
  var texto2 =document.createTextNode(texto);
  script.appendChild(texto2);
  document.getElementById("elementos").appendChild(script);
}

/*
var texto1 = document.getElementById("texto");
texto1.innerHTML= valor;      
*/