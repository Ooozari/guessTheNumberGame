// Digital clock
const clock = document.getElementById('time');

setInterval(function () {
   let date = new Date();
   clock.innerHTML = date.toLocaleTimeString();
}, 1000)

// Guess The Number

// Variables
let randomNum = parseInt(Math.random() * 100 + 1);

const gSubmitBtn = document.querySelector('#Guess');
const userInpGuessField = document.querySelector('#user-guess');
const perGuessSlots = document.querySelector('#previous-guesses');
const atmpRemaing = document.querySelector('#attempts-left');
const hint = document.querySelector('#hint');
const scoreDisplay = document.querySelector('#socre');

let prevGuess = [];
let numOfGuess = 1;
let playGame = true;
let score = 1000;

// Methods or Functions
if (playGame) {
   gSubmitBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const guess = parseInt(userInpGuessField.value);
      scoreDisplay.innerHTML = `${score}`;
      validateGuess(guess);
   });
}

function validateGuess(guess) {
   if (guess > 100 || guess < 1 || isNaN(guess)) {
      alert('Please Enter a Valid Number');
   } else {
      prevGuess.push(guess); // push the guess into array so that we can display it
      if (numOfGuess === 10) {
         displayGuess(guess);
         displayMessage(`Game Over. The number was ${randomNum}`);
         endGame();
      } else {
         displayGuess(guess);
         checkGuess(guess);
      }
   }
}

function checkGuess(guess) {
   if (guess === randomNum) {
      displayMessage(`Congrats! You guessed it.`);
      endGame();
   } else {
      if (guess > randomNum) {
         displayMessage(`The number is smaller than ${guess}.`);
      } else {
         displayMessage(`The number is greater than ${guess}.`);
      }

      // Calculate score based on proximity
      let proximity = Math.abs(guess - randomNum);
      if (proximity <= 5) {
         score += 100;
      } else if (proximity <= 10) {
         score += 50;
      }
      score -= 50; // Deduct points for incorrect guess
   }

   scoreDisplay.innerHTML = `${score}`;
}

function displayGuess(guess) {
   userInpGuessField.value = ''; // clear the input field previous value
   perGuessSlots.innerHTML += `${guess}, `; // update the previous guess field
   numOfGuess++;
   atmpRemaing.innerHTML = `${11 - numOfGuess}`;
}

function displayMessage(message) {
   hint.innerHTML = `${message}`;
}

function endGame() {
   userInpGuessField.value = '';
   userInpGuessField.setAttribute('disabled', 'disabled');
   playGame = false;
}

// Function to set up new game
function newGame() {
   const newGameBtn = document.getElementById('newGameBtn');
   newGameBtn.addEventListener('click', function (e) {
      randomNum = parseInt(Math.random() * 100 + 1);
      prevGuess = [];
      numOfGuess = 1;
      score = 1000;
      perGuessSlots.innerHTML = '';
      hint.innerHTML = '';
      scoreDisplay.innerHTML = `${score}`;
      atmpRemaing.innerHTML = `${11 - numOfGuess}`;
      userInpGuessField.removeAttribute('disabled');
      playGame = true;
   });
}

// Set up the new game button event listener after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
   newGame();
});
