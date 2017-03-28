var elem_config =document.getElementById("elem_config");
var controles = document.getElementById("controles");


var controles_config_div = document.getElementById("controles_config_div");
elem_config.removeChild(controles_config_div);
var frente = document.getElementById("frente");
var tras = document.getElementById("tras");
var esquerda = document.getElementById("esquerda"); 
var direita = document.getElementById("direita");
var parar = document.getElementById("parar");

var controles_config_checkbox = document.createElement("input");

controles_config_checkbox.setAttribute("type","checkbox");

elem_config.appendChild(controles_config_checkbox);
elem_config.appendChild(document.createTextNode("Configurar controles"));
//------------------------------------FRENTE------------------------------------------------------
frente.onclick = function(){
	enviarPy(document.getElementById("frente_txt").value);
}
tras.onclick = function(){
	enviarPy(document.getElementById("tras_txt").value);
}
esquerda.onclick = function(){
	enviarPy(document.getElementById("esquerda_txt").value);
}
direita.onclick = function(){
	enviarPy(document.getElementById("direita_txt").value);
}
parar.onclick = function(){
	enviarPy(document.getElementById("parar_txt").value);
}

function enviarPy(texto){
  texto=texto.replace(/\n/g,"\r");
  doSend(texto);
}

controles_config_checkbox.onchange= function(){
	if(controles_config_checkbox.checked){
		elem_config.appendChild(controles_config_div);
	}
    else{
		elem_config.removeChild(controles_config_div);
    }
}



























/*
var funcao_frente = document.createElement("textarea");
var funcao_tras = document.createElement("textarea");
var funcao_esquerda = document.createElement("textarea");
var funcao_direita = document.createElement("textarea");
var funcao_parar = document.createElement("textarea");

frente_txt.appendChild(funcao_frente);
tras_txt.appendChild(funcao_tras);
esquerda_txt.appendChild(funcao_esquerda);
direita_txt.appendChild(funcao_direita);
parar_txt.appendChild(funcao_parar);
*/
/*
*/

/*
controles_config_div.appendChild(document.createTextNode("Frente"));
controles_config_div.appendChild(funcao_frente);
controles_config_div.appendChild(document.createElement("br"));
controles_config_div.appendChild(document.createTextNode("Tras    "));
controles_config_div.appendChild(funcao_tras);
controles_config_div.appendChild(document.createElement("br"));
controles_config_div.appendChild(document.createTextNode("Esquerda"));
controles_config_div.appendChild(funcao_esquerda);
controles_config_div.appendChild(document.createElement("br"));
controles_config_div.appendChild(document.createTextNode("Direita "));
controles_config_div.appendChild(funcao_direita);
controles_config_div.appendChild(document.createElement("br"));
controles_config_div.appendChild(document.createTextNode("Parar   "));
controles_config_div.appendChild(funcao_parar);
controles_config_div.appendChild(document.createElement("br"));
*/
/*funcao_baixo.setAttribute("placeHolder","Escreva a função a atribuir ao elemento.");
funcao_esquerda.setAttribute("placeHolder","Escreva a função a atribuir ao elemento.");
funcao_direita.setAttribute("placeHolder","Escreva a função a atribuir ao elemento.");
funcao_parar.setAttribute("placeHolder","Escreva a função a atribuir ao elemento.");
*/
