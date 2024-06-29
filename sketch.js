let points = [ 
  [100, 908], [736, 908], [678, 830], [678, 725], [733, 673], [806, 716], [805, 813], 
  [748, 860], [682, 813], [694, 676], [770, 629], [865, 656], [912, 748], [1005, 750], 
  [1098, 730], [1140, 653], [1226, 626], [1298, 641], [1333, 700], [1337, 764], [1312, 826], 
  [1272, 850], [1236, 861], [1189, 841], [1189, 738], [1258, 677], [1320, 724], [1328, 800], 
  [1269, 878], [1174, 893], [1093, 800], [1097, 709], [1154, 560], [1254, 600], [1390, 602], 
  [1400, 520], [1332, 480], [1248, 477], [1165, 436], [1093, 469], [1134, 422], [1165, 354], 
  [1156, 264], [1147, 230], [1163, 247], [1173, 272], [1223, 220], [1201, 154], [1140, 137], 
  [1094, 161], [1040, 153], [996, 146], [906, 157], [843, 180], [810, 210], [776, 192], 
  [717, 198], [683, 261], [705, 319], [733, 333], [759, 299], [737, 288], [726, 250], 
  [764, 232], [783, 265], [765, 310], [748, 385], [773, 446], [811, 484], [881, 501], 
  [873, 453], [931, 400], [944, 386], [934, 367], [931, 388], [953, 398], [988, 386], 
  [990, 368], [973, 372], [997, 394], [1050, 407], [1070, 467], [1036, 508], [983, 520], 
  [975, 479], [1002, 451], [970, 435], [931, 436], [921, 450], [953, 477], [964, 516], 
  [906, 527], [834, 513], [758, 482], [673, 532], [598, 562], [564, 610], [571, 665], 
  [618, 698], [679, 664], [730, 630], [800, 618], [862, 636], [902, 680], [926, 730], 
  [924, 794], [954, 822], [1048, 837], [1075, 820], [984, 830], [915, 836], [862, 886], 
  [795, 906], [951, 906], [1851, 906] 
];

let heartSize = 150;
let heartX, heartY;
let smallHearts = [];
let heartScattered = false;

function setup() { 
  createCanvas(1920, 1080);
  heartX = width / 2;
  heartY = height / 2;
}

function draw() {
  background(255); 
  drawBear();

  if (!heartScattered) {
    drawHeart(heartX, heartY, heartSize);
  } else {
    drawSmallHearts();
  }
}

function mousePressed() {
  if (!heartScattered) {
    scatterHeart();
    heartScattered = true;
  } else {
    resetAnimation();
  }
}

function drawBear() {
  noFill();
  stroke(150, 75, 0);
  strokeWeight(2);
  beginShape();
  points.forEach(([x, y]) => curveVertex(x, y));
  endShape();
}

function drawHeart(x, y, size) {
  fill(255, 0, 0);
  noStroke();
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
  fill(255);
  textSize(size / 6);
  textAlign(CENTER, CENTER);
  text("THANK YOU", x, y + size / 6);
}

function scatterHeart() {
  let numSmallHearts = 50;
  for (let i = 0; i < numSmallHearts; i++) {
    let angle = random(TWO_PI);
    let speed = random(2, 5);
    smallHearts.push({
      x: heartX,
      y: heartY,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      size: heartSize / 1.5
    });
  }
}

function drawSmallHearts() {
  smallHearts.forEach(heart => {
    heart.x += heart.vx;
    heart.y += heart.vy;
    drawHeart(heart.x, heart.y, heart.size);
  });
}

function resetAnimation() {
  heartSize = 150;
  smallHearts = [];
  heartScattered = false;
}
