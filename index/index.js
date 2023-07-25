const gameBox = document.querySelector(".game-box");
const cardBox = document.querySelector(".game-card-box");
const popupBox = document.querySelector(".game-popup-box");
const gamePopupBtn = document.getElementById("game-popup-btn");
const gameLevel = document.querySelectorAll("input");
const restartBtn = document.getElementById("restart-btn");

const state = {};

gamePopupBtn.addEventListener("click", function () {
  for (let i = 0; i < gameLevel.length; i++) {
    if (gameLevel[i].checked) {
      state["level"] = gameLevel[i].value;

      popupBox.classList.add("hidden");

      gameBox.classList.remove("hidden");

      getGame();
    }
  }
});

function getGame() {
  const generateCardArr = (length, max) =>
    [...new Array(length)].map(() => Math.round(Math.random() * max));

  const cardArr = generateCardArr(state.level * 3, 35);

  const allCardArr = cardArr.concat(cardArr).sort(() => Math.random() - 0.5);

  let cardBoxArr = [];

  for (let i = 0; i < state.level * 6; i++) {
    cardBoxArr.push(`<img src='../components/${allCardArr[i]}.svg'>`);
  }

  cardBox.innerHTML = cardBoxArr.join("");
}

restartBtn.addEventListener("click", function () {
  getGame();
});
