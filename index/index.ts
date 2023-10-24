import "./index.css";
import { generateCard } from "../components/generate-card";

const app: HTMLElement | null = document.querySelector(".game-container");
type ttt = { level: number; card: string[]; time: string };
export let state: ttt = { level: 0, card: [], time: "" }; //состояние игры

const renderGamePopupPage = () => {
  (app as HTMLElement).innerHTML = `<div class="popup-box" id="game-popup">
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

  const gamePopupBtn: HTMLElement | null =
    document.getElementById("game-popup-btn");
  const gameLevel = document.querySelectorAll("input");

  (gamePopupBtn as HTMLElement).addEventListener("click", function () {
    for (let i = 0; i < gameLevel.length; i++) {
      if (gameLevel[i].checked) {
        state.level = Number(gameLevel[i].value);

        renderGamePage();
      }
    }
  });
};

renderGamePopupPage();

function renderGamePage() {
  (app as HTMLElement).innerHTML = `<div class="game-box">
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

  let cardBoxArr: string[] = [];

  generateCard(cardBoxArr);

  const cardBox: HTMLElement | null = document.querySelector(".game-card-box");

  (cardBox as HTMLElement).innerHTML = cardBoxArr.join("");

  state.card = [];

  setTimeout(changeCard, 5000);

  const restartBtn: HTMLElement | null = document.getElementById("restart-btn");

  (restartBtn as HTMLElement).addEventListener("click", function () {
    renderGamePage();
  });
}

let interval: number = 0;
let seconds: number = 0;
let minutes: number = 0;

function changeCard() {
  const cardImg: NodeListOf<Element> = document.querySelectorAll(".game-card");

  let timer: HTMLElement | null = document.querySelector(".game-time");

  clearInterval(interval);

  seconds = 0;

  for (let i = 0; i < cardImg.length; i++) {
    (cardImg[i] as HTMLElement).style.backgroundImage =
      'url("../static/img/card.svg")';
  }

  interval = setInterval(updateTime, 1000, timer);

  setGame(timer as HTMLElement);
}

function updateTime(timer: HTMLElement) {
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }

  timer.textContent = `${minutes.toString().padStart(2, "0")}.${seconds
    .toString()
    .padStart(2, "0")}`;
}

function setGame(timer: HTMLElement) {
  const cardImgs: NodeListOf<Element> = document.querySelectorAll(".game-card");

  let arr: string[] = [];

  for (const cardImg of cardImgs as any) {
    (cardImg as HTMLElement).addEventListener("click", function () {
      if (arr.length < 2) {
        arr.push(cardImg.dataset.id);
        cardImg.style.backgroundImage = `url("../static/img/${cardImg.dataset.id}.svg")`;

        if (arr.length === 2 && arr[0] === arr[1]) {
          state.card.push(String(cardImg.dataset.id));

          setGame(timer);
        }
        if (arr.length === 2 && arr[0] !== arr[1]) {
          clearInterval(interval);

          state.time = String(timer.textContent);

          setTimeout(getResult, 1000, 0);
        }
      }
    });
  }

  if (state.card.length === state.level * 3) {
    clearInterval(interval);

    state.time = String(timer.textContent);

    setTimeout(getResult, 1000, 1);
  }
}

function getResult(result: number) {
  const gameBox: HTMLElement | null = document.querySelector(".game-box");
  (gameBox as HTMLElement).classList.add("non-pointer");

  (app as HTMLElement).innerHTML += `<div class="popup-box" id="result-popup" 
      style="top: calc(50% - 460px / 2);
      left: calc(50% - 480px / 2);
      z-index: 1;">
${
  result === 1
    ? '<img class="icon" src="../static/img/res1.svg" alt=""/><p class="game-popup-text" id="text-result">Вы выиграли!</p>'
    : '<img class="icon" src="../static/img/res0.svg" alt=""/><p class="game-popup-text" id="text-result">Вы проиграли!</p>'
}
<p class="text">Затраченное время:</p>
<p class="game-time time-text">${state.time}</p>
<button class="game-btn" id="restart-game-btn">Играть снова</button>`;

  const restartGameBtn: HTMLElement | null =
    document.getElementById("restart-game-btn");

  (restartGameBtn as HTMLElement).addEventListener("click", function () {
    state = { level: 0, card: [], time: "" };

    renderGamePopupPage();
  });
}
