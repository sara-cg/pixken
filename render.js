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
  if (playerOne.health > 30) {
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

  if (playerTwo.health > 30) {
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

function renderDamageReceived() {
  $(".dmg2").css({
    "display": "initial",
    "opacity": 1
  });
  $(".dmg2").animate({
    opacity: 0.25,
    top: "+=50",
    height: "toggle"
  }, 2000, function() {
    // Animation complete.
  });
  // // setTimeout(function() {
  // //   $(".dmg2").css({
  // //     "display": "none"
  // //   });
  // // }, 1000);
}

function renderChara() {
  $("#chara1").css("left", playerOne.x);
  $("#chara2").css("right", playerTwo.x);
  $("#chara1").css("transform", "translateY(-" + playerOne.y + "px)");
  $("#chara2").css("transform", "translateY(-" + playerTwo.y + "px)");
}
