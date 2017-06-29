/********************************************/
/******* GAME PROPERTIES AND LOGIC **********/
/********************************************/

function board(width, height) {
	this.width = width;
	this.height = height;
}

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
