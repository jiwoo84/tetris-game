// 변수
const DEFALUT_TIME = 10;
let words = [];
let time;
let isPlaying = false;
let score = 0;
// let timeInterval;
// let checkInterval;

let timeDisplay = document.querySelector(".time");
let button = document.querySelector(".button");
let wordDisplay = document.querySelector('.word-display');
let wordInput = document.querySelector(".word-input")
let scoreDisplay = document.querySelector(".score");
let popup = document.querySelector(".popup");

// 초기 세팅 함수
init()
function init() {
    getWords();
    timeDisplay.innerText = DEFALUT_TIME;
    wordInput.addEventListener('input', checkMatch);
}

// 게임 실행
function run() {
    isPlaying = true;
    time = DEFALUT_TIME;
    timeDisplay.innerText = time;
    wordInput.focus();
    score = 0;
    scoreDisplay.innerText = score;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('게임중');
}

// isPlaying(게임중 여부) 실시간 체크
function checkStatus() {
    if(!isPlaying && time === 0) {
        clearInterval(checkInterval);
        buttonChange('게임 시작');
    } 
}

// input Event: 단어 일치 체크 함수
function checkMatch() {
    // if(!isPlaying) return;
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = ''; // input 입력창 초기화
        if(!isPlaying) return;
        score ++; //  단어와 일치하면 획득점수 +1
        scoreDisplay.innerText = score;
        time = DEFALUT_TIME; // 시간 초기화
        timeDisplay.innerText = time;
        //  단어 랜덤으로 불러옴
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
        showPopup();
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
    text === "게임 시작" ? button.classList.remove('loading') : button.classList.add('loading');
}

// init 단어 랜덤으로 불러오는 함수
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

function showPopup() {
    if(!(score % 5) && score > 0) {
        popup.classList.remove("hidden");
    }
    else popup.classList.add("hidden");
}
