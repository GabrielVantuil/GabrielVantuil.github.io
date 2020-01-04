var arena = new Array(10);
let arenaPrev  = new Array(10);
var currentPiece = new Array(4);
var sqSize = 20;

let posX=3;
let posY=0;

let nextPieces = [3,4,5,6,7];

for (var i = 0; i < currentPiece.length; i++) {
    currentPiece[i] = new Array(4);
    for(let j=0; j<currentPiece[i].length; j++)
        currentPiece[i][j]=0;
}
function keyPressed() {
    if (keyCode === LEFT_ARROW && !checkCollision(currentPiece,arenaPrev,posX-1,posY))
        posX--;
    if (keyCode === RIGHT_ARROW && !checkCollision(currentPiece,arenaPrev,posX+1,posY))
        posX++;
    if (keyCode === DOWN_ARROW && !checkCollision(currentPiece,arenaPrev,posX,posY+1))
        posY++;
    
}

function setup() {
    frameRate(5);
    createCanvas(windowWidth, windowHeight);
    background(0);
    for (var i = 0; i < arena.length; i++) {
        arena[i] = new Array(20);
        for(let j=0; j<arena[i].length; j++)
            arena[i][j]=0;
    }
    changeCurrent(1);
    arenaPrev = copyMatrix(arena);
}
function draw(){
    // drawArena();
    arena = copyMatrix(arenaPrev);
    // placePiece(currentPiece,arena,1,posY);
    placePiece(currentPiece, arena, posX, posY);
    if(!checkCollision(currentPiece,arenaPrev,posX,posY+1))
        posY++;
    else{
        arenaPrev = copyMatrix(arena);
        posX = 4;
        posY = 0;
        changeCurrent(nextPieces[0]);
        nextPieces = nextPieces.slice(1);
        nextPieces = [...nextPieces, Math.round(Math.random()*6+1)];
    }
    // printArena(arena);
    drawArena(arena);
}
function drawArena(arena, xOffset=100, yOffset=100){
    
    stroke(80,100,0); fill(10); rect(xOffset, yOffset, arena.length * sqSize, arena[0].length * sqSize);
            
    for(let i=0; i<arena.length; i++){
        for(let j=0; j<arena[0].length; j++){
                stroke(80);
            if(arena[i][j]==0){
                noFill();
            }
            else if(arena[i][j] == 1) fill("orange");
            else if(arena[i][j] == 2) fill("red");
            else if(arena[i][j] == 3) fill("cyan");
            else if(arena[i][j] == 4) fill("yellow");
            else if(arena[i][j] == 5) fill("green");
            else if(arena[i][j] == 6) fill("blue");
            else if(arena[i][j] == 7) fill("magenta");
            else
                fill(100,0,0);
            // console.log(arena[i][j] + ':   x '+ i + '  y '+ j);
            rect(   i * sqSize + xOffset,
                    j * sqSize + yOffset,
                    sqSize,
                    sqSize
            );
        }
    }
}
function placePiece(piece, arena, X, Y){
    for(let i = 0; i<piece.length; i++)
        for(let j = 0; j<piece[0].length; j++){
            if((i+X)>=0 && (i+X)<arena.length && (j+Y)<arena[0].length)
            if(arena[i+X][j+Y] == 0)
                arena[i+X][j+Y] = piece[i][j];
        }
}
function checkCollision(piece, arena, futureX, futureY){
    for(let j = 0; j<piece[0].length; j++){
        for(let i = 0; i<piece.length; i++){
            if((i+futureX)>0 && (i+futureX)<arena.length && (j+futureY)<arena[0].length)
            if((arena[i+futureX][j+futureY] != 0) && (piece[i][j] != 0)){
                return true;
            }
            if(piece[i][j]!=0 && (j+futureY)>(arena[0].length-1))
                return true;
            if(piece[i][j]!=0 && ((i+futureX)>(arena.length-1) || (i+futureX)<0))
                return true;
        }
    }
    return false;
}
function copyMatrix(original){
    var matrix = [];
    for (var i = 0; i < original.length; i++)
        matrix[i] = original[i].slice();
    return matrix;
}
function changeCurrent(type=1){
    for(let i = 0; i<currentPiece.length;i++)
        currentPiece[i] = new Array(4).fill(0);
    if(type==1){
        currentPiece[0][0]=type;   //  [] __ __ __ 
        currentPiece[0][1]=type;   //  [] [] [] __ 
        currentPiece[1][1]=type;   //  __ __ __ __
        currentPiece[2][1]=type;   //  __ __ __ __
    }
    if(type==2){
        currentPiece[2][0]=type;   //  __ __ [] __ 
        currentPiece[0][1]=type;   //  [] [] [] __ 
        currentPiece[1][1]=type;   //  __ __ __ __
        currentPiece[2][1]=type;   //  __ __ __ __
    }
    if(type==3){
        currentPiece[0][1]=type;   //  __ [] [] __ 
        currentPiece[1][0]=type;   //  [] [] __ __ 
        currentPiece[1][1]=type;   //  __ __ __ __
        currentPiece[2][0]=type;   //  __ __ __ __
    }
    if(type==4){
        currentPiece[0][1]=type;   //  __ [] __ __ 
        currentPiece[1][0]=type;   //  [] [] [] __ 
        currentPiece[1][1]=type;   //  __ __ __ __
        currentPiece[2][1]=type;   //  __ __ __ __
    }
    if(type==5){
        currentPiece[0][0]=type;   //  [] [] __ __ 
        currentPiece[1][0]=type;   //  __ [] [] __ 
        currentPiece[1][1]=type;   //  __ __ __ __
        currentPiece[2][1]=type;   //  __ __ __ __
    }
    if(type==6){
        currentPiece[0][1]=type;   //  __ __ __ __ 
        currentPiece[1][1]=type;   //  [] [] [] [] 
        currentPiece[2][1]=type;   //  __ __ __ __
        currentPiece[3][1]=type;   //  __ __ __ __
    }
    if(type==7){
        currentPiece[0][0]=type;   //  [] [] __ __ 
        currentPiece[0][1]=type;   //  [] [] __ __ 
        currentPiece[1][0]=type;   //  __ __ __ __
        currentPiece[1][1]=type;   //  __ __ __ __
    }
    if(type==8){    //          TEST
        currentPiece[1][1]=type;   //  __ __ __ __
                                   //  __ [] __ __ 
                                   //  __ __ __ __ 
                                   //  __ __ __ __
    }
}

function printArena(arena){
    let a=[];
    for(let j=0; j<arena[0].length; j++){
        for(let i=0; i<arena.length; i++){
            a += arena[i][j].toString() +' ';
        }
        a += '\n';
    }
    console.log(a);
}