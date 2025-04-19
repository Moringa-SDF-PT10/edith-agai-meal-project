//DOM CONTENT
const startButton = document.getElementById('startbutton');
const gameContainer = document.getElementById('game-container');
const mealImage = document.getElementById('meal-image');
const mealIngredients = document.getElementById('meal-ingredients');
const guessInput = document.getElementById('guess');
const submitGuessButton = document.getElementById('submit-guess');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

//Initialization for the rounds
let round = 0;
let correctGuesses= 0;

//button to start the game
startButton.addEventListener('click', () => {
  startButton.style.display = 'none'; 
  gameContainer.style.display = 'block'; 
  startRound(); 
});

//function to fetch the random image 

function fetchRandomMeal() {
  return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      return meal;
    });
}
