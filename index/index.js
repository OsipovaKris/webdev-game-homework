import "./index.css";

const app = document.querySelector(".game-container");
let state = {}; //состояние игры

const renderGamePopupPage = () => {
  app.innerHTML = `<div class="popup-box" id="game-popup">
<p
class="game-popup-text">Выбери сложность</p>
<div class="game-level-box">
<input type="radio" id="radio1" name="radios" value="1" checked />
<label for="radio1">1</label>
<input type="radio" id="radio2" name="radios" value="2" />
<label for="radio2">2</label>
<input type="radio" id="radio3" name="radios" value="3" />
<label for="radio3">3</label>
</div>
<button class="game-btn" id="game-popup-btn">Старт</button>
</div>`;

  const gamePopupBtn = document.getElementById("game-popup-btn");
  const gameLevel = document.querySelectorAll("input");

  gamePopupBtn.addEventListener("click", function () {
    for (let i = 0; i < gameLevel.length; i++) {
      if (gameLevel[i].checked) {
        state["level"] = gameLevel[i].value;

        renderGamePage();
      }
    }
  });
};

renderGamePopupPage();

function renderGamePage() {
  app.innerHTML = `<div class="game-box">
<div class="game-info">
<div class="game-info-timer">
<div class="game-time-meta">
<p>min</p>
<p>sek</p>
</div>
<p class="game-time">00.00</p>
</div>
<button class="game-btn" id="restart-btn">Начать заново</button>
</div>
<div class="game-card-box"></div>
</div>`;

  const cardBox = document.querySelector(".game-card-box");

  const generateCardArr = (length, max) =>
    [...new Array(length)].map(() => Math.round(Math.random() * max));

  const cardArr = generateCardArr(state.level * 3, 35);

  const allCardArr = cardArr.concat(cardArr).sort(() => Math.random() - 0.5);

  let cardBoxArr = [];

  for (let i = 0; i < state.level * 6; i++) {
    cardBoxArr.push(
      `<div data-id=${allCardArr[i]} class='game-card' style='background-image: url("../static/img/${allCardArr[i]}.svg");'></div>`,
    );
  }

  cardBox.innerHTML = cardBoxArr.join("");

  state["card"] = [];

  setTimeout(changeCard, 5000);

  const restartBtn = document.getElementById("restart-btn");

  restartBtn.addEventListener("click", function () {
    renderGamePage();
  });
}

let interval = 0;
let seconds = 0;
let minutes = 0;

function changeCard() {
  const cardImg = document.querySelectorAll(".game-card");
  let timer = document.querySelector(".game-time");

  clearInterval(interval);

  seconds = 0;

  for (let i = 0; i < cardImg.length; i++) {
    cardImg[i].style.backgroundImage = 'url("../static/img/card.svg")';
  }

  interval = setInterval(updateTime, 1000, timer);

  setGame(timer);
}

function updateTime(timer) {
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }

  timer.textContent = `${minutes.toString().padStart(2, "0")}.${seconds
    .toString()
    .padStart(2, "0")}`;
}

function setGame(timer) {
  const cardImg = document.querySelectorAll(".game-card");

  let arr = [];

  for (let i = 0; i < cardImg.length; i++) {
    cardImg[i].addEventListener("click", function () {
      if (arr.length < 2) {
        arr.push(cardImg[i].dataset.id);
        cardImg[
          i
        ].style.backgroundImage = `url("../static/img/${cardImg[i].dataset.id}.svg")`;

        if (arr.length === 2 && arr[0] === arr[1]) {
          state.card.push(cardImg[i].dataset.id);

          setGame(timer);
        }
        if (arr.length === 2 && arr[0] !== arr[1]) {
          clearInterval(interval);

          state["timer"] = timer.textContent;

          setTimeout(getResult, 1000, 0);
        }
      }
    });
  }

  if (state.card.length === state.level * 3) {
    clearInterval(interval);

    state["timer"] = timer.textContent;

    setTimeout(getResult, 1000, 1);
  }
}

function getResult(result) {
  const gameBox = document.querySelector(".game-box");
  gameBox.classList.add("non-pointer");

  app.innerHTML =
    app.innerHTML +
    `<div class="popup-box" id="result-popup" 
      style="top: calc(50% - 460px / 2);
      left: calc(50% - 480px / 2);
      z-index: 1;">
${
  result === 1
    ? '<img class="icon" src="../static/img/res1.svg" alt=""/><p class="game-popup-text" id="text-result">Вы выиграли!</p>'
    : '<img class="icon" src="../static/img/res0.svg" alt=""/><p class="game-popup-text" id="text-result">Вы проиграли!</p>'
}
<p class="text">Затраченное время:</p>
<p class="game-time time-text">${state.timer}</p>
<button class="game-btn" id="restart-game-btn">Играть снова</button>`;

  const restartGameBtn = document.getElementById("restart-game-btn");

  restartGameBtn.addEventListener("click", function () {
    state = {};

    renderGamePopupPage();
  });
}
