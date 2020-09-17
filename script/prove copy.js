var cts;
var ctx;

var ctsWidth;
var ctsHeight;

var life = 3;
var points = 0;

var ball;
var player;
var matrix;

//window.addEventListener('keydown', player.update(event), false);    //onkeydown = activeKeyEvents(event);
//window.addEventListener('keyup', player.update(event), false);

function start() {
	init();
	requestAnimationFrame(createFrame);
}

function init() {
	cts = document.getElementById("canvas"); //Elemento del canvas
	ctx = cts.getContext("2d"); //Imposto grafica 2D

	ctsWidth = cts.width;
	ctsHeight = cts.height;
	
	/*document.addEventListener('keydown', handleKeys);
	document.addEventListener('keyup', handleKeys);*/

	initMatrix(50, 15);

	player = new Slider(900, 20);
	ball = new Circle();
}

function createFrame() {
	ctx.clearRect(0, 0, ctsWidth, ctsHeight);

	ball.update(player);
	player.update(/*handleKeys*/);
	updateMatrix(ball);
	
	ball.draw();
	player.draw();
	drawMatrix();
	
	drawText(750, 650, "LIFES " + life, "white");
	drawText(50, 650, "SCORE " + points, "white");
	
	if(life > 0){
		requestAnimationFrame(createFrame);
	}
	else{
		gameOver();
	}
	
}

function initMatrix(rectWidth, rectHeight) {
	var health = 5;

	matrix = new Array(Math.ceil(ctsWidth / rectWidth));
	for (i = 0; i < matrix.length; i++) {
		matrix[i] = new Array(Math.ceil((ctsHeight * 4/7)/ rectHeight));
	}

	for (i = 0; i < matrix.length; i++) {
		for (j = 0; j < matrix[i].length; j++) {
			matrix[i][j] = new Brick(rectWidth * j, rectHeight * i, rectWidth, rectHeight, health);
		}
		health--;
		if(health <= 0){
			health = 5;
		}
	}
}

function drawMatrix() {
	var i, j;

	for (i = 0; i < matrix.length; i++) {
		for (j = 0; j < matrix[i].length; j++) {
			matrix[i][j].draw();
		}
	}
}

function updateMatrix(){
	var i, j;

	for (i = 0; i < matrix.length; i++) {
		for (j = 0; j < matrix[i].length; j++) {
			matrix[i][j].update(ball);
		}
	}
}

function drawRect(x, y, width, height, color) {
	ctx.moveTo(x, y);

	ctx.beginPath()
	ctx.lineTo(x + width, y);
	ctx.lineTo(x + width, y + height);
	ctx.lineTo(x, y + height);
	ctx.lineTo(x, y);
	ctx.closePath();

	ctx.fillStyle = color;
	ctx.fill();

	ctx.lineWidth = 1;     
	ctx.strokeStyle = "black";
	ctx.stroke();
}

function speed(speedX, speedY){

	return Math.sqrt(Math.pow(speedX, 2) + Math.pow(speedY, 2));
}

function toRad(deg) {
	return (deg * Math.PI) / 180;
}

function toDeg(rad){
	return (rad * 180) / Math.PI;
}

function drawText(x, y, str, color){
	ctx.font = "25px ArcadeClassic";
	ctx.fillStyle = color;
	ctx.fillText(str, x, y);
}

//Prove
function drawCircleMatrix() {
	var i = 0;
	var j = 0;

	var x = 50;
	var y = 50;
	var r = 10;

	for (i = 0; i < 5; i++) {
		for (j = 0; j < 5; j++) {
			ctx.moveTo(x * (j + 1) + r, y * (i + 1));
			ctx.arc(
				x * (j + 1),
				y * (i + 1),
				r,
				toRad(20 * (i + 1)),
				toRad(20 * (j + 1))
			);
			ctx.stroke();
		}
	}
}

function gameOver(){
	ctx.clearRect(0, 0, ctsWidth, ctsHeight);
	
	ctx.font = "100px ArcadeClassic";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText("GAME OVER", 450, 360);

	drawText(450, 400, "SCORE " + points, "white");
}