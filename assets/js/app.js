const reset = $('#reset-game');
const start = $('#start-game');
const instructions = $('#game-instructions');
const difficulty = $('.difficulty');


$(document).ready(function(){
    

    // On load open instructions modal
    //instructions.modal('show');
    
    //Change Difficultly
    

    //Start the Game
    start.on('click', function(){
        //Displays Reset button as game has started
        start.css('display', 'none');
        reset.css('display','initial');


    })


    //Reset the Game 
    reset.on('click', function(){
        start.css('display', 'initial');
        reset.css('display','none');


    })
    
    
})

