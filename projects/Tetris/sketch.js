var arena = new Array(10);
let arenaPrev  = new Array(10);
var currentPiece = new Array(4);
var sqSize = 20;

let posX=3;
let posY=0;

let nextPieces = [3,4,5,6,7];
let currentType;
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
    if (keyCode === UP_ARROW){
        let future = copyMatrix(currentPiece);
        future = rotatePiece(currentPiece);
        if(!checkCollision(future, arena))
            currentPiece = future;
    }
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
        posY+=0;
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
    drawNext();
}
function checkCollision(piece, arena, futureX=0, futureY=0){
    for(let j = 0; j<piece[0].length; j++){
        for(let i = 0; i<piece.length; i++){
            if((i+futureX)>=0 && (i+futureX)<arena.length && (j+futureY)<arena[0].length)
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
function returnPiece(type=1){
    let piece = copyMatrix(currentPiece);
    for(let i = 0; i < piece.length; i++)
        piece[i] = new Array(4).fill(0);
    if(type==1){
        piece[0][0]=type;   //  [] __ __ __ 
        piece[0][1]=type;   //  [] [] [] __ 
        piece[1][1]=type;   //  __ __ __ __
        piece[2][1]=type;   //  __ __ __ __
    }
    if(type==2){
        piece[2][0]=type;   //  __ __ [] __ 
        piece[0][1]=type;   //  [] [] [] __ 
        piece[1][1]=type;   //  __ __ __ __
        piece[2][1]=type;   //  __ __ __ __
    }
    if(type==3){
        piece[0][1]=type;   //  __ [] __ __ 
        piece[1][0]=type;   //  [] [] [] __ 
        piece[1][1]=type;   //  __ __ __ __
        piece[2][1]=type;   //  __ __ __ __
    }
    if(type==4){
        piece[0][1]=type;   //  __ [] [] __ 
        piece[1][0]=type;   //  [] [] __ __ 
        piece[1][1]=type;   //  __ __ __ __
        piece[2][0]=type;   //  __ __ __ __
    }
    if(type==5){
        piece[0][0]=type;   //  [] [] __ __ 
        piece[1][0]=type;   //  __ [] [] __ 
        piece[1][1]=type;   //  __ __ __ __
        piece[2][1]=type;   //  __ __ __ __
    }
    if(type==6){
        piece[0][1]=type;   //  __ __ __ __ 
        piece[1][1]=type;   //  [] [] [] [] 
        piece[2][1]=type;   //  __ __ __ __
        piece[3][1]=type;   //  __ __ __ __
    }
    if(type==7){
        piece[0][0]=type;   //  [] [] __ __ 
        piece[0][1]=type;   //  [] [] __ __ 
        piece[1][0]=type;   //  __ __ __ __
        piece[1][1]=type;   //  __ __ __ __
    }
    if(type==8){    //          TEST
        piece[1][1]=type;   //  __ __ __ __
                            //  __ [] __ __ 
                            //  __ __ __ __ 
                            //  __ __ __ __
    }
    return piece;
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
function rotatePiece(piece){
    let rotated = copyMatrix(piece);
    if(currentType < 6)
        for(let i = 0; i<3; i++)
            for(let j = 0; j<3; j++){
                rotated[j][2-i] = piece[i][j];
            }
    if(currentType == 6)
        for(let i = 0; i<4; i++)
            for(let j = 0; j<4; j++){
                rotated[j][3-i] = piece[i][j];
            }
    if(currentType == 7) return copyMatrix(rotated);;
    
//     if(currentType == 7) return;
// //          shift
//     while( rotated[0][0] == 0 && rotated[0][1] == 0 && rotated[0][2] == 0 && rotated[0][3] == 0){
//         let aux = copyMatrix(rotated);
//         for(let i = 0; i<3; i++)
//             for(let j = 0; j<4; j++){
//                 rotated[i][j] = aux[i+1][j];
//             }
//         for(let i = 0; i<4; i++)
//             rotated[3][i] = 0;
//     }
//     while   ( rotated[0][0] == 0 && rotated[1][0] == 0 && rotated[2][0] == 0 && rotated[3][0] == 0){
//         let aux = copyMatrix(rotated);
//         for(let i = 0; i<4; i++)
//             for(let j = 0; j<3; j++){
//                 rotated[i][j] = aux[i][j+1];
//             }
//         for(let i = 0; i<4; i++)
//             rotated[i][3] = 0;
//     }
    return copyMatrix(rotated);

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
function drawNext(xOffset=350, yOffset=100){
    for(let next = 0; next < nextPieces.length;next++){
        let piece = returnPiece(nextPieces[next]);
        noStroke(); fill(0); rect(xOffset, yOffset, 4 * sqSize, 4 * sqSize);
                
        for(let i=0; i<4; i++){
            for(let j=0; j<4; j++){
                // stroke(80);
                if(piece[i][j]==0){
                    noFill();
                }
                else if(piece[i][j] == 1) fill("orange");
                else if(piece[i][j] == 2) fill("red");
                else if(piece[i][j] == 3) fill("cyan");
                else if(piece[i][j] == 4) fill("yellow");
                else if(piece[i][j] == 5) fill("green");
                else if(piece[i][j] == 6) fill("blue");
                else if(piece[i][j] == 7) fill("magenta");
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
        yOffset+= (piece.length ) * sqSize;
    }
}
function copyMatrix(original){
    var matrix = [];
    for (var i = 0; i < original.length; i++)
        matrix[i] = original[i].slice();
    return matrix;
}
function changeCurrent(type=1){
    currentType = type;
    currentPiece = returnPiece(type);
}
function placePiece(piece, arena, X, Y){
    for(let i = 0; i<piece.length; i++)
        for(let j = 0; j<piece[0].length; j++){
            if((i+X)>=0 && (i+X)<arena.length && (j+Y)<arena[0].length)
            if(arena[i+X][j+Y] == 0)
                arena[i+X][j+Y] = piece[i][j];
        }
}