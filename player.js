function Player (x, y, gameProperties){
  this.x = x;
  this.y = y;
  this.speed = 300;
	this.gameProperties = gameProperties;
}

Player.prototype.movement = function(direction){

	switch (direction){
		case "right":
			this.x += this.speed*this.gameProperties.intervalTime/1000;
			break;
		case "left":
			this.x -= this.speed*this.gameProperties.intervalTime/1000;
			break;
	}
	 if (this.x < 0) this.x = 0;
	// if (this.x > PlayerTwo.x) this.x = PlayerTwo.x;
};
