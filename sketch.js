var inc = 0.1;
var cols, rows;
var scl = 20;
var speed = 1000;

var zoff = 0;
var fr;
var particles = []

var flowfield;

function setup() {
  createCanvas(windowWidth, windowHeight);


  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('')

  flowfield = new Array((cols * rows))

  for (var i = 0; i < 1000; i++) {
    particles[i] = new Particle();

  }
  background(255)

}


function draw(){
  var yoff = 0;
  for(let y = 0;y < rows;y++) {
    var xoff = 0;

    for(let x = 0;x < cols;x++) {
      var index = x + y * cols
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.5)
      flowfield[index] = v;
      xoff += inc;
      stroke(0,50);
/*       push();
      translate(x * scl, y * scl)
      rotate(v.heading());
      strokeWeight(1)
      line(0, 0, scl, 0)
      pop(); */

      }
      yoff += inc;
      zoff += 0.0003;

    }
    for (var i =0; i < particles.length; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();

      particles[i].show();
    }

    fr.html(floor(frameRate()))
    inc += 0.0001;

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}