var spaceship;
var lifes;
var totalScore = 0;
var score = 0;

var projectileMine;
var projectileIncoming;
var index;
var indexIncoming;
var DIM_FIS = 50;

var matrix;
var downPx = 10;
var movementWait = 5000;
var anotherGame;

var canShoot;
var deathline;

var noSpam
var spamTime = 500;

function initSI(){

    totalScore = 0;
    score = 0;

    lifes = 3;
    noSpam = new Date().getTime() - spamTime;
    deathline = ctsHeight - 200;

    spaceship = {
        x: (ctsWidth - 25) / 2,
        y: ctsHeight - 100,
        width: 43,
        height: 56,
        speed: 4.5,
    
        moveLeft: false,
        moveRight: false,
        
        draw(){
            drawImage(this.x, this.y, this.width, this.height, "images/falcon.png");
        },
        
        update(){
            if(this.moveLeft && this.x > 100){
                this.x -= this.speed;
            }
            if(this.moveRight && ((this.x + this.width) < ctsWidth - 100)){
                this.x += this.speed;
            }

            this.hasImpacted();
        },
    
        setMoveLeft(x){
            this.moveLeft = x;
        },
    
        setMoveRight(x){
            this.moveRight = x;
        },
        
        getX(){
            return this.x;
        },
        
        getY(){
            return this.y;
        },
        
        getWidth(){
            return this.width;
        },
        
        getHeight(){
            return this.height;
        },

        hasImpacted(){
            var i;

            for(i = 0; i < DIM_FIS; i++){
                if(projectileIncoming[i] != null){
                    if(this.x <= (projectileIncoming[i].getX() + projectileIncoming[i].getRadius()) &&
                    (this.x + this.width) >= (projectileIncoming[i].getX() - projectileIncoming[i].getRadius()) &&
                    this.y <= (projectileIncoming[i].getY() + projectileIncoming[i].getRadius()) &&
                    (this.y + this.height) >= projectileIncoming[i].getY() - projectileIncoming[i].getRadius())
                    {
                    projectileIncoming[i] = null;
                    lifes--;

                    if(lifes > 0){
                        playSound("sounds/Hit.mp3");
                        score = 0;
                    }
                    
                    initAliens(50, 50);
                    initProjectiles();
                    }
                }
            }
        }
    }

    index = 0;
    indexIncoming = 0;
    canShoot = true;
	initProjectiles();
    initAliens(50, 50);

	document.addEventListener('keydown',  event => {
        if(isPlaying)
            switch (event.code) {
                case "KeyA":
                case "ArrowLeft":
                    spaceship.setMoveLeft(true);
                    break;
                case "KeyD":
                case "ArrowRight":
                    spaceship.setMoveRight(true);
                    break;
                    
                case "Space":
                    if(canShoot && (new Date().getTime() - noSpam) > spamTime && gameSelect == 3){
                        canShoot = false;
                        noSpam = new Date().getTime();
                        projectileMine[index % DIM_FIS] = new Projectile (spaceship.getX() + spaceship.getWidth() / 2, spaceship.getY(), 5, true);
						playSound("sounds/TieBlaster.mp3");
                        index++;
                    }
                    break;
            }
	});

	document.addEventListener('keyup',  e => {
        if(isPlaying)
            switch (e.code) {
                case "KeyA":
                case "ArrowLeft":
                    spaceship.setMoveLeft(false);
                    break;
                case "KeyD":
                case "ArrowRight":
                    spaceship.setMoveRight(false);
                    break;
                    
                case "Space":
                    canShoot = true;
                    break;
            }
    });
    
    //Music
    isMainThemePlaying = true;
    mainTheme = new Audio("sounds/StarWarsMainTheme.mp3");
    mainTheme.loop = true;
    mainTheme.play();

    requestAnimationFrame(createSIFrame);
}

function createSIFrame(){
    ctx.clearRect(0, 0, ctsWidth, ctsHeight);

	updateProjectiles();
    updateAliens();
    spaceship.update();
	
	drawProjectiles();
    drawAliens();
    spaceship.draw();

    drawDashedLine(5, deathline, ctsWidth, [20, 10], "red", 5, false);

    drawText(800, 650, "LIFES " + lifes, "white");
	drawText(100, 650, "SCORE " + (totalScore + score), "white");

    if(checkLine() || lifes <= 0){
        isPlaying = false;
        totalScore += score;
        mainTheme.pause();
		playSound("sounds/JoinMe.mp3");
        gameOverSI();
    }
    else if(checkAliens()){
        totalScore += score * lifes;
        score = 0;
        if(movementWait > 1000){
            movementWait -= 1000;
        }
        if(downPx < 30){
            downPx += 10;
        }
        playSound("sounds/SWWin.mp3");
        initAliens(50, 50);
        initProjectiles();
        requestAnimationFrame(createSIFrame);
    }
    else{
        requestAnimationFrame(createSIFrame);
    }
}

function SIMenu(){
    document.body.style.backgroundImage = "url('images/SIBG.jpg')";
    ctx.clearRect(0, 0, ctsWidth, ctsHeight);

    ctx.font = "100px ArcadeClassic";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
    ctx.fillText("SPACE INVADERS", 450, 360);
    drawText(450, 390, "Press space to continue", "white");

    requestAnimationFrame(SIMenu);
}

function gameOverSI(){
	ctx.clearRect(0, 0, ctsWidth, ctsHeight);
		
	ctx.font = "100px ArcadeClassic";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText("GAME OVER", 450, 300);

	drawText(450, 340, "SCORE " + totalScore, "white");
    drawText(450, 390, "Press space to play another game or press ESC for exit");

    requestAnimationFrame(gameOverSI);
}


document.addEventListener('keydown' , e => {
    if(e.code == "Space" && gameSelect == 3){
        if(!isPlaying && !isMain){
            isPlaying = true;
            initSI();
        }
    }
    else if (e.code == "Escape"){
        if(!isPlaying && !isMain){
            isMain = true;
            isMenuThemePlaying = false;
            requestAnimationFrame(menuFrame);
        }
    }
});