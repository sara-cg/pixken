var board = new Board();
var playerOne;
var playerTwo;
var keyRight1Pressed = false;
var keyLeft1Pressed = false;
var keyRight2Pressed = false;
var keyLeft2Pressed = false;
var game;

var gameProperties = {
  height: 0,
  width: 0,
  intervalTime: 33,
  charaHeight: 0,
  charaWidth: 0
};

$('#start').on('click', startGame);

function startGame() {
  getGameProperties();
  playerOne = new Player(0, 0, gameProperties);
  playerTwo = new Player(0, 0, gameProperties);
  board.start();
  if (game != 1) game = setInterval(updateState, gameProperties.intervalTime);
  renderGame();
}

function updateState() {
  if (keyRight1Pressed) {
    playerOne.movement('right');
  }
  if (keyLeft1Pressed) {
    playerOne.movement('left');
  }
  if (keyRight2Pressed) {
    playerTwo.movement('left');
  }
  if (keyLeft2Pressed) {
    playerTwo.movement('right');
  }
  renderChara();
}

$(document).on('keydown', function(e) {
  switch (e.key) {
    case "d":
      keyRight1Pressed = true;
      break;
    case "a":
      keyLeft1Pressed = true;
      break;
    case "ArrowRight":
      keyRight2Pressed = true;
      break;
    case "ArrowLeft":
      keyLeft2Pressed = true;
      break;
  }
});

$(document).on('keyup', function(e) {
  switch (e.key) {
    case "d":
      keyRight1Pressed = false;
      break;
    case "a":
      keyLeft1Pressed = false;
      break;
    case "ArrowRight":
      keyRight2Pressed = false;
      break;
    case "ArrowLeft":
      keyLeft2Pressed = false;
      break;
  }
});

function getGameProperties() {
  gameProperties.height = parseInt($("#board").css("height"));
  gameProperties.width = parseInt($("#board").css("width"));
  gameProperties.charaHeight = parseInt($(".chara").css("height") + $(".chara").css("margin-down"));
  gameProperties.charaWidth = parseInt($(".chara").css("width") + $(".chara").css("margin-left") + $(".chara").css("margin-right"));
}

function renderGame() {}

function renderChara() {
  $("#chara1").css("left", playerOne.x);
  $("#chara2").css("right", playerTwo.x);
}
