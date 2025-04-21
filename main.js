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

//Game functionality
function startRound() {
  fetchRandomMeal().then(meal => {
    mealImage.src = meal.strMealThumb;
    mealIngredients.innerHTML = ''; 

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const amount = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = `${amount} ${ingredient}`.trim();
        mealIngredients.appendChild(li);
      }
    }

    //keeps the answers for validation
    const areaSelect = document.getElementById('guess-area');
    const categorySelect = document.getElementById('guess-category');

    areaSelect.dataset.correctArea = meal.strArea.toLowerCase();
    categorySelect.dataset.correctCategory = meal.strCategory.toLowerCase();
  });
}
//submittion functionality
submitGuessButton.addEventListener('click', () => {
  const areaSelect = document.getElementById('guess-area');
  const categorySelect = document.getElementById('guess-category');

  const areaGuess = areaSelect.value.toLowerCase();
  const categoryGuess = categorySelect.value.toLowerCase();

  const correctArea = areaSelect.dataset.correctArea;
  const correctCategory = categorySelect.dataset.correctCategory;

//generates correct or wrong answer for each round
  if (areaGuess === correctArea || categoryGuess === correctCategory) {
    correctGuesses++;
    feedback.textContent = `CORRECT!! Yippie! You got it correct.🔥 It was ${correctArea} (${correctCategory})`;
    feedback.style.color = 'purple';
  } else {
    feedback.textContent = `Oops 😬... It was ${correctArea} (${correctCategory}). Keep trying though!`;
    feedback.style.color = 'magenta';
  }

  scoreDisplay.textContent = `Score: ${correctGuesses}`;

 
  areaSelect.value = '';
  categorySelect.value = '';


  // counter for the rounds with a timer 
  round++;
  if (round < 3) {
    setTimeout(startRound, 2000); 
  } else {
    setTimeout(endGame, 2000);
  }
});

//runs when game ends
function endGame() {
  const startScreen = document.getElementById('start-sc');
  if (startScreen) {
    startScreen.style.display = 'none';
  }
  gameContainer.innerHTML = `
    <h2>Game Over!</h2>
    <p>You scored ${correctGuesses} out of 3</p>
    <p>${getRemark()}</p>
    <button class="restart-button" onclick="window.location.reload()">Play Again</button>
  `;
}

//assigns remarks based off of points
function getRemark() {
  if (correctGuesses === 3) return "You're a certified foodie! 👑";
  if (correctGuesses === 2) return "Almost there  💅🏾";
  if (correctGuesses === 1) return "Good trial, baby chef 🧁";
  return "Not everyone can get it all the time, so we try again next time pooks 😅";
}

