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
