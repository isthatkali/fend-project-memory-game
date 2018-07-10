/*
 * Create a list that holds all of your cards
 */

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

// Set up event listener for when a card is clicked
const deck = document.querySelector('.deck');

deck.addEventListener('click', (event) => {
    const clickedCard = event.target;
    if (clickedCard.classList.contains('card') && openCards.length <2) {
        flipCard(clickedCard);
        addCard(clickedCard);
        if (openCards.length === 2) {
            checkMatch();
        }
    }
});

// Toggle function to reveal card's symbol
function flipCard(clickedCard) {
    clickedCard.classList.toggle('open');
    clickedCard.classList.toggle('show');
}

// Function to add clicked card to list of "open" cards
let openCards = [];

function addCard (clickedCard) {
    openCards.push(clickedCard);
}

// Function to check if opened cards are matching 
function checkMatch() {
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
        openCards[0].classList.toggle('match');
        openCards[1].classList.toggle('match');
        openCards = []; // clears open card array
    } else {
        setTimeout (() => { // set timeout so we can see open cards before they flip back
            flipCard(openCards[0]); // flips cards back
            flipCard(openCards[1]);
            openCards = []; // clears open card array
        }, 2000);
    }   
}