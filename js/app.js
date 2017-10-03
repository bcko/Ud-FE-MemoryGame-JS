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
                ];

const isCardOpen = [false, false, false, false,
                    false, false, false, false,
                    false, false, false, false,
                    false, false, false, false];

const moveElem = document.getElementsByClassName("moves")[0];
const starElem = document.getElementsByClassName("stars")[0];
const cardsElem = document.getElementsByClassName("card");

/*
Input: no input
Output: no output
Behavior:
*/
function restartGame() {
    // At the beginning of a game, it should display 3 stars.
    updateStars(3);
    updateMoves(0);
    resetDeck();
    isCardOpen.fill(false);
}

/*
Input: number of moves
Output: no output
Behavior: update number of moves in index.html
Warning : refers to global variable moveElem
*/
function updateMoves(numMoves) {
    moveElem.innerHTML = numMoves;
}

/*
Input: number of stars
Output: no output
Behavior: update <ul class="stars"> </ul> in index.html
Warning: refers to global variable starElem
*/
function updateStars(numStars) {
    const star = '<li><i class="fa fa-star"></i></li>';
    starElem.innerHTML = star.repeat(numStars);
}


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
Input: no input
Output: no output
Behavior: 
*/
function resetDeck() {
    shuffle(cards);    
    for (let i=0; i<cardsElem.length; ++i) {
        cardsElem[i].setAttribute("class", "card");
        cardsElem[i].setAttribute("onclick", `openCard(${i})`);
        cardsElem[i].firstChild.setAttribute("class", `fa + ${cards[i]}`);
    }
}


/*
Input: no input
Output: no output
Behavior: reveal entire cards. Used for Debugging
*/
function showDeck() {
    for (let cardElem of cardsElem) {
        cardElem.setAttribute("class", "card open show");        
    }
}

function openCard(i) {
    cardsElem[i].setAttribute("class", "card open show");
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function main() {
    resetDeck();
}

main();

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
