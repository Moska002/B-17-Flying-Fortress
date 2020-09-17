var cts;
var ctx;

function start(){
	init();
	draw();
}

function init(){
	cts = document.getElementById("canvas");			//Elemento del canvas
	ctx = cts.getContext("2d");							//Imposto grafica 2D
}

function draw(){	
	ctx.moveTo(0, 0);									//Pennello in angolo sinistro 0, 0
	ctx.lineTo(100, 200);								//Penso di creare una linea
	ctx.stroke();										//Do il pennello
	
	ctx.moveTo(100, 150);								//Triangolo
	ctx.lineTo(250, 150);
	ctx.stroke();
	
	ctx.lineTo(250, 50);
	ctx.stroke();
	
	ctx.lineTo(100, 150);
	ctx.stroke();										//Fine triangolo
	
	ctx.beginPath();									//Momento di inizio di un percorso
	ctx.arc(1000, 1000, 500, toRad(0), toRad(360));		//.arc(x centro, y centro, raggio, angolo di partenza (rad), angolo di arrivo (rad)), antioraio/orario (true-false);
	ctx.stroke();
	ctx.moveTo(800, 750);
	ctx.arc(750, 750, 50, toRad(0), toRad(360));
	ctx.stroke();
	ctx.moveTo(1300, 750);
	ctx.arc(1250, 750, 50, toRad(0), toRad(360));
	ctx.stroke();
	ctx.moveTo(1250, 1000);
	ctx.arc(1000, 1000, 250, toRad(0), toRad(180), false);
	ctx.moveTo(1250, 1000);
	ctx.lineTo(750, 1000);
	ctx.stroke();
}

function toRad(deg){
	return deg * Math.PI / 180;
}