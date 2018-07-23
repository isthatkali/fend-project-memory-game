/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');

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
    if (timerOn === false) { // start timer on first move
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
let matchedSets = 0;
const numPairs = 8;

function checkMatch() {
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) { // check if card class matches
        openCards[0].classList.toggle('match'); // add match class to matching cards
        openCards[1].classList.toggle('match');
        openCards = []; // clears open card array for next moves
        matchedSets++;
        if (matchedSets === numPairs) { // check for when game is over
            stopTimer();
            toggleModal();
            presentStats();
        }
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
let time = 0; // stores time in seconds
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

// Function to activate modal box
function toggleModal() {
    document.querySelector('.modal').classList.toggle('hide');
}

// Function to present stats on modal : endStars, endMoves, endTime
function presentStats() {
    const starStat = document.querySelector('.endStars');
    const starCount = document.querySelector('.score-panel .stars').innerHTML; // Need to make horizonal
    const moveStat = document.querySelector('.endMoves');
    const moveCount = document.querySelector('.moves').innerHTML;
    const timeStat = document.querySelector('.endTime');
    const timerTime = document.querySelector('.timer').innerHTML;

    starStat.innerHTML = `Stars:  ${starCount}`;
    moveStat.innerHTML = `Moves:  ${moveCount}`;
    timeStat.innerHTML = `Finish Time:  ${timerTime}`;
}

// Modal box event listeners:
document.querySelector('.fa-check').addEventListener('click', () => {
    toggleModal();
    resetGame();
});

document.querySelector('.fa-close').addEventListener('click', () => {
    toggleModal();
});

// Event listener for replay button on main game screen
document.querySelector('.restart').addEventListener('click', resetGame);

// Function to start new game
function resetGame() {
    resetTime();
    resetMoves();
    resetStars();
    resetCards();
}

function resetTime() {
    stopTimer();
    time = 0;
    displayTimer();
    timerOn = false;
}

function resetMoves() {
    document.querySelector('.moves').innerHTML = 0;
}

function resetStars() {
    const starHTML = `<li><i class="fa fa-star"></i></li> `;
    document.querySelector('.stars').innerHTML = starHTML + starHTML + starHTML;
}

function resetCards() {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.className = 'card'; // remove all "match", "open", "show" classes from cards in deck 
    }
    shuffleCards();
}

// Add progress bar?