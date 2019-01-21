const reset = $('#reset-game');
const start = $('#start-game');
const instructionsModal = $('#game-instructions');
const difficulty = $('.difficulty');
const difficultyChanger = $('#difficulty-changer');
const displayChoice = $('#word-display');
const userInput = $('#user-input');
const userScore = $('#score');
const displayScore = $('.user-score');
const timer = $('#timer-sec');
const gameoverModal = $('#game-over');
const gameoverScore = $('#game-over-score');
const gameoverDiff = $('#game-over-diff');

var game_difficultly = 9;
var score = 0;

var displayWords = [];

$(document).ready(function(){
    
    obtainWords();

    //Change Difficultly
    difficulty.on('click', function(){
        if (difficultyChanger.html() == 'Easy') {
            difficultyChanger.html('Moderate');
            game_difficultly = 5;
        } else if (difficultyChanger.html() == 'Moderate') {
            difficultyChanger.html('Hard');
            game_difficultly = 3;
        } else if (difficultyChanger.html() == 'Hard') {
            difficultyChanger.html('Easy');
            game_difficultly = 9;
        }
    });

    //Start the Game
    start.on('click', function(){
        //Displays Reset button as game has started
        start.css('display', 'none');
        displayScore.css('display','initial');
        setTimeout(function(){
            game();
            gameTimer();
            gameStatus();
        }, 1000)
        
    });


    //Reset the Game 
    reset.on('click', function(){
        start.css('display', 'initial');
        displayScore.css('display','none');
        displayChoice.html('When start is clicked, the word will appear here.');
        score = 0;
        userScore.html(score);
        userInput.val("");
    });
    
    
});


// ** NOT WORKING ** Get API Key from JSON file
function obtainAPIKey(){
    

    apiLink = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=false&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=" + apiKey;

    return apiLink; 
}

function obtainWords() {

    //apiLink = obtainAPIKey();
    //console.log(apiLink);
    apiLink = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=false&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=8a8ea569a8c2098c500040f66e2044252dfdbb24b1b12e11c";

    $.getJSON(apiLink, function(data){ 
	    displayWords.push(data);
    })

    console.log(displayWords);
}

//Show word from Wordnik API 
function showWord() {
    
    //random number generator
    i = Math.floor(Math.random()*10);

    //word to display
    arrayChoice = displayWords[0][3].word;

    //display word
    displayChoice.html(arrayChoice);
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
    t = game_difficultly;

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