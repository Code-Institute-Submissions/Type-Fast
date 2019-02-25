const start = $('#start-game');
const difficulty = $('.difficulty');
const difficultyChanger = $('#difficulty-changer');
const displayChoice = $('#word-display');
const userInput = $('#user-input');
const userScoreMain = $('.user-score');
const userScore = $('#score');
const timerHTML = $('#timer-sec');
const gameoverModal = $('#game-over');
const gameoverScore = $('#game-over-score');
const gameoverDiff = $('#game-over-diff');
const inputUserScore = $('.input-user');
const addUser = $('#add-user');
const username = $('#username');

var game_difficulty = 10;
var score = 0;
var displayWords = [];
var leaderboard; 
var statusTime;

var timer = new easytimer.Timer();

$(document).ready(function(){
    
    //Get words from Wordnik API
    obtainWords();
    
    //Change Difficultly
    difficulty.on('click', function(){
        if (difficultyChanger.html() == 'Easy') {
            difficultyChanger.html('Moderate');
            game_difficulty = 7;
        } else if (difficultyChanger.html() == 'Moderate') {
            difficultyChanger.html('Hard');
            game_difficulty = 4;
        } else if (difficultyChanger.html() == 'Hard') {
            difficultyChanger.html('Easy');
            game_difficulty = 10;
        }
    });

    //Start the Game
    start.on('click', function(){
        start.css('display', 'none');
        userScoreMain.css('display','initial');
        setTimeout(function(){
            game();
            gameTimer();
            setTimeout(function(){
                gameStatus();
            }, 1000);
            
        }, 1000);
        
    });
});

//Get Words from API
function obtainWords() {

    const apiLink = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=false&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=25&api_key=8a8ea569a8c2098c500040f66e2044252dfdbb24b1b12e11c";

    //Filters out any word with accents from Wordnik API and puts them into an array
    $.getJSON(apiLink, function(data){ 
        
        var regExp = new RegExp("^[a-z]*$");

        for (i = 0, len = 25; i < len; i++){
            
            var word = data[i].word;

            if (regExp.test(word)){
                displayWords.push(data[i].word);
            }
            
        }
    });
}

//Show word from Wordnik API 
function showWord() {

    //random number generator
    var i = Math.floor(Math.random()*(displayWords.length));
    

    //word to display
    var arrayChoice = displayWords[i];
    

    //display word
    displayChoice.html(arrayChoice);
        
}

//Game
function game() {
    userInput.focus();
    showWord();
    gameTimer();

    //If the amount of words in displayWords is less than 15, get some more.
    if (displayWords.length <= 15){
        obtainWords();
    }
    
    //On typing into input box, check input against displayed word
    userInput.on('input', function () {
        if (wordsMatch(userInput.val(), displayChoice.html())) {
            score++;

            //If user is close to amount of words in array, get some more for variety
            if (score % 25 === 0) {
                obtainWords();
            }
            gameTimer(true);
            userScore.html(score);
            userInput.val("");
            showWord();
            displayChoice.animate({color: 'rgb(0, 204, 0)'}).animate({color: '#fff'}, 300);
        } else {
            if(userInput.val().length === displayChoice.html().length){
                displayChoice.animate({color: 'rgb(235, 25, 25)'}).effect("shake").animate({color: '#fff'}, 500);
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

//Easytimer.js by Albert Gonzalez - https://albert-gonzalez.github.io/easytimer.js/ - Use of slice() to on get last character (seconds)
function gameTimer(reset) {
    timeDisplay = timer.getTimeValues().toString();
    timerHTML.html(timeDisplay.slice(-1));
    if (reset) {
        timer.reset();
    } else {
        timer.start({countdown: true, startValues: {seconds: game_difficulty}});
        timer.addEventListener('secondsUpdated', function (e) {
            var timeDisplay = timer.getTimeValues().toString();
            timerHTML.html(timeDisplay.slice(-1));
            statusTime = (timeDisplay.slice(-1));
        });
    }
}

//Check Game Status 
function gameStatus() {
    var status = setInterval(function(){
        if (statusTime === '0' && userInput.val() !== displayChoice.html()) {
            clearInterval(status);
            setTimeout(function () {
                endGame();
            }, 100);
        }
    }, 100);    
}

//Game Ends 
function endGame() {

    //shows game over modal 
    gameoverModal.modal('show');

    //Stop timer
    timer.stop();

    //Shows Leaderboard
    leaderboard();

    //Populates Modal
    gameoverScore.html(score);
    gameoverDiff.html(difficultyChanger.html());

    //When Modal is closed, reset the game
    gameoverModal.on('hidden.bs.modal', function(){
        start.css('display', 'initial');
        userScoreMain.css('display','none');
        displayChoice.html('When start is clicked, the word will appear here.');
        score = 0;
        userScore.html(score);
        userInput.val("");
        timerHTML.html("0");
    });
}

//Leaderboard
function leaderboard() {

    //Get game difficulty 
    var getDiffBoard = difficultyChanger.html();

    //Get localStorage data
    var leaderboard = JSON.parse(localStorage.getItem(getDiffBoard));
    
    if(localStorage.getItem(getDiffBoard) === null) {

        //No Leaderboard in storage            
        inputUserScore.css('display', 'initial');
            
        addUser.on('click', function(){
            var tableRowEmpty = `<td>1</td>
            <td>${username.val()}</td>
            <td>${score}</td>`;
            $('.table-content').empty();
            $('.table-content').append(tableRowEmpty);
            saveUser(username.val(), false, getDiffBoard);
            inputUserScore.css('display', 'none');
        });
        
    } else {
        //Leaderboard in storage
        if (leaderboard[0].LScore < score) {

            //Is leaderboard, overwrite and save

            var newHighscore = `<h4><span class="popper-emoji">&#x1F389</span> New highscore! <span class="popper-emoji">&#x1F389</span></h4>`;
            $('#score-alert').empty();
            $('#score-alert').append(newHighscore);

            inputUserScore.css('display', 'initial');

            var tableRow = `<td>1</td>
            <td>${leaderboard[0].name}</td>
            <td>${leaderboard[0].LScore}</td>`;
            $('.table-content').empty();
            $('.table-content').append(tableRow);

            addUser.on('click', function(){
                var newTableScore = `<td>1</td>
                <td>${username.val()}</td>
                <td>${score}</td>`;
                $('.table-content').empty();
                $('.table-content').append(newTableScore);
                saveUser(username.val(), true, getDiffBoard);
                inputUserScore.css('display', 'none');
            });

        } else {
            
            //Is leaderboard but user didnt score enough
            var userScoreIsLess = `<h4>Oh no! <span>&#x2639</span> You didn't quite score enough to reach the leaderboard.</h4>`;
            $('#score-alert').empty();
            $('#score-alert').append(userScoreIsLess);
            var tableRow = `<td>1</td>
            <td>${leaderboard[0].name}</td>
            <td>${leaderboard[0].LScore}</td>`;
            $('.table-content').empty();
            $('.table-content').append(tableRow);
        }

    }    
}

//Save user to LocalStorage
function saveUser(user, overwrite, getDiffBoard) {
    if (overwrite) {
        localStorage.removeItem(getDiffBoard);
    } 

    var newHighscore = [
        {name: user, LScore: score}
    ];


    //Save to storage with difficulty as the Key
    localStorage.setItem(getDiffBoard, JSON.stringify(newHighscore));
}