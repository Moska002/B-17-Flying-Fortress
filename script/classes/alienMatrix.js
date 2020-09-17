var down = false;
var left = false;

var next = 0;
var movementTimer = new Date().getDate();

function initProjectiles(){
	var i;
	
	projectileMine = new Array(DIM_FIS);
	projectileIncoming = new Array(DIM_FIS);
	
	for(i = 0; i < DIM_FIS; i++){
		projectileMine[i] = null;
		projectileIncoming[i] = null;
	}
}

function initAliens(rectWidth, rectHeight) {
	matrix = new Array(4);

	left = false;
	down = false;
	for (i = 0; i < matrix.length; i++) {
		matrix[i] = new Array(10);
	}

	for (i = 0; i < matrix.length; i++) {
		for (j = 0; j < matrix[i].length; j++) {
			matrix[i][j] = new Alien(rectWidth * j + 15 * j + 101, rectHeight * i + 15 * i + 50, rectWidth, rectHeight);
		}
	}
}

function drawProjectiles(){
	var i;
	
	for(i = 0; i < DIM_FIS; i++){
		if(projectileMine[i] != null){
			projectileMine[i].draw();
		}
		if(projectileIncoming[i] != null){
			projectileIncoming[i].draw();
		}
	}
}

function drawAliens() {
	var i, j;

	for (i = 0; i < matrix.length; i++) {
		for (j = 0; j < matrix[i].length; j++) {
			matrix[i][j].draw();
		}
	}
}

function updateProjectiles(){
	var i;
	
	for(i = 0; i < DIM_FIS; i++){
		if(projectileMine[i] != null){
			projectileMine[i].update();
			if(projectileMine[i].getY() - projectileMine[i].getRadius() < 0) {
				projectileMine[i] = null;
			}
		}
		if(projectileIncoming[i] != null){
			projectileIncoming[i].update();
			if(projectileIncoming[i].getY() + projectileIncoming[i].getRadius() > ctsHeight) {
				projectileIncoming[i] = null;
			}
		}
	}
}

function updateAliens() {
	var i, j;
	var massimo = 0;
	var minimo = ctsWidth;

	if ((new Date().getTime() - movementTimer) > movementWait) {
		movementTimer = new Date().getTime();
		
		if(!down){
			for (i = 0; i < matrix.length; i++) {
				for (j = 0; j < matrix[i].length; j++) {
					if(matrix[i][j].getX() < minimo && matrix[i][j].getHealth() > 0)
						minimo = matrix[i][j].getX();
					if(matrix[i][j].getX() + matrix[i][j].getWidth() > massimo && matrix[i][j].getHealth() > 0)
						massimo = matrix[i][j].getX() + matrix[i][j].getWidth();
				}
			}
			if(massimo >= (ctsWidth - 100) ||
			   minimo <= 100){
					down = true;
			}
		}
		else{
			down = false;
		}

		if(!down){
			for (i = 0; i < matrix.length; i++) {
				for (j = 0; j < matrix[i].length; j++) {
					matrix[i][j].update();
				}
			}
		}
		else{
			for (i = 0; i < matrix.length; i++) {
				for (j = 0; j < matrix[i].length; j++) {
					matrix[i][j].moveDown(downPx);
				}
			}

			if (!left) {
				left = true;
			}
			else {
				left = false;
			}
		}
	}
	
	for (i = 0; i < matrix.length; i++) {
		for (j = 0; j < matrix[i].length; j++) {
			matrix[i][j].hasImpacted();
		}
	}
}

function checkAliens(){
	var i, j;
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

function checkLine(){
	var i, j;
	var downer = 0;

	var over = false;
	
	for (i = 0; i < matrix.length; i++) {
		for (j = 0; j < matrix[i].length; j++) {
			if(matrix[i][j].getHealth() > 0){
				if((matrix[i][j].getY() + matrix[i][j].getHeight()) > downer){
					downer = matrix[i][j].getY() + matrix[i][j].getHeight();
				}
			}
		}
	}

	if(downer > deathline){
		over = true;
	}

	return over;
}