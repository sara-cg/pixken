/********************************************/
/*******    GENERAL GAME EVENTS    **********/
/********************************************/


function startGame() {
  board();
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
