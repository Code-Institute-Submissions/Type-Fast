const start = $('#start-game');
const difficulty = $('.difficulty');
const difficultyChanger = $('#difficulty-changer');
const displayChoice = $('#word-display');
const userInput = $('#user-input');
const userScoreMain = $('.user-score');
const userScore = $('#score');
const displayScore = $('.user-score');
const timer = $('#timer-sec');
const gameoverModal = $('#game-over');
const gameoverScore = $('#game-over-score');
const gameoverDiff = $('#game-over-diff');
const inputUserScore = $('.input-user');
const addUser = $('#add-user');
const username = $('#username');

var game_difficultly = 9;
<<<<<<< HEAD
var score = 0;

var displayWords = [];

$(document).ready(function(){
    
    obtainWords();

=======
var score = 25;

var displayWords = [];

var leaderboard; 

$(document).ready(function(){
    obtainWords();
    endGame();
>>>>>>> 334d2e861447258b23e689287708b11aab064b9d
    //Change Difficultly
    difficulty.on('click', function(){
        if (difficultyChanger.html() == 'Easy') {
            difficultyChanger.html('Moderate');
<<<<<<< HEAD
            game_difficultly = 5;
=======
            game_difficultly = 6;
>>>>>>> 334d2e861447258b23e689287708b11aab064b9d
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
<<<<<<< HEAD
        displayScore.css('display','initial');
=======
        userScoreMain.css('display','initial');
>>>>>>> 334d2e861447258b23e689287708b11aab064b9d
        setTimeout(function(){
            game();
            gameTimer();
            gameStatus();
        }, 1000);
        
<<<<<<< HEAD
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
    
    
=======
    });    
>>>>>>> 334d2e861447258b23e689287708b11aab064b9d
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
<<<<<<< HEAD
    
    //random number generator
    i = Math.floor(Math.random()*10);

    //word to display
    arrayChoice = displayWords[0][3].word;
=======
    //Random Number
    i = Math.floor(Math.random() * 14);

    //Displays random word from array
    displayChoice.html(displayWords[0]["words"][i]);
>>>>>>> 334d2e861447258b23e689287708b11aab064b9d

    //display word
    displayChoice.html(arrayChoice);
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
    leaderboard = JSON.parse(localStorage.getItem(getDiffBoard));
    
    if(localStorage.getItem(getDiffBoard) === null) {

            //No Leaderboard in storage
        
            console.log('does qualify, but no leaderboard in localstorage.');
            
            inputUserScore.css('display', 'initial');
            
            addUser.on('click', function(){
                var tableRowEmpty = `<tr>
                <td>1</td>
                <td>${username.val()}</td>
                <td>${score}</td>
                </tr>`;
                $('.leaderboard > table').append(tableRowEmpty);
                saveUser(username.val(), false);
                inputUserScore.css('display', 'none');
            });
        
    } else {
        //Leaderboard in storage
        if (leaderboard[0].LScore < score) {
            console.log('does qualify, leaderboard in storage.');

            //Is leaderboard, overwrite and save

            inputUserScore.css('display', 'initial');

            var tableRow = `<tr>
            <td>1</td>
            <td>${leaderboard[0].name}</td>
            <td>${leaderboard[0].LScore}</td>
            </tr>`;
            $('.leaderboard > table').append(tableRow);

            addUser.on('click', function(){
                $('.leaderboard > table').find('td').html("");
                //var tableHeadings = `<tr>
                //    <th class="center-content" id="table-position">No.</th>
                //    <th class="center-content" id="table-username">Username</th>
                //    <th class="center-content" id="table-score">Score</th>
                //</tr>`
                var tableRowEmpty = `<tr>
                <td>1</td>
                <td>${username.val()}</td>
                <td>${score}</td>
                </tr>`;
                $('.leaderboard > table').append(tableRowEmpty);
                saveUser(username.val(), true);
                inputUserScore.css('display', 'none');
            });
        } else {
            console.log('doesnt qualify');
            var userScoreIsLess = `<h4>Oh no!>:( You didn't quite score enough to reach the leaderboard, better luck next time!</h4>`;
            $('.gameover-alert').append(userScoreIsLess);
            var tableRow = `<tr>
            <td>1</td>
            <td>${leaderboard[0].name}</td>
            <td>${leaderboard[0].LScore}</td>
            </tr>`;
            $('.leaderboard > table').append(tableRow);
        }

    }    
}

function saveUser(user, overwrite) {
    if (overwrite) {
        localStorage.clear();
        console.log('Local Storage has been cleared.')
    } 

    var newHighscore = [
    {name: user, LScore: score}
    ];

    localStorage.setItem(getDiffBoard, JSON.stringify(newHighscore));
    
    console.log('Item Saved');    
}