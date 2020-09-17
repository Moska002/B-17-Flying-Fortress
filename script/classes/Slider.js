class Slider{

	constructor(width, height){
		this.width = width;
		this.height = height;
		this.currentX = (ctsWidth - width) / 2;
		this.currentY = ctsHeight - 100;
		this.speed = 10;

		this.moveLeft = false;
		this.moveRight = false;
	}

	reset(){
		this.currentX = (ctsWidth - this.width) / 2;
	}

	update(){
		if(this.moveLeft && this.currentX > 0)
			this.currentX -= this.speed;
		if(this.moveRight && ((this.currentX + this.width) < ctsWidth))
			this.currentX += this.speed;
	}

	setMoveLeft(x){
		this.moveLeft = x;
	}

	setMoveRight(x){
		this.moveRight = x;
	}
	
	getX(){
		return this.currentX;
	}
	
	getY(){
		return this.currentY;
	}
	
	getWidth(){
		return this.width;
	}
	
	getHeight(){
		return this.height;
	}

	draw(){
		drawRect(this.currentX, this.currentY, this.width, this.height, "red");
	}
}
