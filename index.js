const appEl = document.querySelector('.game-container');
const gameLevel = document.querySelectorAll('.game-level');
const gameInfoBtn = document.querySelector('.game-info-btn');


for (let i = 0; i < gameLevel.length; i++) {

    gameLevel[i].addEventListener('click', function (e) {

        for (let i = 0; i < gameLevel.length; i++) {

            gameLevel[i].classList.remove('active')
        }

        e.target.classList.add('active');
    })
};

