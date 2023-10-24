import { state } from "../index/index";

export function generateCard(cardBoxArr: string[]) {
  const generateCardArr = (length: number, max: number) =>
    [...new Array(length)].map(() => Math.round(Math.random() * max));

  const cardArr = generateCardArr(state.level * 3, 35);

  const allCardArr = cardArr.concat(cardArr).sort(() => Math.random() - 0.5);

  for (let i = 0; i < state.level * 6; i++) {
    cardBoxArr.push(
      `<div data-id=${allCardArr[i]} class='game-card' style='background-image: url("../static/img/${allCardArr[i]}.svg");'></div>`,
    );
  }
}
