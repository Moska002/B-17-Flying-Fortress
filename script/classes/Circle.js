class Circle {

	constructor(){
		this.radius = 5;
		this.currentX = ctsWidth / 2;
		this.currentY = ctsHeight / 2;
		this.speedX = getRand(3, 5);
		this.speedY = getRand(3, 5);
		
		if(this.speedY < 0){
			this.speedY *= -1;
		}

		this.timer = new Date().getDate();
	}

	reset(){
		this.currentX = ctsWidth / 2;
		this.currentY = ctsHeight / 2;
		this.speedX = getRand(3, 5);
		this.speedY = getRand(3, 5);
		
		if(this.speedY < 0){
			this.speedY *= -1;
		}
	}

	getX(){
		return this.currentX;
	}

	getY(){
		return this.currentY;
	}

	getSpeedX(){
		return this.speedX;
	}

	getSpeedY(){
		return this.speedY;
	}

	getRadius(){
		return this.radius;
	}

	reverseSpeedX(){
		this.speedX *= -1;
	}

	reverseSpeedY(){
		this.speedY *= -1;
	}

	update(player) {
		if((this.currentX - this.radius) <= 0 || (this.currentX + this.radius) >= ctsWidth){
			playSound("sounds/Bip.mp3");
			this.speedX *= -1;
		}
		if((this.currentY - this.radius) <= 0 || (this.currentY + this.radius) >= ctsHeight){
			playSound("sounds/Bip.mp3");
			this.speedY *= -1;
		}
		if((this.currentY + this.radius) >= ctsHeight){
			life--;

			player.reset();
			this.reset();
		}
		
		if(this.currentX + this.radius > player.getX() && 
			this.currentX - this.radius < player.getX() + player.getWidth() && 
			this.currentY + this.radius > player.getY() && 
			this.currentY - this.radius < player.getY() + player.getHeight() &&
			this.speedY > 0){
				playSound("sounds/Bip.mp3");
				this.speedY *= -1;

				if(this.currentY > player.getY() && 
					this.currentY < player.getY() + player.getHeight() && 
					this.currentX + this.radius > player.getX() &&
					this.speedX > 0){
						this.speedX *= -1;
				}
				else if(this.currentY > player.getY() && 
					this.currentY < player.getY() + player.getHeight() && 
					this.currentX - this.radius < player.getX() + player.getWidth() &&
					this.speedX < 0){
					this.speedX *= -1;
				}
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
		
		this.currentX = this.currentX + this.speedX;
		this.currentY = this.currentY + this.speedY;
	}

	draw() {
		ctx.moveTo(this.currentX + this.radius, this.currentY);
		
		ctx.beginPath();
		ctx.arc(this.currentX, this.currentY, this.radius, toRad(0), toRad(360));
		ctx.fillStyle = 'white';
		ctx.fill();

		ctx.stroke();
	}
}
