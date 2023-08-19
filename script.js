const holes = document.querySelectorAll('.mole-hole');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const timeDisplay = document.getElementById('time');
const playAgainButton = document.getElementById('playAgainButton');
const resetButton = document.getElementById('resetButton');

const GAME_DURATION = 10000;
let moleTimer;
let gameTimer;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

highScoreDisplay.textContent = highScore;

holes.forEach(hole => {
  hole.addEventListener('click', () => {
    if (hole.classList.contains('mole')) {
      hole.classList.remove('mole');
      score++;
      scoreDisplay.textContent = score;
      if (score > highScore) {
        highScore = score;
        highScoreDisplay.textContent = highScore;
        localStorage.setItem('highScore', highScore);
      }
    }
  });
});

function randomHole() {
  const index = Math.floor(Math.random() * holes.length);
  return holes[index];
}

function showMole() {
  const hole = randomHole();
  hole.classList.add('mole');

  moleTimer = setTimeout(() => {
    hole.classList.remove('mole');
    if (Date.now() - startTime < GAME_DURATION) {
      showMole();
    } else {
      playAgainButton.style.display = 'block';
    }
  }, Math.random() * 1000 + 500);
}

let startTime;
function startGame() {
  startTime = Date.now();
  updateTimer(); 
  showMole();
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const remaining = Math.max(0, GAME_DURATION / 1000 - elapsed);
  timeDisplay.textContent = remaining;

  if (remaining > 0) {
    requestAnimationFrame(updateTimer);
  } else {
    playAgainButton.style.display = 'block';
  }
}

playAgainButton.addEventListener('click', () => {
  score = 0;
  scoreDisplay.textContent = score;
  playAgainButton.style.display = 'none';
  startGame();
});

resetButton.addEventListener('click', () => {
  localStorage.removeItem('highScore');
  highScore = 0;
  highScoreDisplay.textContent = highScore;
});

startGame();
