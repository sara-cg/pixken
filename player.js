function Player(x, y, gameProperties) {
  this.x = x;
  this.y = y;
  this.previousY = y;
  this.health = 100;
  this.strength = 10;
  this.speed = 300;
  this.jumpSpeed = 0;
  this.initialJumpSpeed = 1100;
  this.gravity = -3000;
  this.gameProperties = gameProperties;
}

Player.prototype.verticalMovement = function() {
  this.y = this.y + this.jumpSpeed * this.gameProperties.intervalTime / 1000;
  this.jumpSpeed = this.jumpSpeed + this.gravity * this.gameProperties.intervalTime / 1000;
  if (this.y <= 0) {
    this.y = 0;
    this.jumpSpeed = 0;
  }
};

Player.prototype.movement = function(direction) {
  var that = this;
  switch (direction) {
    case "right":
      this.x += this.speed * this.gameProperties.intervalTime / 1000;
      break;
    case "left":
      this.x -= this.speed * this.gameProperties.intervalTime / 1000;
      break;
    case "jump":
      if (this.y <= 0) {
        var soundJump = document.getElementById("audioJump");
        soundJump.play();
        this.jumpSpeed = this.initialJumpSpeed;
      }
      break;
  }
  if (this.x < 0) this.x = 0;
};

Player.prototype.receiveDamage = function(damage) {
  damage = this.strength;
  if (this.health > 0) {
    this.health -= damage;
    var soundAttack = document.getElementById("audioAttack");
    soundAttack.play();
    if (this.health === 0) {
      gameOver();
    }
  }
};
