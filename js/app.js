
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
// for better error handling, and performance
"use strict"; 


// Create a list that holds all of your cards
const cards = ['fa-anchor', 'fa-anchor', 
                'fa-bicycle', 'fa-bicycle',
                'fa-bolt', 'fa-bolt',
                'fa-bomb', 'fa-bomb', 
                'fa-cube', 'fa-cube',
                'fa-diamond', 'fa-diamond',
                'fa-leaf', 'fa-leaf',
                'fa-paper-plane-o', 'fa-paper-plane-o'
                ]

/*
Input: number of moves 
Output: no output
Behavior : updates <span class="moves">numMoves</span> in index.html
*/
function updateMoves(numMoves) {
    document.getElementsByClassName("moves")[0].innerHTML = numMoves;
}

/*
Input: number of stars
Output: no output
Behavior: update <ul class="stars"> </ul> in index.html
*/
function updateStars(numStars) {
    // minimize DOM access by temporarily storing star list to content variable
    let content = "";
    for (let i=0; i<numStars; ++i) {
        content += '<li><i class="fa fa-star"></i></li>';
    }
    document.getElementsByClassName("stars")[0].innerHTML = content;
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
