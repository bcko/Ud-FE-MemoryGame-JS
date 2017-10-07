// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
// for better error handling, and performance 
"use strict"; 

/* Architecture Overview
- EventListener creates listener and calls EventHandler
- EventHandler handles event by calling internal models (Deck, Stars, Moves).
- Internal models will modify based on events and call ViewChanger to modify view
- ViewChanger changes DOM HTML

Advantage:
- View is decoupled from model 
    - when I change HTML&CSS (likely to change), that change is only propagated to EventListener and ViewChanger
- Easier to test in isolation. 
    - does ViewChanger change HTML? 
    - does EventListener create listener and call appropriate EventHandler?
    - Do internal models work the way we expect without worrying about events, and views

Disadvantage:
- this project isn't meant to take this long... 
*/

const SCORE = {
    star : 3,
    move : 0,
}

const tempArray = {
    temp : [ 'hi1', 'hi2', 'hi3']
}

const DECK = {
    cards : [  'fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bicycle', 'fa-bolt', 'fa-bolt', 'fa-bomb', 'fa-bomb', 'fa-cube', 'fa-cube', 'fa-diamond', 'fa-diamond', 'fa-leaf', 'fa-leaf', 'fa-paper-plane-o', 'fa-paper-plane-o'
            ]
}

class ScoreController {
    static incrementMove() {
        console.log("class ScoreController incrementMove()")
        SCORE.move += 1;
        ViewChanger.setMoves(SCORE.move);
        ScoreController.evaluateStarChange(SCORE);
    }

    static evaluateStarChange() {
        console.log("class ScoreController evaluateStarChange() : [BEGIN] evaluate star change ...");
        console.log(`move is ${SCORE.move} and star is ${SCORE.star}`);
        switch (SCORE.move) {
            case 20 :
                SCORE.star = 2;
                ViewChanger.setStars(SCORE.star);
                break;
            case 30 :
                SCORE.star = 1;
                ViewChanger.setStars(SCORE.star);
                break;
            case 40 :
                SCORE.star = 0;
                ViewChanger.setStars(SCORE.star);
                break;
            default :
                //console.log(`no star change : star remains ${SCORE.star}`);
        }
        console.log(`after evaluation, star is ${SCORE.star}`);
        console.log("class ScoreController evaluateStarChange() : [DONE] evaluate star change ...");
    }

    static resetScore() {
        SCORE.star = 3;
        ViewChanger.setStars(SCORE.star);

        SCORE.move = 0;
        ViewChanger.setMoves(SCORE.move);
    }
}


class DeckController {
     // Algorithm adapted from https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm 
    static shuffleCards(array) {
        console.log("In class DeckController shuffleCards(): shuffles cards in a deck");
        for (let i = array.length - 1; i > 0; --i) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    static resetCards() {
        console.log("In class DeckController resetCards(): resetting cards in a deck");
        DeckController.shuffleCards(DECK.cards);
        ViewChanger.setDeckSymbols(DECK.cards);
    }
}


/* ViewChanger changes View (DOM, HTML)
 * all changes in DOM are in ViewChanger class
 * ViewChanger is a layer between model and View 
 */
class ViewChanger {
    static setStars(numStars) {
        console.log(`class ViewChanger setStars(${numStars}) : changes number of stars in View`);
        const d = document.getElementsByClassName("stars")[0];
        const starHTML = '<li><i class="fa fa-star"></i></li>';
        d.innerHTML = starHTML.repeat(numStars); 
    }

    static setMoves(numMoves) {
        console.log(`class ViewChanger setMoves(${numMoves}) : changes number of moves in View`);
        const d = document.getElementsByClassName("moves")[0];
        d.innerHTML = numMoves;
    }

    static openCard(cardIndex) {
        console.log(`class ViewChanger openCard(${cardIndex}) : opens up a card in a deck`);
        const d = document.getElementsByClassName("card");
        d[cardIndex].setAttribute("class", "card show open");
    }

    static closeCard(cardIndex) {
        console.log(`class ViewChanger closeCard(${cardIndex}) : closes a card in a deck`);
        const d = document.getElementsByClassName("card");
        d[cardIndex].setAttribute("class", "card");
    }

    static matchCard(cardIndex) {
        console.log(`class ViewChanger matchCard(${cardIndex}) : changes a card in a match state`);
        const d = document.getElementsByClassName("card");
        d[cardIndex].setAttribute("class", "card show match");
    }

    static setDeckSymbols(symbolList) {
        console.log(`class ViewChanger setDeckSymbols(${symbolList}) : set deck symbols`);

        const d = document.getElementsByClassName("card");
        console.assert(symbolList.length === d.length, "number of cards in view and model doesn't match");
        for (let i = 0; i < d.length; i++) {
            d[i].firstChild.setAttribute("class", `fa ${symbolList[i]}`);
        }
    }
}


class EventListener {
    static setClickRestart() {
        console.log("class EventListener setClickRestartListener() : setup click eventListener for restart button...");
        console.log("[Listening...] restart button ");
        const restartElement = document.getElementsByClassName('restart')[0];
        restartElement.setAttribute("onclick", "EventHandler.clickRestart()");
    }

    static setClickCards() {
        console.log("class EventListener setClickCardsListener(): setup click eventListener for each card...")
        console.log("[Listening] card clicks");
        const cardsElements = document.getElementsByClassName("card");
        for (let i = 0; i < cardsElements.length; ++i) {
            cardsElements[i].setAttribute("onclick", `EventHandler.clickCard(${i})`);
        }
    }
}

class EventHandler {
    static clickCard(cardIndex) {
        console.log(`[EVENT] user clicks card[${cardIndex}] and triggers EventHandler.clickCard(${cardIndex})`);
        console.log(`In class EventHandler clickCard(${cardIndex}) :`);

    }
    static clickRestart() {
        console.log('[EVENT] user clicks restart button and triggers EventHandler.clickRestart()');
        console.log("In class EventHandler clickRestart() : ");
        ScoreController.resetScore();
        DeckController.resetCards();

    }
}

function main() {
    console.log("function main() : Welcome to Matching Game!");
    EventListener.setClickRestart();
    EventListener.setClickCards();

}

main();





/*
class Star {
    constructor() {
        this.stars = 3;
        this.starsElem = document.getElementsByClassName("stars")[0];
        Star.reset();
    }

    static reset() {
        console.log("In class Star reset() : resets stars = 3");
        Star.setStars(3);
    }

    static decrementByOne() {
        console.log("In class Star decrementByOne() : decrements star by one");
        this.setStars(this.stars-1);
    }

    static setStars(numStars) {
        console.log(`In class Star setStar(${numStars}): `);
        const starTag = '<li><i class="fa fa-star"></i></li>';
        this.starsElem.innerHTML = this.starTag.repeat(numStars);
    }
}


class Move {
    constructor() {
        this.moves = 0;
        this.movesElem = document.getElementsByClassName("moves")[0];
        this.reset();
    }
    
    reset() {
        console.log("In class Move reset() : resets move = 0");
        this.moves = 0;
        this.movesElem.innerHTML = 0;
    }
    
    getMoves() {
        return this.moves;
    }

    incrementByOne() {
        console.log(`In class Move incrementByOne() : increment moves by one. moves=${this.moves + 1}`);               
        this.moves += 1;
        this.movesElem.innerHTML = this.moves;
    }
}

class Deck {
    constructor() {
        this.cardsElem = document.getElementsByClassName("card"); 
        this.cards = [  'fa-anchor', 'fa-anchor', 
                        'fa-bicycle', 'fa-bicycle',
                        'fa-bolt', 'fa-bolt',
                        'fa-bomb', 'fa-bomb', 
                        'fa-cube', 'fa-cube',
                        'fa-diamond', 'fa-diamond',
                        'fa-leaf', 'fa-leaf',
                        'fa-paper-plane-o', 'fa-paper-plane-o'
                     ];
        this.isCardOpen = [ false, false, false, false,
                            false, false, false, false,
                            false, false, false, false,
                            false, false, false, false
                          ];
        this.reset();                      
    }

    static openCard(i) {
        cardsElem[i].setAttribute("class", "card open show");
    }

    // Algorithm adapted from https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm 
    shuffleCards() {
        console.log("In class Deck shuffleCards(): shuffles cards in a deck");
        for (let i = this.cards.length - 1; i > 0; --i) {
            const j = Math.floor(Math.random() * (i+1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    layCardsFacedown() {
        console.log("In class Deck layCardsFacedown(): lays cards facedown");
        for (let i = 0; i < this.cardsElem.length; ++i) {
            this.cardsElem[i].setAttribute("class", "card");
            this.cardsElem[i].firstChild.setAttribute("class", `fa + ${this.cards[i]}`);
        }
    }

    reset() {
        console.log("In class Deck reset(): [BEGIN] resetting Deck...");
        
        this.shuffleCards();
        this.layCardsFacedown();
        
        console.log("In class Deck reset(): [DONE] resetting Deck")
    }

    static openDeck() {
        for (let cardElem of this.cardsElem) {
            cardElem.setAttribute("class", "card open show");        
        }
    }
}

*/




/*


class Game {

    constructor() {
        console.log("In class Game constructor(): [BEGIN] initializing new Matching Game...");
        this.test = 3;
     
        this.moves = new Move();        
        this.stars = new Star();
        this.deck = new Deck();
   
        console.log("In class Game constructor(): [DONE] initializing new Matching Game");
    }
    setTest(num) {
        this.test = num;
    }
    getTest() {
        console.log(this.test);
    }

    static restart() {
        console.log("In class Game restart(): [BEGIN] restarting Matching Game...")
        
        Star.reset();
        this.deck.reset();
        this.moves.reset();

        console.log("In class Game restart(): [DONE] restarting Matching Game")
    }
  
    restart() {
        console.log("restart test");
    }

}
*/

/*
class EventHandler {
    clickCard(i) {
        console.log(`[EVENT] user clicks card[${i}] and triggers EventHandler.clickCard(${i})`);
        console.log(`In class EventHandler clickCard() :`);
    }
    clickRestart() {
        console.log('[EVENT] user clicks restart button and triggers EventHandler.clickRestart()');
        console.log("In class EventHandler clickRestart() : ");
    }
}

class EventListener {
    static setClickRestart() {
        console.log("class EventListener setClickRestartListener() : setup onclick eventListener for restart button...");
        const restartElement = document.getElementsByClassName('restart')[0];
        restartElement.setAttribute("onclick", "EventHandler.clickRestart()");
    }
    static setClickCards() {
        console.log("class EventListener setClickCardsListener(): setup onclick eventListener for each card...")
        const cardsElements = document.getElementsByClassName("card");
        for (let i = 0; i < cardsElements.length; ++i) {
            cardsElements[i].setAttribute("onclick", `EventHandler.clickCard(${i})`);
        }
    }
}
*/

    


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
