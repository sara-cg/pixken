function Player(x, y, gameProperties) {
  this.x = x;
  this.y = y;
  this.health = 100;
  this.strength = 10;
  this.speed = 300;
  this.gameProperties = gameProperties;
}

Player.prototype.movement = function(direction) {

  switch (direction) {
    case "right":
      this.x += this.speed * this.gameProperties.intervalTime / 1000;
      break;
    case "left":
      this.x -= this.speed * this.gameProperties.intervalTime / 1000;
      break;
  }
  if (this.x < 0) this.x = 0;
};

Player.prototype.receiveDamage = function(damage) {
  damage = this.strength;
  if (this.health > 0) {
    this.health -= damage;
    if (this.health === 0) {
      gameOver();
    }
  }
};
