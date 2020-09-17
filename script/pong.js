var ball;
var playerOne;
var playerTwo;

var winner;

function initPong() {
    
    ball = {
        x: ctsWidth / 2,
        y: ctsHeight / 2,
        radius: 5,
        speedX: 5,
        speedY: 2,

        timer: new Date().getTime(),

        draw: function () {
            ctx.moveTo(this.x + this.radius, this.y);

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, toRad(0), toRad(360));
            ctx.closePath();

            ctx.fillStyle = 'white';
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.stroke();
        },

        reset: function(){
            this.x = ctsWidth / 2;
            this.y = ctsHeight / 2;
            this.speedX = getRand(3, 5);
            this.speedY = getRand(3, 5);
        },

        update: function (playerOne, playerTwo) {
            if (this.y - this.radius < 0 || this.y + this.radius > ctsHeight) {
				playSound("sounds/Bip.mp3");
                this.speedY *= -1;
            }
            else if (this.x - this.radius < 0) {
                playSound("sounds/Dentro.mp3");
                playerOne.removeLife();
                this.reset();
                playerOne.reset();
                playerTwo.reset();
            }
            else if (this.x + this.radius > ctsWidth) {
                playSound("sounds/Dentro.mp3");
                playerTwo.removeLife();
                this.reset();
                playerOne.reset();
                playerTwo.reset();
            }
			
			if(this.x + this.radius > playerOne.getX() && 
				this.x - this.radius < playerOne.getX() + playerOne.getWidth() && 
				this.y + this.radius > playerOne.getY() && 
				this.y - this.radius < playerOne.getY() + playerOne.getHeight() &&
				this.speedX < 0){
					playSound("sounds/Bip.mp3");
					this.speedX *= -1;

					/*if(this.x > playerOne.getX() && 
						this.x < playerOne.getX() + playerOne.getWidth()){
							this.speedY *= -1;
					}*/
			}
			else if(this.x + this.radius > playerTwo.getX() && 
				this.x - this.radius < playerTwo.getX() + playerTwo.getWidth() && 
				this.y + this.radius > playerTwo.getY() && 
				this.y - this.radius < playerTwo.getY() + playerTwo.getHeight() &&
				this.speedX > 0){
					playSound("sounds/Bip.mp3");
					this.speedX *= -1;

					/*if(this.x > playerTwo.getX() && 
						this.x < playerTwo.getX() + playerTwo.getWidth()){
							this.speedY *= -1;
					}*/
			}
			
            if(Math.abs(this.speedX) < 10 && Math.abs(this.speedY) < 10){
                if((new Date().getTime() - this.timer) > 7000){
                    this.timer = new Date().getTime();
                    
                    if(this.speedX < 0)
                        this.speedX -= 0.5;
                    else
                        this.speedX += 0.5;
                    if(this.speedY < 0)
                        this.speedY -= 0.5;
                    else
                        this.speedY += 0.5;
                }
            }

            this.x += this.speedX;
            this.y += this.speedY;
        }
    }

    playerOne = {
        x: 100,
        y: (ctsHeight - 100) / 2,
        width: 12,
        height: 100,
        speed: 10,
		life: 3,
		
		moveU: 0,
		moveD: 0,

        draw: function () {
            drawRect(this.x, this.y, this.width, this.height, "white");
        },

        reset: function(){
            this.x = 100;
            this.y = (ctsHeight - 100) / 2;
        },

        update: function () {
			if(this.moveU == 1){
				if(this.y > 0)
                    this.y -= this.speed;
			}
			else if(this.moveD == 1){
				if(this.y + this.height < ctsHeight)
                    this.y += this.speed;
			}
        },

        getLife: function(){
            return this.life;
        },

        removeLife: function(){
            this.life -= 1;
        },
		
		getX: function(){
			return this.x;
		},

        getY: function(){
            return this.y;
        },
		
		getWidth: function(){
			return this.width;
		},
		
		getHeight: function(){
			return this.height;
		},
		
		setMoveU: function(x){
			this.moveU = x;
		},
		
		setMoveD: function(x){
			this.moveD = x;
		}
    }

    playerTwo = {
        x: ctsWidth - 100,
        y: (ctsHeight - 100) / 2,
        width: 12,
        height: 100,
        speed: 10,
        life: 3,
		
		moveU: 0,
		moveD: 0,

        draw: function () {
            drawRect(this.x, this.y, this.width, this.height, "white");
        },

        reset: function(){
            this.x = ctsWidth - 100;
            this.y = (ctsHeight - 100) / 2;
        },

        update: function () {
            if(this.moveU == 1){
				if(this.y > 0)
                    this.y -= this.speed;
			}
			else if(this.moveD == 1){
				if(this.y + this.height < ctsHeight)
                    this.y += this.speed;
			}
        },

        getLife: function(){
            return this.life;
        },

        removeLife: function(){
            this.life -= 1;
        },
		
		getX: function(){
			return this.x;
		},

        getY: function(){
            return this.y;
        },
		
		getWidth: function(){
			return this.width;
		},
		
		getHeight: function(){
			return this.height;
		},
		
		getSpeedY: function(){
			return this.speedY;
		},
		
		setMoveU: function(x){
			this.moveU = x;
		},
		
		setMoveD: function(x){
			this.moveD = x;
		}
    }

	document.addEventListener('keydown', function makeMove(e) {
		switch (e.code) {
                case "KeyW":
                    // Up pressed
                    playerOne.setMoveU(1);
                    break;
                case "KeyS":
                    // Down pressed
                    playerOne.setMoveD(1);
                    break;
            }
		switch (e.code) {
                case "ArrowUp":
                    // Up pressed
                    playerTwo.setMoveU(1);
                    break;
                case "ArrowDown":
                    // Down pressed
                    playerTwo.setMoveD(1);
                    break;
            }
    });

    document.addEventListener('keyup', function makeNoMove(e) {
			switch (e.code) {
                case "KeyW":
                    // Up pressed
                    playerOne.setMoveU(0);
                    break;
                case "KeyS":
                    // Down pressed
                    playerOne.setMoveD(0);
                    break;
            }
		switch (e.code) {
                case "ArrowUp":
                    // Up pressed
                    playerTwo.setMoveU(0);
                    break;
                case "ArrowDown":
                    // Down pressed
                    playerTwo.setMoveD(0);
                    break;
            }
    });
    
    requestAnimationFrame(createPongFrame);
}

function createPongFrame(){
    ctx.clearRect(0, 0, ctsWidth, ctsHeight);

	playerOne.update();
	playerTwo.update();
    ball.update(playerOne, playerTwo);

    ball.draw();
    playerOne.draw();
    playerTwo.draw();
    drawDashedLine(ctsWidth / 2, 0, ctsHeight, [20, 10], "white", 5, true);

    drawText(100, 650, "LIFES " + playerOne.getLife(), "white");
    drawText(800, 650, "LIFES " + playerTwo.getLife(), "white");

    if(playerOne.getLife() <= 0){
        winner = 2;
        isPlaying = false;
        gameOverPong();
    }
    else if(playerTwo.getLife() <= 0){
        winner = 1;
        isPlaying = false;
        gameOverPong();
    }
	else{
		requestAnimationFrame(createPongFrame);
	}
}

function gameOverPong(){
    ctx.clearRect(0, 0, ctsWidth, ctsHeight);
		
	ctx.font = "100px ArcadeClassic";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText("Player " + winner + "     wins!", 450, 360);

	drawText(450, 400, "Press space to play another game or press ESC for exit");

    requestAnimationFrame(gameOverPong);
}


function pongMenu(){
    document.body.style.backgroundColor = "#FFC700";

    ctx.clearRect(0, 0, ctsWidth, ctsHeight);

    ctx.font = "100px ArcadeClassic";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
    ctx.fillText("PONG", 450, 360);
    drawText(450, 390, "Press space to continue", "white");

    requestAnimationFrame(pongMenu);
}

document.addEventListener('keydown' , e => {
    if(e.code == "Space" && gameSelect == 1){
        if(!isPlaying && !isMain){
            isPlaying = true;
            initPong();
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
