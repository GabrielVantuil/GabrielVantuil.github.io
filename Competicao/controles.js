var elem_config =document.getElementById("elem_config");
var controles = document.getElementById("controles");
var controles_config_div = document.createElement("div");
var controles_config_checkbox = document.createElement("input");

var funcao_frente = document.createElement("textarea");
var funcao_tras = document.createElement("textarea");
var funcao_esquerda = document.createElement("textarea");
var funcao_direita = document.createElement("textarea");
var funcao_parar = document.createElement("textarea");

controles_config_div.appendChild(document.createTextNode("Frente  "));
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

/*funcao_baixo.setAttribute("placeHolder","Escreva a função a atribuir ao elemento.");
funcao_esquerda.setAttribute("placeHolder","Escreva a função a atribuir ao elemento.");
funcao_direita.setAttribute("placeHolder","Escreva a função a atribuir ao elemento.");
funcao_parar.setAttribute("placeHolder","Escreva a função a atribuir ao elemento.");
*/
controles_config_checkbox.setAttribute("type","checkbox");

elem_config.appendChild(controles_config_checkbox);
elem_config.appendChild(document.createTextNode("Configurar controles"));
//controles_config_div.appendChild(document.createTextNode("asdnaksdnmladsoadmskldmalskcmscmodçoeçdofkcmasl,m"));

//------------------------------------FRENTE------------------------------------------------------
    var frente = document.getElementById("frente");
    frente.onclick = function(){
		enviarPy(funcao_frente.value);
    }

    var tras = document.getElementById("tras");
    tras.onclick = function(){
		enviarPy(funcao_tras.value);
    }

	var esquerda = document.getElementById("esquerda"); 
    esquerda.onclick = function(){
		enviarPy(funcao_esquerda.value);
    }
    
    var direita = document.getElementById("direita");
    direita.onclick = function(){
		enviarPy(funcao_direita.value);
    }

    var parar = document.getElementById("parar");
    parar.onclick = function(){
		enviarPy(funcao_parar.value);
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