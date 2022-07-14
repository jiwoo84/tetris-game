// DOM
const playground = document.querySelector(".playground > ul");

// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// variables
let score = 0;
let duration = 500; // 블록 떨어지는 시간
let downInterval;
let tempMovingItem; // 옮길 위치 임시 저장

const BLOCKS = {
  // 블럭 모양이 담긴 2차원 배열
  tree: [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [],
    [],
    [],
  ],
};

const movingItem = {
  // 옮기는 위치 저장
  type: "tree",
  direction: 0,
  top: 0,
  left: 0,
};

init(); // 시작시 배경 만들어짐

// functions
// 시작 함수
function init() {
  tempMovingItem = { ...movingItem }; // 바뀐 위치 값만 저장
  for (let i = 0; i < 20; i++) {
    prependNewLine();
  }
  renderBlocks();
}

// 배경 모눈 만드는 함수
function prependNewLine() {
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  playground.appendChild(li);
  for (let j = 0; j < 10; j++) {
    const matrix = document.createElement("li");
    ul.prepend(matrix); // ul 안에 li 10개 넣기
  }
  li.prepend(ul); // ul을 li에 추가
  playground.prepend(li); // li를 html에 추가
}

// 블럭 그리는 함수
function renderBlocks() {
  const { type, direction, top, left } = tempMovingItem;
  BLOCKS[type][direction].forEach((block) => {
    const x = block[0];
    const y = block[1];
    const target = playground.childNodes[y].childNodes[0].childNodes[x];
    console.log(target);
  });
}
