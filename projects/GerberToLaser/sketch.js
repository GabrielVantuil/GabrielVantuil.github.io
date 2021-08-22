var linesPerMM = 10;
var laserOnCMD, laserOffCMD;
let burnSpeed = 300;
let travelSpeed = 5000;
let beanHsize, beanVsize;
let borderClearance;

var fileLines;
var file;
var converted =[];
let inputCanvas, outputCanvas;
let mat, matOut, matOrig;
let bgColor;
let wireColor;
let gcode=[];
let boundaries;
let grb_widths = [];
let isConverted =0;
let showingPreview = false;

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function setup() {
    bgColor = color(0, 100, 0).levels;
    wireColor = color(0, 0, 0).levels;
    
    // createCanvas(Math.round(viewerDiv.getBoundingClientRect().width), Math.round(viewerDiv.getBoundingClientRect().height));
    // canvas = document.getElementById("defaultCanvas0");
    // viewerDiv.append(canvas);
    // background(bgColor);
    // strokeWeight(1);
};

var openFile = function(event) {
    var input = event.target;
    isConverted = 0;
    $('#estimated_time_label').hide();
    $('#est_time').hide();
    let fileReader = new FileReader();
    fileReader.onload = function(){
        file = fileReader.result;
        var node = document.getElementById('output');
        node.innerText = file;
    };
    fileReader.readAsText(input.files[0]);
};

function convertToCoords(line){
    let X = round(linesPerMM * parseInt(line.match(/(?<=X)\d*/g))/10000.0);
    let Y = round(linesPerMM * parseInt(line.match(/(?<=Y)\d*/g))/10000.0);
    let Dtype = parseInt(line.match(/(?<=D)\d*/g));
    return {x:X,y:Y,d:Dtype};
}
function findBoundaries(converted, grb_widths){
    let biggest = {x:0,y:0};
    let smallest= {x:Infinity,y:Infinity};
    converted.forEach(element => {
        let currentX = element.x;
        let currentY = element.y;
        if(currentX > biggest.x)    biggest.x = currentX;
        if(currentY > biggest.y)    biggest.y = currentY;
        
        if(currentX < smallest.x)   smallest.x = currentX;
        if(currentY < smallest.y)   smallest.y = currentY;
    });
    let biggest_diameter=0;
    grb_widths.forEach(element=> {
        if(biggest_diameter < element.diameter)
            biggest_diameter = element.diameter;
    });
    
    smallest.x -= biggest_diameter/2+1;
    smallest.y -= biggest_diameter/2+1;

    biggest.x += biggest_diameter/2+1;
    biggest.y += biggest_diameter/2+1;
    
    return {smallest, biggest}; //values in mm
}
function drawBoard(codes){
    //let sequence=false;
    let lastPoint;
    let diameter=1;
    let drawType;
    let param0;
    let param1;
    // beginPath();
    stroke(wireColor);
    fill(wireColor);

    codes.forEach(code => {
        if(code.d == 1){
            line(code.x + borderClearance,
                height - code.y - borderClearance,
                lastPoint.x + borderClearance,
                height - lastPoint.y - borderClearance
            );
            lastPoint = code;
        }
        else if(code.d == 2){
            lastPoint = code;
        }
        else if(code.d == 3){   //draw one shape
            strokeWeight(0);
            if(drawType == "round")     ellipse(code.x + borderClearance, height - code.y - borderClearance, diameter, diameter);
            if(drawType == "donut");
            if(drawType == "rect")      rect(code.x - diameter/2 + borderClearance, height - code.y - linesPerMM * param0/2  - borderClearance, diameter, linesPerMM * param0);
            if(drawType == "polygon")   polygon(code.x + borderClearance, height - code.y - borderClearance, diameter/2, param0, param1);
        }
        else if(code.d >= 10){
            grb_widths.forEach(w =>{
                if(code.d == w.D){
                    diameter = w.diameter;
                    drawType = w.type;
                    param0 = w.param0;
                    param1 = w.param1;
                }
            });
            strokeWeight(diameter);
        }
    });
    roundBoardColors();
}
function roundBoardColors(){
    let original = cv.imread(canvas);
    let sumRgbBg = bgColor[0]+bgColor[1]+bgColor[2];
    let sumRgbWire = wireColor[0]+wireColor[1]+wireColor[2];
    let Bg_GT_wire = sumRgbBg > sumRgbWire;
    for(let Yi = 0; Yi < height; Yi++){
        for(let Xi = 0; Xi < width; Xi++){
            let current = original.ucharPtr(Yi, Xi)[0]+original.ucharPtr(Yi, Xi)[1]+original.ucharPtr(Yi, Xi)[2];
            if(current > (sumRgbBg/2+sumRgbWire/2)){
                if(Bg_GT_wire)  setPixelColor(original, [Yi, Xi], bgColor[0],bgColor[1],bgColor[2],255);
                else            setPixelColor(original, [Yi, Xi], wireColor[0],wireColor[1],wireColor[2],255);
            }
            else{
                if(Bg_GT_wire)  setPixelColor(original, [Yi, Xi], wireColor[0],wireColor[1],wireColor[2],255);
                else            setPixelColor(original, [Yi, Xi], bgColor[0],bgColor[1],bgColor[2],255);
            }
        }
    }
    cv.imshow(canvas, original);    
}
function convertHeaders(file){
    let converted = [];
    grb_widths = [];
    fileLines = file.split("\n");
    fileLines.forEach(element => {
        if(element.substring(0,4).toUpperCase() == "%ADD"){
            let drawType;
            if(element.match(/(?<=\d)\w(?=,)/g) == "C") drawType = "round";
            if(element.match(/(?<=\d)\w(?=,)/g) == "C" && element.match(/(?<=\d)X(?=\d)/g)) drawType = "donut";
            if(element.match(/(?<=\d)\w(?=,)/g) == "R") drawType = "rect";
            if(element.match(/(?<=\d)\w(?=,)/g) == "P") drawType = "polygon";
            let polyParams = element.match(/(?<=X)\d*\.?\d*/g);
            if(polyParams == null)  polyParams = [0,0];
            else if(polyParams[1] == null)  polyParams[1] = 0;
            grb_widths.push({
                "D":        parseInt(element.match(/(?<=\%ADD)\d*/g)),
                "diameter": round(linesPerMM * parseFloat(element.match(/(?<=,)\d.?\d*/g))),
                "type":     drawType,
                "param0":   polyParams[0], //angle of polygon | height of rect | ID of round
                "param1":   polyParams[1]  //rotation of polygon
            });
        }
        converted.push(convertToCoords(element));
    });
    return converted;
}
function convert(){
    updateParameters();

    converted = convertHeaders(file);
    boundaries = findBoundaries(converted, grb_widths);

    if(inputCanvas) inputCanvas.remove();
    createCanvas(Math.round(boundaries.biggest.x + borderClearance*2), Math.round(boundaries.biggest.y + borderClearance*2));
    //createCanvas(Math.round(boundaries.biggest.x), Math.round(boundaries.biggest.y));
    inputCanvas = document.getElementById("defaultCanvas0");
    //outputCanvas = document.getElementById("defaultCanvas1");
    viewerDiv.append(inputCanvas);
    background(bgColor);
    strokeWeight(1);

    
    drawBoard(converted);
    writeGcode();
    $('#output').html(gcode.replaceAll("\n","<br>"));
    
    $('#estimated_time_label').show();
    $('#est_time').show();
    let estimated_time = (boundaries.biggest.y*boundaries.biggest.x/linesPerMM)*(1/int(burnSpeed) + 1/int(travelSpeed));
    $('#est_time').html(floor(estimated_time)+"min" + int((estimated_time%1)*60)+"s" );
    $("#preview_bt").prop("disabled", false);
    $("#download_bt").prop("disabled", false)
};
function updateParameters(){
    linesPerMM = parseFloat($('#linesPerMM').val());
    laserOffCMD = $('#L_OFF').val();
    laserOnCMD = $('#L_ON').val();
    burnSpeed = $('#burn_speed').val();
    travelSpeed = $('#travel_speed').val();
    beanHsize  = parseFloat($('#beanHsize').val());
    beanVsize  = parseFloat($('#beanVsize').val());
    borderClearance = parseFloat($('#border_clearance').val()) * linesPerMM;
}

function writeGcode(){
    matOrig = cv.imread(inputCanvas);
    mat = matOrig.clone();
    matOut = matOrig.clone();

    let beanVertRadius = round((beanVsize/2)*linesPerMM);
    let lastPixel=-1;
    let currentPixelResult, lastPixelResult;
    gcode = "";
    

    let laserON_debug=false;
    let currentPixel = vertPixelComp([height,0], wireColor, beanVertRadius);
    testVert(wireColor, beanVertRadius);
    for(let Yi = 0; Yi < height; Yi++){
        gcode+= laserOffCMD+ "\n";
        gcode+= "G01 F" + travelSpeed +" X0Y" + (Yi/linesPerMM).toFixed(2) + "\n";    
        gcode+= laserOnCMD+ "\n";
        laserON_debug = true;
        for(let Xi = 0; Xi < width; Xi++){
            lastPixel = currentPixel;
            lastPixelResult = currentPixelResult;

            currentPixel = [height-Yi-1, Xi];
            currentPixelResult = mat.ucharPtr(currentPixel[0],currentPixel[1])[0]==0 ;
            
            if(lastPixelResult && !currentPixelResult){ //finds right borders  
                gcode += "G01 F" + burnSpeed + " X" +(Xi/linesPerMM + beanHsize/2).toFixed(2)+"\n";
                gcode += laserOnCMD+ "\n";
                laserON_debug = true;
                //setPixelColor(matOut, lastPixel, 0,255,255,255);
            }
            if(currentPixelResult && !lastPixelResult){ //finds left borders  
                gcode += "G01 F" + burnSpeed + " X"+ (Xi/linesPerMM - beanHsize/2).toFixed(2)+"\n";
                gcode += laserOffCMD+ "\n";
                laserON_debug = false;
                //setPixelColor(matOut, lastPixel, 255,255,0,255);//yellow
            }
            colorPixelPreview(currentPixel, laserON_debug);
        }
        gcode += "G01 F" + burnSpeed + " X"+ (width/linesPerMM + beanHsize/2).toFixed(2)+"\n";
        //document.getElementById("progress_bar").value = (Yi+1)/height*100;
    }
    gcode+= laserOffCMD+ "\n";
    gcode+= "G1 X0 Y0";
    gcode+= "M84\n";
    isConverted = 1;
}
function compareCoordsToColor(X,Y,color){
    return matOrig.ucharPtr(X, Y).every((val, index) => val == color[index])
}
function setPixelColor(src, px, R, G, B, A){
    src.ucharPtr(px[0], px[1])[0] = R;
    src.ucharPtr(px[0], px[1])[1] = G; 
    src.ucharPtr(px[0], px[1])[2] = B; 
    src.ucharPtr(px[0], px[1])[3] = A; 
}
function colorPixelPreview(pixel, state){
    if(state)   setPixelColor(matOut, pixel, 0,0,200,255);
    else        setPixelColor(matOut, pixel, 200,0,0,255);
}
function testVert(color, beanVertRadius){
    let currentPixel;
    for(let Yi = 0; Yi < height; Yi++){
        for(let Xi = 0; Xi < width; Xi++){
            currentPixel = [height-Yi-1, Xi];
            if(vertPixelComp(currentPixel, color, beanVertRadius)){
                mat.ucharPtr(currentPixel[0], currentPixel[1])[0] = 0;
                mat.ucharPtr(currentPixel[0], currentPixel[1])[1] = 200; 
                mat.ucharPtr(currentPixel[0], currentPixel[1])[2] = 0; 
                mat.ucharPtr(currentPixel[0], currentPixel[1])[3] = 255; 
            }
            else{
                mat.ucharPtr(currentPixel[0], currentPixel[1])[0] = 200;
                mat.ucharPtr(currentPixel[0], currentPixel[1])[1] = 0; 
                mat.ucharPtr(currentPixel[0], currentPixel[1])[2] = 0; 
                mat.ucharPtr(currentPixel[0], currentPixel[1])[3] = 255; 
            }
        }
    }
    //cv.imshow(canvas, mat);
}
function preview(){
    showingPreview = !showingPreview;
    if(showingPreview) cv.imshow(canvas, matOut);
    else cv.imshow(canvas, matOrig);
}
function vertPixelComp(px1, color, radius){
    let hasAbove=[];
    let hasBelow=[];
    if(compareCoordsToColor(px1[0], px1[1],color)){  //check the center pixel
        return true;
    }
    for(let y = 1; y <= (radius+1); y++){
        if(px1[0] >= y){  //block negative coords
            if(compareCoordsToColor(px1[0] - y, px1[1],color)){     //check below pixels
                hasBelow.push(y);
            }
        }
        if((px1[0] + y) < height){//block off screen coords
            if(compareCoordsToColor(px1[0] + y, px1[1],color)){    //check above pixels
                hasAbove.push(y);
            }
        }
    }
    if( ((hasAbove.length + hasBelow.length) == 0) ||
        (hasAbove[0] == radius+1) && (hasBelow.length==0) ||
        (hasBelow[0] == radius+1) && (hasAbove.length==0) ||
        (hasAbove[0] == radius+1) && (hasBelow[0] == radius+1)){  
        return false;   //none of the pixels in range matches
    }
    if((hasAbove[0] == 1) && (hasBelow[0] == 1)){
        return false;   //is a critical pixel
    }
    if(((hasAbove[0] + hasBelow[0]) == 3) && ((hasAbove[0] * hasBelow[0]) != 0)){
        return false;   //is a critical pixel        
    }

    return true;
}
function download() {
    
    var outputTxt = document.getElementById('output').innerText;
    var name = document.getElementById('file').value;
    if(isConverted){
        if(name.substr(-4,4) == ".gbr")
            name = name.substr(0,name.length-4) + ".gcode";
    }
    name = name.replace(/(C:\\fakepath\\)/gi,"");
    var type = "text/plain";
    var a = document.createElement("a");
    var file = new Blob([outputTxt], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}
function polygon(x, y, radius, npoints, degrees) {
    push();
    translate(x, y);
    rotate((degrees/180)*PI);
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = cos(a) * radius;
        let sy = sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
}

function onOpenCvReady() {
    console.log("OpenCV ok");
}

/*
5min36s para converter arquivo de 64x48


*/