const reset = $('#reset-game');
const start = $('#start-game');
const instructions = $('#game-instructions');
const difficulty = $('.difficulty');
const difficultyChanger = $('#difficulty-changer');
const displayChoice = $('#word-display');
const userInput = $('#user-input');
const userScore = $('#score');
const timer = $('#timer-sec');


var game_difficultly = 0;
var score = 0;

var displayWords = [];


$(document).ready(function(){
    obtainWords();
    gameTimer();
    // On load open instructions modal
    //instructions.modal('show');
    
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

        game();

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

//Game

function obtainWords(){


    $.getJSON("assets/js/json/words.json", function(data){
        
        $.each(data, function(diff, val){
            displayWords.push(val);
            
        });

        console.log(displayWords);
    });
}

function showWord() {
    //Random Number
    i = Math.floor(Math.random() * 2);

    //Displays random word from array
    displayChoice.html(displayWords[game_difficultly]["words"][i]);

}

function game() {
    showWord();
    userInput.on('input', function () {
        if (wordsMatch()) {
            userScore.html(score);
            userInput.val("");
            showWord();
        } else {
            reset.css('background-color', 'red')
        }
    });
    

}

function wordsMatch(){
    //Sees if that input is a match
    if (userInput.val() === displayChoice.html()) {
        //green fade out
        score++;
        return true
    } else {
        // wiggle red fade out
        return false;
    };
}
//Timer

function gameTimer() {
    t = 5;

    setInterval(function(){
        t--;
        timer.html(t);
    }, 1000)
}

//Status 

