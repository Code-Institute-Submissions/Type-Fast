# Type Fast - Interactive Front End Milestone Project

Type Fast is a Single-Page Application design to help users master typing at speed with pin point accuracy. The application offers easy to use functionally and offers a competition built in with the use of the browser LocalStorage.

Type fast is deployed using GitHub pages, you can view it [here](https://msped.github.io/Interactive-Front-End-Project/).

## UX

- The user will want easy to read instructions and easy functionallity of the application. 

- The user wishes to determine when they start the games instead of it starting on the loading of the page. The designated start button will wait 1 second then show the first word in the designated area therefore initiate the game. 

- User wish to be notified of an end game situation. The end game modal would arise when the timer has reached 0 and the user has failed to input the displayed word correctly. 

- The end game modal will display the score as well the Top Score on the users Browser using the Local Storage that is built in. 

- Users will want to see randomly generated words, this will be displayed to the user to which they should enter it to an input on the screen.

- Users wish to change the difficulty before starting a match to test there skills at different levels. The difficulty setting will be dependant on the amount of seconds it takes to complete the typing of each word.

Initial Wireframes for the site:

[Desktop](https://github.com/msped/Interactive-Front-End-Project/blob/master/assets/wireframes/exports/Web%201920%20%E2%80%93%201.png)  |  [Mobile](https://github.com/msped/Interactive-Front-End-Project/blob/master/assets/wireframes/exports/iPhone%206-7-8%20Plus%20%E2%80%93%201.png)

## Features

### Existing Features

- The user will be able to view a randomly generated word with the use of an API, namely the Wordnik API. Use of the API key has been hidden, by placing the key in a JSON file and using .gitignore upon that file. This is due to Wordnik's policy on sharing of the API.

- Users will be able to input the displayed word shown from the API using the textbox input. If the input is correct, the textbox will clear and a new word will be displayed from the API. If the word inputted is incorrect and the same length of the word on display, the input will automatically clear for the user to re-enter the displayed word.

- The user is able to change the difficulty by clicking the difficulty text. There are three settings which consist of Easy, Moderate & Hard, each difficulty operate on the amount of time it takes the input the displayed word.

- The user will be notified of an end game situation by using the Bootstrap Modal. This modal will show the users score with the difficulty played on. A leaderboard will be also placed in the modal where the data is stored with in the browsers Local Storage.

- The user, if the score is higher than the one stored within the browser Local Storage, will be prompted to enter a username.

- Upon a correct word the text will appear green sharply and fade out over a period of 0.3s.

### Features left to implement

- One feature I would of like to implement is a 'League' type of competition that friends can invite each other into.

## Technologies Used

Below are the libraries and languages used in creating this project.

- [HTML5](https://en.wikipedia.org/wiki/HTML5)
    - HTML5 was used for semantic structure of conent on the webpage.

- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS33)
    - CSS3 was used to style the HTML5 content to produce an aesthetically pleasing viewing experience.

- [JavaScript](https://www.javascript.com/)
    - JavaScript was used to create behaviour for the web-page(s) as well as an interactive experience for the user. 

- [jQuery](https://jquery.com/)
    - jQuery was used to simplfy the manipulation of the DOM.

- [jQuery UI](https://jqueryui.com/)
    - jQuery UI was used to implement effects into DOM elements. 

- [Wordnik API](https://developer.wordnik.com/)
    - The Wordnik API was used in the random generation of words from the dictionary for the game.

- [Easytimer.js](http://albert-gonzalez.github.io/easytimer.js/)
    - Easytimer.js by Albert Gonzalez was used to acquire an accurate easy to use timer. 

## Testing

- [Jasmine Testing Results](https://msped.github.io/Interactive-Front-End-Project/assets/jasmine-testing/jasmine-testing.html) 
    - In the Jasmine testing I tested the wordsMatch() function numerous times. I conducted 3 tests on the function, each test showing the True and False outcomes for the three tests.
        
        1.  The first test is to make sure that the basic principles of the function works. I tested with non-capitalised words, hero & villian, to test that the function will `return false`.

        The second half of this test is to `return true`. In order to do this I tested the words tempest & tempest in the wordsMatch() function.

        2. The second Jasmine Test conducted looked at the capitialisation of the first letters of words. The first test conducted was to `return false` with the words Mercedes & mercedes.

        The second half of the capitialisation test was to return a true value. I use the words Ford & Ford to test this and the result was expected, the function returned `true`.

        3. Finally the last of the Jasmine Tests conducted was to test the function against hyphenated words. Firstly to test that the function would `return false` I passed in the parameters 'part-time' & 'part time', which came back as false.

        The second half of the test was to test if the function returned `false`. The parameters for this test were 'part-time' & 'part-time'. Which subsequently passed returning `true`.

- Testing visual display for correct and incorrect words

    i. Click the start button when the page loads.

    ii. Firtly typed in a word that was incorrect to what was on the screen.

    The word displayed then turned red and shaked left to right to indicate that it was incorrect.

    iii. Secondly typed in the correct word displayed.

    The word first changed to the next word before turn green and fading out to indicate that the word typed is correct to the user.

- Testing changing the difficulty
    Each difficultly has a different length of time in order to type the word into the input. I tested this by pressing start on the default 'Easy' difficulty to which the timer started on 10 seconds. By clicking on the difficulty displayed till will change to then next one, in this case being 'Moderate'. On moderate I clicked start to which the timer started to countdown at 7 seconds. The final difficulty option 'Hard' when selected started to count down at 4 seconds.

- Testing the leaderboard functionality
    In order to test the leaderboard functionality I first emptied the local storage on my browser. When scoring any points with an empty leaderboard in local storage a textbox will appear to add username on the end game modal. When clicking add it will populate this highest score into the table for the user whilest adding to the local storage under the 'Easy' key.

    When the user has scored less than the stored score, a message is displayed to alert the user that the score doesn't qualify for the leaderboard.

    When the score is higher that the score stored in the local storage an input box and 'Add' button appears indicating that the user nbow qualifies for the leaderboard, prompting them to input a username.

### Bugs found during testing

One bug found during testing was that on Apple Devices the keyboard autocapitialises the first letter of the first word that is put into the input box. This caused an issue with the game itself as if the first letter isn't capitialised the JavaScript won't recognise this small issue. This issue was recifited by adding `autocapitalize="none"` to the input box, also to any issues with users on mobile using autocorrect I also added `autocorrect="off"` to stop autocorrect for users.

## Deployment

This single page application is deployed using GitHub pages [here](https://msped.github.io/Interactive-Front-End-Project/).

## Credits

- [Easytimer.js](http://albert-gonzalez.github.io/easytimer.js/)

- [Wordnik API](https://developer.wordnik.com/)