function initMatrix(rectWidth, rectHeight) {
	var health = 5;

	matrix = new Array(5);
	for (i = 0; i < matrix.length; i++) {
		matrix[i] = new Array(Math.ceil(ctsWidth / rectWidth));
	}

	for (i = 0; i < matrix.length; i++) {
		for (j = 0; j < matrix[i].length; j++) {
			matrix[i][j] = new Brick(rectWidth * j, rectHeight * i + 50, rectWidth, rectHeight, health);
		}
		health--;
		if(health <= 0){
			health = 5;
		}
	}
}

function drawMatrix() {
	var i, j;

	for (i = 0; i < matrix.length; i++) {
		for (j = 0; j < matrix[i].length; j++) {
			matrix[i][j].draw();
		}
	}
}

function updateMatrix(){
	var i, j;

	for (i = 0; i < matrix.length; i++) {
		for (j = 0; j < matrix[i].length; j++) {
			matrix[i][j].update(ball);
		}
	}
}

function checkBricks(){
	var over = true;

	for (i = 0; i < matrix.length; i++) {
		for (j = 0; j < matrix[i].length; j++) {
			if(matrix[i][j].getHealth() > 0){
				over = false;
			}
		}
	}

	return over;
}