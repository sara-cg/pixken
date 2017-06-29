var board = new Board();
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

/********************************************/
/*******    GENERAL GAME EVENTS    **********/
/********************************************/


function startGame() {

  manageCoverScreens();
  playStartSound();
  getGameProperties();
  playerOne = new Player(0, 0, gameProperties);
  playerTwo = new Player(0, 0, gameProperties);
  resetPlayerHealthRender();
  setUpdateTimer();
  startAmbientAudio();

}

function gameOver() {
  var soundGameOver = document.getElementById("audioGameOver");
  soundGameOver.play();
  clearInterval(game);
  $(".game-over").css({
    "display": "initial"
  });
}

function updateState() {
  playerOne.verticalMovement();
  playerTwo.verticalMovement();
  movements();
  meleeAtacks();
  rangedAtacks();
  renderLifeBars();
  renderChara();
}


/********************************************/
/*************    KEY EVENTS    *************/
/********************************************/


$(document).on('keydown', function(e) {
  var soundBlock = document.getElementById("audioBlock");
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
      keyJump1Pressed.updateState(true);
      break;
    case "ArrowUp":
      keyJump2Pressed.updateState(true);
      break;
    case "x":
      keyAttack1Pressed.updateState(true);
      break;
    case ".":
      keyAttack2Pressed.updateState(true);
      break;
    case "z":
      keyRanged1Pressed.updateState(true);
      break;
    case ",":
      keyRanged2Pressed.updateState(true);
      break;
    case "c":
      keyBlock1Pressed.updateState(true);
      soundBlock.play();
      break;
    case "-":
      keyBlock2Pressed.updateState(true);
      soundBlock.play();
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
      keyJump1Pressed.updateState(false);
      break;
    case "ArrowUp":
      keyJump2Pressed.updateState(false);
      break;
    case "x":
      keyAttack1Pressed.updateState(false);
      break;
    case ".":
      keyAttack2Pressed.updateState(false);
      break;
    case "z":
      keyRanged1Pressed.updateState(false);
      break;
    case ",":
      keyRanged2Pressed.updateState(false);
      break;
    case "c":
      keyBlock1Pressed.updateState(false);
      break;
    case "-":
      keyBlock2Pressed.updateState(false);
  }
});


/********************************************/
/******* GAME PROPERTIES AND LOGIC **********/
/********************************************/

function getGameProperties() {
  gameProperties.height = parseInt($("#board").css("height"));
  gameProperties.width = parseInt($("#board").css("width"));
  gameProperties.charaHeight = parseInt($(".chara").css("height") + $(".chara").css("margin-down"));
  gameProperties.charaWidth = parseInt($(".chara").css("width") + $(".chara").css("margin-left") + $(".chara").css("margin-right"));
}

function setUpdateTimer() {
  clearInterval(game);
  game = setInterval(updateState, gameProperties.intervalTime);
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

function key() {
  this.state = false;
  this.justPressed = false;
  this.updateState = function(state) {
    if (!this.state && state) {
      this.justPressed = true;
    }
    this.state = state;
  };
  this.wasJustPressed = function() {
    if (this.justPressed) {
      this.justPressed = false;
      return true;
    } else return false;
  };
}

/********************************************/
/************* CHARA ACTIONS*****************/
/********************************************/



function movements() {
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
  if (keyJump1Pressed.wasJustPressed() && (playerOne.y === 0)) {
    playerOne.movement('jump');
  }
  if (keyJump2Pressed.wasJustPressed() && (playerTwo.y === 0)) {
    playerTwo.movement('jump');
  }
}

function meleeAtacks() {
  if (keyAttack1Pressed.wasJustPressed() && (collision($("#chara1"), $("#chara2"))) && !keyBlock2Pressed.wasJustPressed() && (playerTwo.y === 0)) {
    $("#chara2").css({
      "background-image": "url('images/chara2red.gif')"
    });
    setInterval(function() {
      $("#chara2").css({
        "background-image": "url('images/chara2.gif')"
      });
    }, 1000);
    playerTwo.receiveDamageMelee();
    // $(".dmg2").css({
    //   "display": "initial",
    //   "opacity": 1
    // });
    // $(".dmg2").animate({
    //   opacity: 0.25,
    //   top: "+=50",
    //   height: "toggle"
    // }, 2000, function() {
    //   // Animation complete.
    // });
    // // setTimeout(function() {
    // //   $(".dmg2").css({
    // //     "display": "none"
    // //   });
    // // }, 1000);
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
  }

  if (keyAttack2Pressed.wasJustPressed() && (collision($("#chara1"), $("#chara2"))) && !keyBlock1Pressed.wasJustPressed() && (playerOne.y === 0)) {
    $("#chara1").css({
      "background-image": "url('images/chara1red.gif')"
    });
    setInterval(function() {
      $("#chara1").css({
        "background-image": "url('images/chara1.gif')"
      });
    }, 1000);
    playerOne.receiveDamageMelee();
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
  }
}

function rangedAtacks() {
  if (keyRanged1Pressed.wasJustPressed() && !keyBlock2Pressed.wasJustPressed() && (playerTwo.y === 0)) {
    $("#chara2").css({
      "background-image": "url('images/chara2red.gif')"
    });
    setInterval(function() {
      $("#chara2").css({
        "background-image": "url('images/chara2.gif')"
      });
    }, 1000);
    playerTwo.receiveDamageRanged();
  }

  if (keyRanged2Pressed.wasJustPressed() && !keyBlock1Pressed.wasJustPressed() && (playerOne.y === 0)) {
    $("#chara1").css({
      "background-image": "url('images/chara1red.gif')"
    });
    setInterval(function() {
      $("#chara1").css({
        "background-image": "url('images/chara1.gif')"
      });
    }, 1000);
    playerOne.receiveDamageRanged();
  }
}

/********************************************/
/************* RENDER ***********************/
/********************************************/


function manageCoverScreens() {
  $(".intro").css({
    "display": "none"
  });
  $(".game-over").css({
    "display": "none"
  });
}

function resetPlayerHealthRender() {
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
}

function renderLifeBars() {
  if (playerOne.health > 20) {
    $("#hp1color").html(playerOne.health + " HP");
  } else {
    $("#hp1color").html(playerOne.health);
  }
  $("#hp1color").width(playerOne.health * 3);

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

  if (playerTwo.health > 20) {
    $("#hp2color").html(playerTwo.health + " HP");
  } else {
    $("#hp2color").html(playerTwo.health);
  }
  $("#hp2color").width(playerTwo.health * 3);

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

function renderChara() {
  $("#chara1").css("left", playerOne.x);
  $("#chara2").css("right", playerTwo.x);
  $("#chara1").css("transform", "translateY(-" + playerOne.y + "px)");
  $("#chara2").css("transform", "translateY(-" + playerTwo.y + "px)");
}


/********************************************/
/************* SOUNDS ***********************/
/********************************************/

function playStartSound() {
  var soundStart = document.getElementById("audioStart");
  soundStart.play();
}

function startAmbientAudio() {
  var soundAmbient = document.getElementById("audioAmbient");
  soundAmbient.play();
}
