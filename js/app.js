/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');

// Refresh game
function refresh() {
    document.querySelector('.moves').innerHTML = 0;
    // document.getElementsByClassName('.card').removeClass('.match');
}

refresh();

 /*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Funtion to utilize shuffle function to put shuffled cards in new array
function shuffleCards () {
    const unshuffledCards = Array.from(document.querySelectorAll('.deck li')); // List of all cards converted to an array
    const shuffledCards = shuffle(unshuffledCards); // shuffle cards
    for (card of shuffledCards) {
        deck.appendChild(card); // for loop to append newly ordered cards to deck
    }
}

shuffleCards();

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
let timerOn = false; 

deck.addEventListener('click', (event) => {
    const clickedCard = event.target;
    if (clickedCard.classList.contains('card') && openCards.length <2) {
        flipCard(clickedCard);
        addCard(clickedCard);
        if (openCards.length === 2) {
            checkMatch();
            addMove();
            checkRating();
        }
    }
});

// Toggle function to reveal card's symbol or flip back over
function flipCard(clickedCard) {
    clickedCard.classList.toggle('open');
    clickedCard.classList.toggle('show');
    if (timerOn === false) {
        startTimer();
        timerOn = true;
    }
}

// Function to add clicked card to list of "open" cards
let openCards = [];

function addCard (clickedCard) {
    openCards.push(clickedCard);
}

// Function to check if opened cards are matching 
function checkMatch() {
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) { // check if card class matches
        openCards[0].classList.toggle('match'); // add match class to matching cards
        openCards[1].classList.toggle('match');
        openCards = []; // clears open card array for next moves
    } else {
        setTimeout (() => { // set timeout so we can see open cards before they flip back
            flipCard(openCards[0]); // flips cards back
            flipCard(openCards[1]);
            openCards = []; // clears open card array
        }, 1200);
    }   
}

// Function to increment move counter
let moves = 0;

function addMove() {
    moves++;
    document.querySelector('.moves').innerHTML = moves; // update span text of moves class
}

// Function for star rating
function checkRating() {
    if (moves === 14 || moves === 20) {
        // remove star
        document.querySelector('.fa-star').remove();
    }
}

// Function to start and display timer: startTimer(); displayTimer();
let time = 0;
let timeDisplay;

function startTimer() {
    timeDisplay = setInterval(() => {
        time++;
        displayTimer();
    }, 1000);
}

function displayTimer() {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    if (seconds < 10) {
        document.querySelector('.seconds').innerHTML = "0" + seconds;
    } else {
        document.querySelector('.seconds').innerHTML = seconds;         
    }
    if (minutes < 10 ) {
        document.querySelector('.minutes').innerHTML = "0" + minutes;
    } else {
        document.querySelector('.minutes').innerHTML = minutes;
    }
}

// Function for stop timer: stopTimer(); @end of game
function stopTimer() {
    clearInterval(timeDisplay);
}

// Event listener for "restart"

// Add progress bar?