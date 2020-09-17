class Brick {
	constructor(x, y, width, height, life) {
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;

		this.health = life;
	}

	getWidth() {
		return this.width;
	}

	getHeight() {
		return this.height;
	}

	getHealth() {
		return this.health;
	}

	update(sphere) {
		//var r = sphere.getRadius();

		if(this.health > 0){
			/*if((sphere.getX() + r) >= this.x && (sphere.getX() + r) <= (this.x + this.width) && (this.y + this.height) >= (sphere.getY() - r) && sphere.getSpeedY() < 0 ||
				(sphere.getX() + r) >= this.x && (sphere.getX() + r) <= (this.x + this.width) && this.y >= (sphere.getY() + r) && sphere.getSpeedY() > 0){
				sphere.reverseSpeedY();
				this.health--;

				points += 100;
			}*/

			if(sphere.getX() + sphere.getRadius() >= this.x &&
			   sphere.getX() - sphere.getRadius() <= this.x + this.width &&
			   sphere.getY() + sphere.getRadius() >= this.y &&
			   sphere.getY() + sphere.getRadius() < this.y + 9 &&
			   sphere.getSpeedY() > 0) {
				sphere.reverseSpeedY();
				playSound("sounds/Bip.mp3");
				this.health--;
				points += 100;
				//Parete sopra
			}
			else if(sphere.getY() + sphere.getRadius() >= this.y && 
					sphere.getY() - sphere.getRadius() <= this.y + this.height &&
					sphere.getX() + sphere.getRadius() >= this.x &&
					sphere.getX() + sphere.getRadius() <= this.x + 9 &&
					sphere.getSpeedX() > 0){
				sphere.reverseSpeedX();
				playSound("sounds/Bip.mp3");
				this.health--;
				points += 100;
				//parete sx
			}
			if((sphere.getX() + sphere.getRadius() >= this.x &&
				sphere.getX() - sphere.getRadius() <= this.x + this.width &&
				sphere.getY() - sphere.getRadius() <= this.y + this.height &&
				sphere.getY() - sphere.getRadius() >= this.y + 15 &&
				sphere.getSpeedY() < 0)){
					sphere.reverseSpeedY();
					playSound("sounds/Bip.mp3");
					this.health--;
					points += 100;
				//parete sotto
			}
			else if(sphere.getY() + sphere.getRadius() >= this.y &&
					sphere.getY() - sphere.getRadius() <= this.y + this.height &&
					sphere.getX() - sphere.getRadius() <= this.x + this.width &&
					sphere.getX() - sphere.getRadius() >= this.x + 45 &&
					sphere.getSpeedX() < 0){
				sphere.reverseSpeedX();
				playSound("sounds/Bip.mp3");
				this.health--;
				points += 100;
				//parete dx
			}
		}
	}

	draw() {
		if (this.health > 0) {
			switch(this.health){
				case 1:
					drawRect(this.x, this.y, this.width, this.height, "red");
					break;
				case 2:
					drawRect(this.x, this.y, this.width, this.height, "orange");
					break;
				case 3:
					drawRect(this.x, this.y, this.width, this.height, "lime");
					break;
				case 4:
					drawRect(this.x, this.y, this.width, this.height, "blue");
					break;
				case 5:
					drawRect(this.x, this.y, this.width, this.height, "purple");
					break;
			}
		}
	}
}