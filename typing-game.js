// 사용변수
const GAME_TIME = 3;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let words = [];
let timeInterval; // setInterval 담을 변수
let checkInterval;

const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

// 시작 함수
init();

function init() {
    getWords();
    wordInput.addEventListener('input', checkMathch);
}

function run() {
    isPlaying = true;
    time = GAME_TIME;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatu, 50);
}

function checkStatu() {
    if(!isPlaying && time === 0) {
        buttonChange("게임 종료");
        clearInterval(checkInterval);

    }
}

// 단어 불러오기
function getWords() {
    words = ['hello', 'banna', 'apple', 'orange', 'cherry'];
    buttonChange('게임 시작');
}

// 단어 일치 체크
function checkMathch() {
    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = '';
        if(!isPlaying) return;
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
    }
}


function countDown() {
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying) clearInterval(timeInterval);
    timeDisplay.innerText = time;
}

function buttonChange(text) {
    button.interText = text;
    text === '게임 시작' ? button.classList.remove('loading') : button.classList.add('loading');
}

37분까지