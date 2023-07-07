var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColor);
    level++;
    $("h1").text("level " + level);
    console.log(gamePattern);
};

$(".btn").click(function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    makeSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function makeSound(color) {
    switch(color) {
        case("red"):
        var redSound = new Audio('./sounds/red.mp3');
        redSound.play();
        break;

        case("blue"):
        var blueSound = new Audio('./sounds/blue.mp3');
        blueSound.play();
        break;

        case("green"):
        var greenSound = new Audio('./sounds/green.mp3');
        greenSound.play();
        break;

        case("yellow"):
        var yellowSound = new Audio('./sounds/yellow.mp3');
        yellowSound.play();
        break;

        default:console.log(color);
        var wrong = new Audio('./sounds/wrong.mp3');
        wrong.play();
    }
};

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(() => {
        $("." + currentColor).removeClass("pressed");
    }, 100);
};

$(document).one("keydown", function (){
    nextSequence();
    $("h1").text("level " + level);
});

function checkAnswer(currentLevel) {
for( var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] != gamePattern[i]) {
        makeSound();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        $(document).one("keydown", function (){
            nextSequence();
            $("h1").text("level " + level);
        });
        wrong();
        return "you lose"; 
    } else if (userClickedPattern.length === gamePattern.length && userClickedPattern[i] === gamePattern[i] && gamePattern[gamePattern.length-1] === userClickedPattern[currentLevel]) {
        console.log("success");
            userClickedPattern = [];
            setTimeout(() => {
                nextSequence();
            }, 1000);
            return "keep going!";
    }
    }
    
};

function wrong() {
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
}
  
