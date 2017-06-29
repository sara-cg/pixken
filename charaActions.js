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
    renderDamageReceived();
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
