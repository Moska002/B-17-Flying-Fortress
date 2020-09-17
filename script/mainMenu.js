var gameSelect = 1;
var change;
var mainTheme;

var isMenuThemePlaying = false;
var menuTheme;

function mainMenu() {
    gameSelect = 1;
	change = true;

    document.removeEventListener("click", click);

    document.addEventListener("keydown", e => {
        if(!isPlaying){
            if(!isMenuThemePlaying && !isPlaying){
                isMenuThemePlaying = true;
                menuTheme = new Audio("sounds/BarTheme.mp3");
                menuTheme.loop = true;
                menuTheme.play();
            }
			
			if(change){
				switch (e.code) {
					case "KeyW":
					case "ArrowUp":
						change = false;
						if(gameSelect > 1)
							gameSelect -= 1;
						break;
					case "KeyS":
					case "ArrowDown":
						change = false;
						if(gameSelect < 3)
							gameSelect += 1;
						break;

					case "Enter":
						change = false;
						switch(gameSelect){
							case 1:
								isMain = false;
								menuTheme.pause();
								pongMenu();
								break;
							case 2:
								isMain = false;
								menuTheme.pause();
								breakdownMenu();
								break;
							case 3:
								isMain = false;
								menuTheme.pause();
								SIMenu();
								break;
						}
						break;
				}
			}
        }
    });
	
	document.addEventListener("keyup", e => {
		switch(e.code){
			case "KeyW":
			case "ArrowUp":
			case "KeyS":
			case "ArrowDown":
			case "Enter":
				change = true;
				break;
		}
	});

    requestAnimationFrame(menuFrame);
}

function menuFrame(){
    document.body.style.backgroundColor = "purple";
    document.body.style.backgroundImage = "none";

    ctx.clearRect(0, 0, ctsWidth, ctsHeight);

    ctx.font = "75px ArcadeClassic";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Select game: ", 450, 100);

    ctx.font = "40px ArcadeClassic";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Pong", 450, 200);

    ctx.font = "40px ArcadeClassic";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Breakout", 450, 300);

    ctx.font = "40px ArcadeClassic";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Space Invaders", 450, 400);

    drawCircle(250, 88 + (100 * gameSelect), 10, "white");

    requestAnimationFrame(menuFrame);
}