var cts;
var ctx;

var ctsWidth;
var ctsHeight;
var screenHeight;

var isPlaying;
var isMain;

function start() {
	init();
	trap();
}

function init() {
	document.body.style.backgroundColor = "purple";

	cts = document.getElementById("canvas"); //Elemento del canvas
	ctx = cts.getContext("2d"); //Imposto grafica 2D

	ctsWidth = cts.width;
	ctsHeight = cts.height;

	/*screenHeight = window.innerHeight - 20;
	document.getElementById("div").style.height = screenHeight + "px";
	console.log(screen.height);
	console.log(screen.availHeight);
	console.log(window.innerHeight);
	console.log(document.documentElement.clientHeight);*/

	isPlaying = false;
	isMain = true;
}

function drawRect(x, y, width, height, color) {
	ctx.moveTo(x, y);

	ctx.beginPath();
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

function drawCircle(x, y, radius, color) {
	ctx.moveTo(x + radius, y);

	ctx.beginPath();
	ctx.arc(x, y, radius, toRad(0), toRad(360));
	ctx.closePath();

	ctx.fillStyle = 'white';
	ctx.fill();

	ctx.lineWidth = 1;
	ctx.strokeStyle = color;
	ctx.stroke();
}

function drawImage(x, y, width, height, src) {
	image = new Image();
	image.src = src;
	ctx.drawImage(image, x, y, width, height);
}

function drawDashedLine(x, y, lenght, pattern, color, width, vertical) {
	ctx.strokeStyle = color;
	ctx.lineWidth = width;

	ctx.beginPath();
	if(vertical){
		ctx.setLineDash(pattern);
		ctx.moveTo(x, y);
		ctx.lineTo(x, y + lenght);
		ctx.stroke();
	}
	else{
		ctx.setLineDash(pattern);
		ctx.moveTo(x, y);
		ctx.lineTo(x + lenght, y);
		ctx.stroke();
	}

	ctx.setLineDash([0, 0]);
  }

function toRad(deg) {
	return (deg * Math.PI) / 180;
}

function toDeg(rad) {
	return (rad * 180) / Math.PI;
}

function getRand(min, max) {
	var num = Math.floor(Math.random() * (max - min)) + min;
	num *= Math.ceil(Math.random() * 2) == 1 ? 1 : -1;

	return num;
}

function playSound(url){
	var track = new Audio(url, 50, false);
	track.play();
}

function drawText(x, y, str, color) {
	ctx.font = "25px ArcadeClassic";
	ctx.fillStyle = color;
	ctx.textAlign = "center";
	ctx.fillText(str, x, y);
}

function trap(){
	ctx.clearRect(0, 0, ctsWidth, ctsHeight);

	ctx.font = "75px ArcadeClassic";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
	ctx.fillText("Click		to		start", 450, ctsHeight / 2);

	requestAnimationFrame(trap);
}

document.addEventListener("click", click);
function click(e) {
	isMenuThemePlaying = true;
    menuTheme = new Audio("sounds/BarTheme.mp3");
    menuTheme.loop = true;
    menuTheme.play();

	requestAnimationFrame(mainMenu);
}