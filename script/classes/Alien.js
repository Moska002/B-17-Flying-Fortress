class Alien {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;

        this.speed = 10;

        this.health = 1;
        this.shootTimer = new Date().getTime();
        this.wait = Math.floor(Math.random() * (25000 - 1000)) + 1000;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getHealth(){
        return this.health;
    }

    moveDown(x) {
        this.y += x;
    }

    update() {
        if (left) {
            this.x -= this.speed;
        }
        else {
            this.x += this.speed;
        }

        if(this.health > 0){
            if((new Date().getTime() - this.shootTimer) > this.wait){
                this.shootTimer = new Date().getTime();
                this.wait = Math.floor(Math.random() * (25000 - 1000)) + 1000;
                projectileIncoming[indexIncoming % DIM_FIS] = new Projectile(this.x + this.width / 2, this.y, 2.5, false);
				//playSound("sounds/TieBlaster.mp3");
                indexIncoming++;
            }
        }
    }
	
	hasImpacted(){
        var i;

		if(this.health > 0){
			for(i = 0; i < DIM_FIS; i++){
                if(projectileMine[i] != null){
                    if(this.x <= (projectileMine[i].getX() + projectileMine[i].getRadius()) &&
                      (this.x + this.width) >= (projectileMine[i].getX() - projectileMine[i].getRadius()) &&
                       this.y <= (projectileMine[i].getY() - projectileMine[i].getRadius()) &&
                       (this.y + this.height) >= projectileMine[i].getY() + projectileMine[i].getRadius())
                    {
                        projectileMine[i] = null;
                        this.health--;
						
						playSound("sounds/Explosion.mp3");
                        score += 100;
                    }
                }
            }
		}
	}

    draw() {
        if (this.health > 0)
            drawImage(this.x, this.y, this.width, this.height, "images/tie.png");
    }
}