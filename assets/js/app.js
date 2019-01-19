const reset = $('#reset-game');
const start = $('#start-game');
const instructionsModal = $('#game-instructions');
const difficulty = $('.difficulty');
const difficultyChanger = $('#difficulty-changer');
const displayChoice = $('#word-display');
const userInput = $('#user-input');
const userScore = $('#score');
const timer = $('#timer-sec');
const gameoverModal = $('#game-over');
const gameoverScore = $('#game-over-score');
const gameoverDiff = $('#game-over-diff');

var game_difficultly = 0;
var score = 0;

var displayWords = [];


$(document).ready(function(){
    obtainAPI();
    //Change Difficultly
    difficulty.on('click', function(){
        if (difficultyChanger.html() == 'Easy') {
            difficultyChanger.html('Moderate');
            game_difficultly = 1;
        } else if (difficultyChanger.html() == 'Moderate') {
            difficultyChanger.html('Hard');
            game_difficultly = 2;
        } else if (difficultyChanger.html() == 'Hard') {
            difficultyChanger.html('Easy');
            game_difficultly = 0;
        }
    });

    //Start the Game
    start.on('click', function(){
        //Displays Reset button as game has started
        start.css('display', 'none');
        reset.css('display','initial');
        setTimeout(function(){
            game();
            gameTimer();
            gameStatus();
        }, 1000)
        
    });


    //Reset the Game 
    reset.on('click', function(){
        start.css('display', 'initial');
        reset.css('display','none');
        displayChoice.html('When start is clicked, the word will appear here.');
        score = 0;
        userScore.html(score);
        userInput.val("");
    });
    
    
});


//Get words from JSON file
function obtainAPI(){
    $.getJSON("assets/js/json/wordnik-api-key.json", function(data){
        return data.apiKey;

    });
}

//Show word from JSON 
function showWord() {
    obtainAPI();


}

//Game
function game() {
    showWord();
    gameTimer();
    
    userInput.on('input', function () {
        if (wordsMatch()) {
            userScore.html(score);
            userInput.val("");
            showWord();
        } else {

           if (userInput.val().length === displayChoice.html().length) {
            userInput.val("");
            } 
        } 
        
        
    });
    

}

//Check if the words match
function wordsMatch(){
    //Sees if that input is a match
    if (userInput.val() === displayChoice.html()) {
        //green fade out
        score++;
        gameTimer();
        return true;
    } else {
        // wiggle red fade out
        return false;
    }
}

//Timer
function gameTimer() {
    t = 5;

    var interval = setInterval(function(){
        timer.html(t);
        if (t === 0 ) {
            clearInterval(interval);
        } else {
            t--;
        }
    }, 1000);
}

//Status 
function gameStatus() {
    var status = setInterval(function(){
        if (t === 0 && userInput.val() !== displayChoice.html()) {
            clearInterval(status); 
            setTimeout(function(){
                endGame();
            }, 750);
            
        } 
    }, 100);    
}

//Game Ends 
function endGame() {
    //shows game over modal 
    gameoverModal.modal('show');
    gameoverScore.html(score);
    gameoverDiff.html(difficultyChanger.html());

    gameoverModal.on('hidden.bs.modal', function(){
        start.css('display', 'initial');
        reset.css('display','none');
        displayChoice.html('When start is clicked, the word will appear here.');
        score = 0;
        userScore.html(score);
        userInput.val("");
    });
}