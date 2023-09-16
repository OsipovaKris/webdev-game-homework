/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index/index.js":
/*!************************!*\
  !*** ./index/index.js ***!
  \************************/
/***/ (() => {

eval("const gameBox = document.querySelector(\".game-box\");\nconst cardBox = document.querySelector(\".game-card-box\");\nconst popupBox = document.querySelector(\".game-popup-box\");\nconst gamePopupBtn = document.getElementById(\"game-popup-btn\");\nconst gameLevel = document.querySelectorAll(\"input\");\nconst restartBtn = document.getElementById(\"restart-btn\");\n\nconst state = {};\n\ngamePopupBtn.addEventListener(\"click\", function () {\n  for (let i = 0; i < gameLevel.length; i++) {\n    if (gameLevel[i].checked) {\n      state[\"level\"] = gameLevel[i].value;\n\n      popupBox.classList.add(\"hidden\");\n\n      gameBox.classList.remove(\"hidden\");\n\n      getGame();\n    }\n  }\n});\n\nfunction getGame() {\n  const generateCardArr = (length, max) =>\n    [...new Array(length)].map(() => Math.round(Math.random() * max));\n\n  const cardArr = generateCardArr(state.level * 3, 35);\n\n  const allCardArr = cardArr.concat(cardArr).sort(() => Math.random() - 0.5);\n\n  let cardBoxArr = [];\n\n  for (let i = 0; i < state.level * 6; i++) {\n    cardBoxArr.push(`<img src='../components/${allCardArr[i]}.svg'>`);\n  }\n\n  cardBox.innerHTML = cardBoxArr.join(\"\");\n}\n\nrestartBtn.addEventListener(\"click\", function () {\n  getGame();\n});\n\n\n//# sourceURL=webpack://webdev-game-homework/./index/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index/index.js"]();
/******/ 	
/******/ })()
;