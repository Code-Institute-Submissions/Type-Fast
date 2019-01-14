const start = $('#start-game');
const difficulty = $('.difficulty');
const difficultyChanger = $('#difficulty-changer');
const displayChoice = $('#word-display');
const userInput = $('#user-input');
const userScoreMain = $('.user-score');
const userScore = $('#score');
const timer = $('#timer-sec');
const gameoverModal = $('#game-over');
const gameoverScore = $('#game-over-score');
const gameoverDiff = $('#game-over-diff');
const inputUserScore = $('.input-user');
const addUser = $('#add-user');
const username = $('#username');

var game_difficultly = 9;
var score = 102;

var displayWords = [];

var leaderboard; 

$(document).ready(function(){
    obtainWords();
    endGame();
    //Change Difficultly
    difficulty.on('click', function(){
        if (difficultyChanger.html() == 'Easy') {
            difficultyChanger.html('Moderate');
            game_difficultly = 6;
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
        start.css('display', 'none');
        userScoreMain.css('display','initial');
        setTimeout(function(){
            game();
            gameTimer();
            gameStatus();
        }, 1000);
        
    });    
});


//Get words from JSON file
function obtainWords(){
    $.getJSON("assets/js/json/words.json", function(data){
        
        $.each(data, function(diff, val){
            displayWords.push(val);
            
        });
    });
}

//Show word from JSON 
function showWord() {
    //Random Number
    i = Math.floor(Math.random() * 14);

    //Displays random word from array
    displayChoice.html(displayWords[0]["words"][i]);

}

//Game
function game() {
    showWord();
    gameTimer();
    
    userInput.on('input', function () {
        if (wordsMatch(userInput.val(), displayChoice.html())) {
            score++;
            gameTimer();
            userScore.html(score);
            userInput.val("");
            showWord();
            //green fade out
        } else {
            // wiggle red fade out
           if (userInput.val().length === displayChoice.html().length) {
            userInput.val("");
            } 
        } 
        
        
    });
}

//Check if the words match
function wordsMatch(userInput, display){
    //Sees if that input is a match
    if (userInput === display) {
        return true;
    } else {
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
    //Show Leaderboard
    leaderboard();
    
    //shows game over modal 
    gameoverModal.modal('show');
    gameoverScore.html(score);
    gameoverDiff.html(difficultyChanger.html());


    gameoverModal.on('hidden.bs.modal', function(){
        start.css('display', 'initial');
        userScoreMain.css('display','none');
        displayChoice.html('When start is clicked, the word will appear here.');
        score = 0;
        userScore.html(score);
        userInput.val("");
    });
}

function leaderboard() {

    getDiffBoard = difficultyChanger.html();

    if (leaderboard.getDiffBoard === null) {

        inputUserScore.css('display', 'initial');

        addUser.on('click', function(){
            var tableRowEmpty = `<tr>
            <td>1</td>
            <td>${username.val()}</td>
            <td>${score}</td>
            </tr>`;
            $('.leaderboard > table').append(tableRowEmpty);
            saveUser(username.val());
        });

        
    } else {

        leaderboard = JSON.parse(localStorage.getItem(getDiffBoard));

        if (leaderboard[0].score < userScore) {
            var tableRow = `<tr>
            <td>1</td>
            <td>${leaderboard[0].name}</td>
            <td>${score}</td>
            </tr>`;
            $('.leaderboard > table').append(tableRow);
        };
    }
}

function saveUser(user) {
    var newHighscore = [
        {name: user, score: score}
    ];

    localStorage.setItem(getDiffBoard, JSON.stringify(newHighscore));
}