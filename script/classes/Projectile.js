class Projectile {

	constructor(x, y, speed, up) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.up = up;

		this.radius = 2.5;
	}

	draw() {
		drawCircle(this.x, this.y, this.radius, "green");
	}

	update() {
		if (this.up) {
			this.y -= this.speed;
		}
		else {
			this.y += this.speed;
		}
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	getRadius() {
		return this.radius;
	}

}