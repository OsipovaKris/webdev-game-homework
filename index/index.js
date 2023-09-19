import "./index.css";

const gameBox = document.querySelector(".game-box");
const cardBox = document.querySelector(".game-card-box");
const popupBox = document.querySelector(".game-popup-box");
const gamePopupBtn = document.getElementById("game-popup-btn");
const gameLevel = document.querySelectorAll("input");
const restartBtn = document.getElementById("restart-btn");

const state = {}; //состояние игры

gamePopupBtn.addEventListener("click", function () {
  for (let i = 0; i < gameLevel.length; i++) {
    if (gameLevel[i].checked) {
      state["level"] = gameLevel[i].value;

      popupBox.classList.add("hidden");

      gameBox.classList.remove("hidden");

      renderCard();
    }
  }
});

function renderCard() {
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

  setTimeout(changeCard, 2000);
}

restartBtn.addEventListener("click", function () {
  renderCard();
});

function changeCard() {
  const cardImg = document.querySelectorAll(".game-card");

  for (let i = 0; i < cardImg.length; i++) {
    cardImg[i].style.backgroundImage = 'url("../static/img/card.svg")';
  }

  setGame();
}

state["card"] = [];

function setGame() {
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

          setGame();
        }
        if (arr.length === 2 && arr[0] !== arr[1]) {
          setTimeout(getResult, 1000, 0);
        }
      }
    });
  }

  if (state.card.length === state.level * 3) {
    setTimeout(getResult, 1000, 1);
  }
}

function getResult(result) {
  if (result === 1) {
    gameBox.innerHTML = "Вы выиграли";
  }
  if (result === 0) {
    gameBox.innerHTML = "Вы проиграли :(";
  }
}
