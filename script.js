"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const scoreEl0 = document.getElementById("score--0");
const scoreEl1 = document.getElementById("score--1");
const currentScoreEl0 = document.getElementById("current--0");
const currentScoreEl1 = document.getElementById("current--1");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let winScore = Number(document.getElementById("win-score").value);
let currentScore = 0;
let currentPlayer = 0;
let Gameover = false;

const diceEl = document.querySelector(".dice");

let scores = [0, 0];

// switch player
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;
  currentPlayer = currentPlayer === 1 ? 0 : 1;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

const removeAllActive = function () {
  if (player0.classList.contains("player--active")) {
    player0.classList.remove("player--active");
  }
  if (player1.classList.contains("player--active")) {
    player1.classList.remove("player--active");
  }
};

// newGame function
const newGame = function () {
  currentScore = 0;
  scores = [0, 0];
  const currentPlayerEle = document.querySelector(`.player--${currentPlayer}`);
  if (currentPlayerEle.classList.contains("player--winner")) {
    currentPlayerEle.classList.remove("player--winner");
  }
  removeAllActive();
  currentPlayer = Math.floor(Math.random() + 0.5);
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add("player--active");
  // hide dice
  diceEl.classList.add("hidden");
  // reset scores to 0
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentScoreEl0.textContent = 0;
  currentScoreEl1.textContent = 0;
};

// new game btn listener
btnNew.addEventListener("click", () => {
  Gameover = false;
  newGame();
});

// rolling button
btnRoll.addEventListener("click", () => {
  // show dice
  if (!Gameover) {
    diceEl.classList.remove("hidden");

    const randDice = Math.floor(Math.random() * 6) + 1;
    diceEl.src = `dice-${randDice}.png`;
    // Add score to current score
    if (randDice !== 1) {
      currentScore += randDice;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    }
    // Switch the player
    else {
      switchPlayer();
    }
  }
});

// hold button
btnHold.addEventListener("click", () => {
  winScore = Number(document.getElementById("win-score").value);
  if (!Gameover) {
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];
    if (scores[currentPlayer] >= winScore) {
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
      Gameover = true;
    } else {
      switchPlayer();
    }
  }
});
