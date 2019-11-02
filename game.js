var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function(){
  if (!started){
      $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];

  userClickedPattern = [];
  gamePattern.push(randomChosenColor);
  buttonActive = $("#"+randomChosenColor).fadeIn("fast").fadeOut("fast").fadeIn("fast") ;

  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").on("click", function(event){
  var userChosenColor = event.currentTarget.id; //jQuery: $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

//Sound and animation function
function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor){
  var pressedButton = $("." + currentColor);
  pressedButton.addClass("pressed");
  setTimeout(function(){
    pressedButton.removeClass("pressed");
  }, 100);
}
