var colorsArray = ["red", "green", "blue", "yellow"];

var userChoicesArray = [];
var gamePattern = [];

var levelCounter = 0;
var started = false;

$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level  " + levelCounter);

    nextsequence();
    started = true;
  }
});

$(".btn").click(function () {
  var clickedButtonid = $(this).attr("id");
  //add what the user clicked to the array
  userChoicesArray.push(clickedButtonid);

  buttonAnimation(clickedButtonid);

  playSound(clickedButtonid);

  checkAnswer(userChoicesArray.length - 1);
});

function checkAnswer(userChoiceIndex) {
  //check if the colors are same
  if (userChoicesArray[userChoiceIndex] == gamePattern[userChoiceIndex]) {
    // Check if the user has completed the sequence
    if (userChoiceIndex === gamePattern.length - 1) {
      setTimeout(function () {
        nextsequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    restartGame();
  }
}
function nextsequence() {
  userChoicesArray = []; 
  // increasing the level counter
  levelCounter++;
  //change the title
  $("#level-title").text("Level  " + levelCounter);
  //make a variable that collect a random number from 0-3
  var randomNumber = Math.floor(Math.random() * 4);
  //choose a random color then add to an array
  //1.
  var choosenRandomColor = colorsArray[randomNumber];
  //2.
  gamePattern.push(choosenRandomColor);
  //Show annimation on desired pattern
  $("#" + choosenRandomColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  //play sound
  playSound(choosenRandomColor);
}

function buttonAnimation(currentId) {
  //find chosen button
  $("#" + currentId).addClass("pressed");
  //fade out the animation
  setTimeout(() => {
    $("#" + currentId).removeClass("pressed");
  }, 100);
}

function playSound(currentId) {
  var audio = new Audio("sounds/" + currentId + ".mp3");
  audio.play();
}

function restartGame() {
  levelCounter = 0;
  gamePattern = [];
  started = false;
}
