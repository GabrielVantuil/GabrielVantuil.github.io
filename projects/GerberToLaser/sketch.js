var linesPerMM = 10;
var laserOnCMD, laserOffCMD;
let burnSpeed = 300;
let travelSpeed = 5000;
let beanHsize, beanVsize;

var fileLines;
var file;
var converted =[];
let canvas, mat;
let bgColor;
let wireColor;
let gcode=[];
let boundaries;
let grb_widths = [];
let isConverted =0;


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
            line(code.x,
                height - code.y,
                lastPoint.x,
                height - lastPoint.y
            );
            lastPoint = code;
        }
        else if(code.d == 2){
            lastPoint = code;
        }
        else if(code.d == 3){   //draw one shape
            strokeWeight(0);
            if(drawType == "round")     ellipse(code.x, height - code.y, diameter, diameter);
            if(drawType == "donut");
            if(drawType == "rect")      rect((code.x - diameter/2), height - code.y - linesPerMM * param0/2, diameter, linesPerMM * param0);
            if(drawType == "polygon")   polygon(code.x, height - code.y, diameter/2, param0, param1);
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

    if(canvas) canvas.remove();
    createCanvas(Math.round(boundaries.biggest.x), Math.round(boundaries.biggest.y));
    canvas = document.getElementById("defaultCanvas0");
    viewerDiv.append(canvas);
    background(bgColor);
    strokeWeight(1);

    
    drawBoard(converted);
    writeGcode();
    $('#output').html(gcode.replaceAll("\n","<br>"));
    
    $('#estimated_time_label').show();
    $('#est_time').show();
    let estimated_time = (boundaries.biggest.y*boundaries.biggest.x/linesPerMM)*(1/int(burnSpeed) + 1/int(travelSpeed));
    $('#est_time').html(floor(estimated_time)+"min" + int((estimated_time%1)*60)+"s" );

    
    
};
function updateParameters(){
    linesPerMM = parseFloat($('#linesPerMM').val());
    laserOffCMD = $('#L_OFF').val();
    laserOnCMD = $('#L_ON').val();
    burnSpeed = $('#burn_speed').val();
    travelSpeed = $('#travel_speed').val();
    beanHsize  = parseFloat($('#beanHsize').val());
    beanVsize  = parseFloat($('#beanVsize').val());
}

function writeGcode(){
    let currentPixel=[height,0];
    let lastPixel=-1;
    gcode = "";
    mat = cv.imread(canvas);
    
    //let wireColorOpenCV = wireColor[1];
    let wireColorOpenCV = wireColor;
    let beanVertRadius = round((beanVsize/2)*linesPerMM);


    for(let Yi = 0; Yi < height; Yi++){
        gcode+= laserOffCMD+ "\n";
        gcode+= "G01 F" + travelSpeed +" X0Y" + (Yi/linesPerMM).toFixed(2) + "\n";    
        gcode+= laserOnCMD+ "\n";
        for(let Xi = 0; Xi < width; Xi++){
            lastPixel = currentPixel;
            // //currentPixel=get(Xi, height-Yi-1)[1];
            // currentPixel = mat.ucharPtr(height-Yi-1, Xi)[1];
            // if(equals(lastPixel, wireColorOpenCV) && !equals(currentPixel, wireColorOpenCV)){ //finds right borders  
            //     gcode += "G01 F" + burnSpeed + " X" +(Xi/linesPerMM + beanDiameter/2).toFixed(2)+"\n";
            //     gcode += laserOnCMD+ "\n";
            // }
            // if(equals(currentPixel, wireColorOpenCV) && !equals(lastPixel, wireColorOpenCV)){ //finds left borders  
            //     gcode += "G01 F" + burnSpeed + " X"+ (Xi/linesPerMM - beanDiameter/2).toFixed(2)+"\n";
            //     gcode += laserOffCMD+ "\n";
            // }


            currentPixel = [height-Yi-1, Xi];

            if(vertPixelComp(lastPixel, wireColor, beanVertRadius) && !vertPixelComp(currentPixel, wireColor, beanVertRadius)){ //finds right borders  
                gcode += "G01 F" + burnSpeed + " X" +(Xi/linesPerMM + beanHsize/2).toFixed(2)+"\n";
                gcode += laserOnCMD+ "\n";
            }
            if(vertPixelComp(currentPixel, wireColor, beanVertRadius) && !vertPixelComp(lastPixel, wireColor, beanVertRadius)){ //finds left borders  
                gcode += "G01 F" + burnSpeed + " X"+ (Xi/linesPerMM - beanHsize/2).toFixed(2)+"\n";
                gcode += laserOffCMD+ "\n";
            }
        }
        gcode += "G01 F" + burnSpeed + " X"+ (width/linesPerMM + beanHsize/2).toFixed(2)+"\n";
        //document.getElementById("progress_bar").value = (Yi+1)/height*100;
    }
    gcode+= laserOffCMD+ "\n";
    gcode+= "G1 X0 Y0";
    gcode+= "M84\n";
    isConverted = 1;
}
function vertPixelComp(px1, color, radius){   //returns true if any of the pixels vertically within the radius is equal
    for(let y = 1; y<=radius; y++){
        if(px1[0] >= y){  //block negative coords
            if(mat.ucharPtr(px1[0] - y, px1[1]).every((val, index) => val == color[index]))
                return true;
        }
        if((px1[0] + y) < height){//block off screen coords
            if(mat.ucharPtr(px1[0] + y, px1[1]).every((val, index) => val == color[index]))
                return true;
        }
    }
    if(mat.ucharPtr(px1[0], px1[1]).every((val, index) => val == color[index]) )
        return true;
    return false;
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