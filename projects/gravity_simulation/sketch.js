const GRAV_CONST = 0.1;//6.67 * 10^-11;
var time_sim = 0;

var B = [];


class body{
    constructor(mass, speed, position, _color, density = 1){
        this.mass = mass;
        this.speed = speed;
        this.position = position;
        this.accel = createVector(0,0);
        this._color = _color;
        this.density = density*3;
        this.radius = mass/this.density;
    }
    draw(){
        fill(0); stroke(this._color);
        // fill(this._color); stroke(0);
        // textAlign(CENTER);        text(round(this.position.x) +',' + round(this.position.y), this.position.x-this.mass/2, this.position.y-this.mass/2);
        ellipse(this.position.x, this.position.y, this.radius, this.radius);
        
    }
}


function update_pos(bodys){
    //calc acceleration (gravity)
    for(current of bodys){
        current.accel=createVector(0,0);
        for(other of bodys){
            if(current != other && current.position.dist(other.position) > 1){
                // if(round(other.position.x) != round(current.position.x))
                //     current.accel.x += GRAV_CONST * other.mass / (other.position.x - current.position.x);
                // if(round(other.position.y) != round(current.position.y))
                //     current.accel.y += GRAV_CONST * other.mass / (other.position.y - current.position.y);
                let magAccel = GRAV_CONST * other.mass / current.position.dist(other.position);

                let A = createVector(
                    magAccel * ( (other.position.x - current.position.x) / current.position.dist(other.position)),
                    magAccel * ( (other.position.y - current.position.y) / current.position.dist(other.position))
                );
                current.accel.add(A);
                console.log(magAccel);
            }
            line(current.position.x,current.position.y,other.position.x,other.position.y);
        }
    }
    for(current of bodys){
        current.speed.add(current.accel);
        current.position.add(current.speed);
        current.draw();
    }
}

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    // B.push(new body(30, createVector(-0.2,0), createVector(400,400), color(200,200,0)));
    // B.push(new body(30, createVector(0,0), createVector(573,500), color(0,255,0)));
    B.push(new body(30, createVector(0.2,0), createVector(400,600), color(255,0,0)));
    B.push(new body(30, createVector(-0.7,0), createVector(600,400), color(200,200,0)));
    B.push(new body(30, createVector(0,0), createVector(600,301), color(0,255,0)));
    B.push(new body(30, createVector(0.7,0), createVector(600,200), color(255,0,0)));
}

function draw(){
    background(0);
    time_sim++;
    update_pos(B);
    // fill(0,255,0);
    // text("Speed (mm/s): ", 20, 50);
    // fill(0,255,255);
    // text("Acceleration (mm/s²): ", 20, 75);
    // fill(255);
    
}
