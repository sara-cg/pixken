var board;
var playerOne;
var playerTwo;
var keyRight1Pressed = false;
var keyLeft1Pressed = false;
var keyRight2Pressed = false;
var keyLeft2Pressed = false;
var keyJump1Pressed = new key();
var keyJump2Pressed = new key();
var keyAttack1Pressed = new key();
var keyAttack2Pressed = new key();
var keyRanged1Pressed = new key();
var keyRanged2Pressed = new key();
var keyBlock1Pressed = new key();
var keyBlock2Pressed = new key();
var game;

var gameProperties = {
  height: 0,
  width: 0,
  intervalTime: 33,
  charaHeight: 0,
  charaWidth: 0
};

$('#start').on('click', startGame);
