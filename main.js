// 변수
const DEFALUT_TIME = 3;
let words = [];
let time;
let isPlaying = false;
let score = 0;
let timeInterval;
let checkInterval;

let timeDisplay = document.querySelector(".time");
let button = document.querySelector(".button");
let wordDisplay = document.querySelector('.word-display');
let wordInput = document.querySelector(".word-input")
let scoreDisplay = document.querySelector(".score");

// 초기 세팅 함수
init()
function init() {
    buttonChange('loading...')
    getWords();
    wordInput.addEventListener('input', checkMatch);
    button.addEventListener('click', buttonChange);
}

// 게임 실행
function run() {
    if(isPlaying) return;
    isPlaying = true;
    time = DEFALUT_TIME;
    wordInput.focus();
    score = 0;
    scoreDisplay.innerText = score; 
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('게임중');
}

function checkStatus() {
    if(!isPlaying && time === 0) {
        buttonChange('게임 시작');
        clearInterval(checkInterval);
    } 
}

// 단어 랜덤으로 불러오는 함수
function getWords() {
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
    .then(function (response) {
        response.data.forEach((word) => {
            if(word.length < 10) words.push(word); 
        })
        buttonChange('게임 시작');
    })
        .catch(function (error) {
            console.log(error);
        })
}

// 단어 일치 체크 함수
function checkMatch() {
    // if(!isPlaying) return;
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = ''; // 단어 초기화
        if(!isPlaying) return;
        score ++; //  단어와 일치하면 획득점수 +1
        scoreDisplay.innerText = score;
        // time = DEFALUT_TIME;
        //  단어 랜덤으로 불러옴
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}

// 시간 흐르는 함수
function countDown() {
    time > 0 ? time-- : isPlaying = false; // 게임 종료되면 종료
    if(!isPlaying) clearInterval(timeInterval);
    timeDisplay.innerText = time;
}

// 버튼 누르면 실행되는 함수
function buttonChange(text) { 
    button.innerText = text;
    text === "게임 시작" ? button.classList.remove('loading') : button.classList.add("loading");
}
