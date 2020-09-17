var player;
var ball;
var matrix;

var life = 3;
var points = 0;

function breakdownMenu(){
	document.body.style.backgroundColor = "#B73239";

    ctx.clearRect(0, 0, ctsWidth, ctsHeight);

    ctx.font = "100px ArcadeClassic";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
    ctx.fillText("BREAKOUT", 450, 360);
    drawText(450, 390, "Press space to continue", "white");

    requestAnimationFrame(breakdownMenu);
}

document.addEventListener('keydown' , e => {
	if(e.code == "Space" && gameSelect == 2){
		if(!isPlaying && !isMain){
			isPlaying = true;
			initBreakdown();
		}
	}
	else if (e.code == "Escape"){
		if(!isPlaying && !isMain){
			isMain = true;
			document.body.style.backgroundColor = "green";
			isMenuThemePlaying = false;
			requestAnimationFrame(menuFrame);
		}
	}
});

function initBreakdown(){
	initMatrix(75, 25);

	life = 3;
	points = 0;

	player = new Slider(150, 15);
	ball = new Circle();

	requestAnimationFrame(createBreakdownFrame);

	window.addEventListener('keydown',  event => {
		switch (event.key) {
			case "KeyA":
			case "ArrowLeft":
				player.setMoveLeft(true);
				break;
			case "KeyD":
			case "ArrowRight":
				player.setMoveRight(true);
				break;
		}
	});

	window.addEventListener('keyup', event => {
		switch (event.key) {
			case "KeyA":
			case "ArrowLeft":
				player.setMoveLeft(false);
				break;
			case "KeyD":
			case "ArrowRight":
				player.setMoveRight(false);
				break;
		}
	});	
}

function createBreakdownFrame() {
	ctx.clearRect(0, 0, ctsWidth, ctsHeight);

	player.update();
	ball.update(player);
	updateMatrix(ball);
	
	ball.draw();
	player.draw();
	drawMatrix();
	
	drawText(800, 650, "LIFES " + life, "white");
	drawText(100, 650, "SCORE " + points, "white");
	
	if(life <= 0){
		playSound("sounds/MissionFailed.mp3");
		isPlaying = false;
		gameOver();
	}
	else if(checkBricks()){
		isPlaying = false;
		points *= life;
		gameOver();
	}
	else{
		requestAnimationFrame(createBreakdownFrame);
	}
}

function gameOver(){
	ctx.clearRect(0, 0, ctsWidth, ctsHeight);
		
	ctx.font = "100px ArcadeClassic";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText("GAME OVER", 450, 300);

	drawText(450, 340, "SCORE " + points, "white");
	drawText(450, 390, "Press space to play another game or press ESC for exit");
	
	requestAnimationFrame(gameOver);
}

