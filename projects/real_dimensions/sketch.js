var pos_x_speed = 0;
var pos_x_accel = 0;
var screen_size = 15.6;

var rulerSize = 100;
var speed = 10;
var accel = 1;
var accel_start_pos=0;

var time_sim = 0;

function createDpiTestElements () {
    var getDpiHtmlStyle = 'data-dpi-test { height: 1in; left: -100%; position: absolute; top: -100%; width: 1in; }'
  
    var head = document.getElementsByTagName('head')[0]
    var getDPIElement = document.createElement('style')
    getDPIElement.setAttribute('type', 'text/css')
    getDPIElement.setAttribute('rel', 'stylesheet')
    getDPIElement.innerHTML = getDpiHtmlStyle
    head.appendChild(getDPIElement)
  
    var body = document.getElementsByTagName('body')[0]
    var dpiTestElement = document.createElement('data-dpi-test')
    dpiTestElement.setAttribute('id', 'dpi-test')
    body.appendChild(dpiTestElement)
  }
  
  /**
   * Evaluate the DPI of the device's screen (pixels per inche).
   * It creates and inpect a dedicated and hidden `data-dpi-test` DOM element to
   * deduct the screen DPI.
   * @method
   * @static
   * @returns {number} - The current screen DPI, so in pixels per inch.
   */
  function getSize() {
    return sqrt(pow(displayHeight/document.getElementById('dpi-test').offsetHeight,2)  +
      pow(displayWidth/ document.getElementById('dpi-test').offsetWidth,2));
  }


function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    var input_screen = createInput(screen_size,"number");
    input_screen.input(screen_size_input);
    input_screen.size(50);   
    input_screen.position(370, 10);
    
    var input_ruler = createInput(rulerSize,"number");
    input_ruler.input(input_ruler_function);
    input_ruler.size(40);   
    input_ruler.position(85, 10);
    
    var input_speed = createInput(speed,"number");
    input_speed.input(input_speed_function);
    input_speed.size(50);   
    input_speed.position(100, 35);
    
    var input_accel = createInput(accel,"number");
    input_accel.input(input_accel_function);
    input_accel.size(50);   
    input_accel.position(140, 60);

    
    var d = new Date();
    time_sim = d.getTime()/1000;

    createDpiTestElements();
    console.log(getSize());
}

function draw(){
    
    background(0);

    let conv = (sqrt(pow(displayWidth,2) + pow(displayHeight ,2)) / screen_size)/25.4;
    var d = new Date();
    var n = d.getTime()/1000;

    let screenWidth = displayWidth/conv; // Screen width in mm

    noStroke();    fill(255);   textAlign(LEFT);

    text("Ruler (cm): ", 20, 25);
    fill(0,255,0);
    text("Speed (mm/s): ", 20, 50);
    fill(0,255,255);
    text("Acceleration (mm/s²): ", 20, 75);
    fill(255);
    text("Screen size (in): ", 270, 25);
    text("Simulation time: "+ round(n - time_sim), 270, 50);
    text("Screen size: (experimental)  "+ getSize(), 270, 75);
    
    let defaultHeight = windowHeight;
    //------------------------------------------ Ruler ------------------------------------------
    fill(50);
    rect(0, defaultHeight-120, rulerSize * conv * 10+1,120);
    noStroke();
    fill(255);
    textAlign(CENTER);
    for(let i = 0;i<=rulerSize;i++){
        rect(windowWidth/50 + i * conv * 10, defaultHeight-120, 1, 100);
        text(i, windowWidth/50 + i * conv * 10, defaultHeight-10);
    }


    //------------------------------------------ Speed ------------------------------------------
    fill(0,255,0);
    pos_x_speed = (n*speed) % screenWidth ; //position in mm
    rect(pos_x_speed*conv, defaultHeight - 80, 60, 10);
    text(speed+"mm/s", pos_x_speed*conv+30, defaultHeight - 80);
    
    //------------------------------------------ Accel ------------------------------------------
    fill(0,255,255);
    if(pos_x_accel > screenWidth)
        accel_start_pos = n;
    pos_x_accel = (pow(n-accel_start_pos,2)*accel/2); //position in mm
    rect(windowWidth/50+pos_x_accel*conv, defaultHeight-60, 60, 10);
    text(round(10*(n-accel_start_pos)*accel)/10 +"mm/s", windowWidth/50+pos_x_accel*conv+30, defaultHeight-60);

}
function screen_size_input() {
    screen_size =  this.value();
}
function input_ruler_function() {
    rulerSize =  this.value();
}
function input_speed_function() {
    speed =  this.value();
}
function input_accel_function() {
    accel =  this.value();
}
