  /**
   * Evaluate the DPI of the device's screen (pixels per inche).
   * It creates and inpect a dedicated and hidden `data-dpi-test` DOM element to
   * deduct the screen DPI.
   * @method
   * @static
   * @returns {number} - The current screen DPI, so in pixels per inch.
   */

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    // var input_screen = createInput(screen_size,"number");
    // input_screen.input(screen_size_input);
    // input_screen.size(50);   
    // input_screen.position(370, 10);
    
}
var indiceAtual = 0;
var acertos = [];

let params = new URLSearchParams(document.location.search.substring(1));
let name = params.get("usuario");

function soma(numeros){
    let x=0;
    for(i of numeros) x+= i;
    return x;
}

function draw(){
    
    background(0);
    
    noStroke();    fill(255);

    textSize(25);   fill(255);   textAlign(CENTER);
    text(indiceAtual+'/'+palavras.length, windowWidth/2, windowHeight-10);

    textSize(100);  fill(0,255,0);  textAlign(CENTER)
    if(name == "professor" && indiceAtual < palavras.length)
        text(palavras[indiceAtual][0], windowWidth/2, windowHeight/2);
    if(indiceAtual == palavras.length){
        text("FIM", windowWidth/2, windowHeight/2);
        textSize(50);  fill(0,0,150);
        text("Pontuação: " + soma(acertos)+'/'+palavras.length , windowWidth/2, windowHeight/2+70);
    }
    

    //exibindo as letras que serão analisadas
    textSize(40);  fill(255,255,0);  textAlign(LEFT)
    text(letras[0], windowWidth*1/15, windowHeight*1/15);
    text(letras[1], windowWidth*12/15, windowHeight*1/15);

    //palavras corrigidas
    let letra_1 = 1;
    let tamanhoLetra = 30;

    textAlign(LEFT);
    for(let i = 0; i<indiceAtual; i++){
        if(acertos[i]) 
            fill(0,255,0);
        else
            fill(255,0,0);
        if(name == "professor")
            tamanhoLetra = 20;

        textSize(tamanhoLetra); 

        if(palavras[i][1] == letras[0]){
            text(palavras[i][0], windowWidth*1/15 , windowHeight*1/15 + tamanhoLetra*(letra_1 % palavras.length));
            letra_1++;
        }
        else
            text(palavras[i][0], windowWidth*12/15, windowHeight*1/15 + tamanhoLetra*((2+i-letra_1) % palavras.length ) );
    }
    
}

function clickLetra(letra){

    if((letra == letras[0] || letra == letras[1]) && (indiceAtual < palavras.length)){
        if(palavras[indiceAtual][1] == letra)
            acertos[indiceAtual] = 1;
        else
            acertos[indiceAtual] = 0;
        indiceAtual++;
    }
}

function keyPressed() {
    clickLetra(key.toLowerCase());
}

function mouseClicked() {
    
    textSize(50);  fill(0,0,150);
    text(mouseX, windowWidth/2, windowHeight/2+70);
    if(name == "professor" && (indiceAtual < palavras.length)){
        acertos[indiceAtual] = 1;
        indiceAtual++;
    }
    else if(mouseX < windowWidth/2)
        clickLetra(letras[0]);
    else if(mouseX > windowWidth/2)
        clickLetra(letras[1]);
}