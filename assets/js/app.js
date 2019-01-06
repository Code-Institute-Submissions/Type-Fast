const reset = $('#reset-game');
const start = $('#start-game');
const instructions = $('#game-instructions');
const difficulty = $('.difficulty');
const difficulty_changer = $('#difficulty-changer');
var game_difficultly = 0;

var displayWords = [];


$(document).ready(function(){
    obtainWords();
    // On load open instructions modal
    //instructions.modal('show');
    
    //Change Difficultly
    difficulty.on('click', function(){
        if (difficulty_changer.html() == 'Easy') {
            difficulty_changer.html('Moderate');
            game_difficultly = 1;
        } else if (difficulty_changer.html() == 'Moderate') {
            difficulty_changer.html('Hard');
            game_difficultly = 2;
        } else if (difficulty_changer.html() == 'Hard') {
            difficulty_changer.html('Easy');
            game_difficultly = 0;
        }

        obtainWords();
    });

    //Start the Game
    start.on('click', function(){
        //Displays Reset button as game has started
        start.css('display', 'none');
        reset.css('display','initial');



    });


    //Reset the Game 
    reset.on('click', function(){
        start.css('display', 'initial');
        reset.css('display','none');


    });
    
    
})

//Game

function obtainWords(){
    $.getJSON("assets/js/json/words.json", function(data){
        
        $.each(data, function(diff, val){
            displayWords.push(val);
        });
        
        console.log(displayWords[game_difficultly]["words"][0]);

    });
}

//Timer

