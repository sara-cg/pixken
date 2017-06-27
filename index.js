var board = new Board();
var playerOne;
var playerTwo;
var keyRight1Pressed = false;
var keyLeft1Pressed = false;
var keyRight2Pressed = false;
var keyLeft2Pressed = false;
var keyJump1Pressed = false;
var keyJump2Pressed = false;
var keyAttack1Pressed = false;
var keyAttack2Pressed = false;
var keyBlock1Pressed = false;
var keyBlock2Pressed = false;
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
  clearInterval(game);
  var soundStart = document.getElementById("audioStart");
  soundStart.play();
  getGameProperties();
  playerOne = new Player(0, 0, gameProperties);
  playerTwo = new Player(0, 0, gameProperties);
  $("#hp1color").html(playerOne.health + " HP");
  $("#hp1color").width(playerOne.health * 3);
  $("#hp2color").html(playerTwo.health + " HP");
  $("#hp2color").width(playerTwo.health * 3);
  $("#hp1color").css({
    "background-color": "green"
  });
  $(".p1").css({
    "color": "black"
  });
  $("#hp2color").css({
    "background-color": "green"
  });
  $(".p2").css({
    "color": "black"
  });
  game = setInterval(updateState, gameProperties.intervalTime);
  renderGame();
}

function gameOver() {
  clearInterval(game);
}

function collision($div1, $div2) {
  var x1 = $div1.offset().left;
  var y1 = $div1.offset().top;
  var h1 = $div1.outerHeight(true);
  var w1 = $div1.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $div2.offset().left;
  var y2 = $div2.offset().top;
  var h2 = $div2.outerHeight(true);
  var w2 = $div2.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}

function updateState() {
  playerOne.verticalMovement();
  playerTwo.verticalMovement();

  if (keyRight1Pressed) {
    if (!collision($("#chara1"), $("#chara2")))
      playerOne.movement('right');
  }
  if (keyLeft1Pressed) {
    playerOne.movement('left');
  }
  if (keyRight2Pressed) {
    playerTwo.movement('left');
  }
  if (keyLeft2Pressed) {
    if (!collision($("#chara1"), $("#chara2")))
      playerTwo.movement('right');
  }
  if (keyJump1Pressed && (playerOne.y === 0)) {
    playerOne.movement('jump');
  }
  if (keyJump2Pressed && (playerTwo.y === 0)) {
    playerTwo.movement('jump');
  }
  if (keyAttack1Pressed && (collision($("#chara1"), $("#chara2"))) && !keyBlock2Pressed && (playerTwo.y === 0)) {
    playerTwo.receiveDamage();
    var randomBackwardOne = Math.floor(Math.random() * 3) + 1;
    if (randomBackwardOne == 1) {
      playerOne.movement('left');
    } else if (randomBackwardOne == 2) {
      playerOne.movement('left');
      playerOne.movement('left');
      playerOne.movement('left');
    } else {
      playerOne.movement('left');
      playerOne.movement('left');
      playerOne.movement('left');
      playerOne.movement('left');
      playerOne.movement('left');
    }


    if (playerTwo.health > 20) {
      $("#hp2color").html(playerTwo.health + " HP");
    } else {
      $("#hp2color").html(playerTwo.health);
    }
    $("#hp2color").width(playerTwo.health * 3);
    console.log("Player 2 received 10 pts of damage. Remaining health is " + playerTwo.health + ".");

    if (playerTwo.health <= 25) {
      $("#hp2color").css({
        "background-color": "red"
      });
      $(".p2").css({
        "color": "red"
      });
    } else if (playerTwo.health <= 50) {
      $("#hp2color").css({
        "background-color": "orange"
      });
    }

  }
  if (keyAttack2Pressed && (collision($("#chara1"), $("#chara2"))) && !keyBlock1Pressed && (playerOne.y === 0)) {
    playerOne.receiveDamage();
    var randomBackwardTwo = Math.floor(Math.random() * 3) + 1;
    if (randomBackwardTwo == 1) {
      playerTwo.movement('left');
    } else if (randomBackwardTwo == 2) {
      playerTwo.movement('left');
      playerTwo.movement('left');
      playerTwo.movement('left');
    } else {
      playerTwo.movement('left');
      playerTwo.movement('left');
      playerTwo.movement('left');
      playerTwo.movement('left');
      playerTwo.movement('left');
    }
    if (playerOne.health > 20) {
      $("#hp1color").html(playerOne.health + " HP");
    } else {
      $("#hp1color").html(playerOne.health);
    }
    $("#hp1color").width(playerOne.health * 3);
    console.log("Player 1 received 10 pts of damage. Remaining health is " + playerOne.health + ".");

    if (playerOne.health <= 25) {
      $("#hp1color").css({
        "background-color": "red"
      });
      $(".p1").css({
        "color": "red"
      });
    } else if (playerOne.health <= 50) {
      $("#hp1color").css({
        "background-color": "orange"
      });
    }
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
    case "w":
      keyJump1Pressed = true;
      break;
    case "ArrowUp":
      keyJump2Pressed = true;
      break;
    case "x":
      keyAttack1Pressed = true;
      break;
    case ".":
      keyAttack2Pressed = true;
      break;
    case "c":
      keyBlock1Pressed = true;
      break;
    case "-":
      keyBlock2Pressed = true;
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
    case "w":
      keyJump1Pressed = false;
      break;
    case "ArrowUp":
      keyJump2Pressed = false;
      break;
    case "x":
      keyAttack1Pressed = false;
      break;
    case ".":
      keyAttack2Pressed = false;
      break;
    case "c":
      keyBlock1Pressed = false;
      break;
    case "-":
      keyBlock2Pressed = false;
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
  $("#chara1").css("transform", "translateY(-" + playerOne.y + "px)");
  $("#chara2").css("transform", "translateY(-" + playerTwo.y + "px)");
}
