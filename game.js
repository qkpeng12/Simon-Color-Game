var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {	    // <== jQuery capture keyboard action/jQuery keyboard anykey/jQuery Anykey on Keyboard
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id"); // <== jQuery using this keywoard/jQuery this/jQuery "this" usage/jQuery use "this"
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // must use [] to compare

    console.log("Sucess");
    if (gamePattern.length === userClickedPattern.length) { 	//<== Major error: "lenth" should be "length"; Watch spelling error, cost me hours to find out
      console.log("gamePattern " + gamePattern);
      console.log("userPattern " + userClickedPattern);
      setTimeout(function() {
        nextSequence(); // <== Game player answer color sequence correctly. Promote to next level
      }, 1000);
    }
  } else {
    console.log("Wrong");
    playSound("wrong");
    buttonAnimation();
    console.log("gamePattern " + gamePattern);
    console.log("userPattern " + userClickedPattern);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function buttonAnimation(){
  $("body").addClass("game-over");
  setTimeout(function(){
  	 $("body").removeClass("game-over");
  }, 200);
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
}
