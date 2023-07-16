const appEl = document.querySelector('.game-container');
const gameInfoBtn = document.querySelector('.game-info-btn');
const gameLevel = document.querySelectorAll('input');


gameInfoBtn.addEventListener('click', function () {

    for (let i = 0; i < gameLevel.length; i++) {

        if (gameLevel[i].checked) {

            appEl.innerHTML = `Здесь будет ${gameLevel[i].value} уровень`;

            localStorage.setItem('level', `${gameLevel[i].value}`);
        }
    }
});