// 몇 수 째인지 세어 줄 변수
let cnt = 0;
let arr = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
];

//승패검사 함수
function checkWin(bw) {
    //좌우승패
    for(let i=0; i<15; i++) {
        for(let j=0; j<11; j++) {
            if(arr[i][j] === bw && arr[i][j+1] === bw && arr[i][j+2] === bw && arr[i][j+3] === bw && arr[i][j+4] === bw) {
                console.log('수평승!');
                return true;
            }
        }
    }
    //상하승패
    for(let i=0; i<11; i++) {
        for(let j=0; j<15; j++) {
            if(arr[i][j] === bw && arr[i+1][j] === bw && arr[i+2][j] === bw && arr[i+3][j] === bw && arr[i+4][j] === bw) {
                console.log('수직승!');
                return true;
            }
        }
    }
    //대각선오른쪽아래방향승패
    for(let i=0; i<11; i++) {
        for(let j=0; j<11; j++) {
            if(arr[i][j] === bw && arr[i+1][j+1] === bw && arr[i+2][j+2] === bw && arr[i+3][j+3] === bw && arr[i+4][j+4] === bw) {
                console.log('오른쪽아래승!');
                return true;
            }
        }
    }
    //대각선왼쪽아래방향승패
    for(let i=0; i<11; i++) {
        for(let j=5; j<=15; j++) {
            if(arr[i][j] === bw && arr[i+1][j-1] === bw && arr[i+2][j-2] === bw && arr[i+3][j-3] === bw && arr[i+4][j-4] === bw) {
                console.log('왼쪽아래승!');
                return true;
            }
        }
    }
}

// 칸 클릭 시 이벤트
const $main = document.querySelector('.main');
$main.addEventListener('click', e => {
    if (!e.target.matches('.main div')) return; //이벤트 전파
    if (e.target.classList.contains('stone1') || e.target.classList.contains('stone0')) return; //이미 돌이 놓여져있으면 리턴

    cnt++;
    // 클래스에 stone1, 0 추가와 이미지 삽입
    e.target.innerHTML += `<img src="./img/stone${cnt%2}.png" alt="stone">`;
    e.target.classList.add(`stone${cnt%2}`);

    //오목 소리
    let sound = document.getElementById('omok_sound');
    sound.volume = 1;
    sound.play();

    // 배열의 값 변경
    arr[e.target.dataset.y][e.target.dataset.x] = cnt % 2;

    // 승패검사
    if (checkWin(cnt % 2)) {
        if(cnt%2 === 1) {
        alert('흑돌 승리!');
        } else {
            alert('백돌 승리!');
        }
    }
});

// 게임시작버튼 이벤트
const $gameStart = document.getElementById('game-start');
$gameStart.addEventListener('click', e => {
    document.querySelector('.main').classList.remove('opac'); //판 투명도 제거
    document.querySelector('.start').classList.add('hide'); // 시작메뉴 제거
});

// 게임설명버튼 이벤트
const $explainBtn = document.getElementById('explain-btn');
$explainBtn.addEventListener('click', () => {
    document.getElementById('explain').classList.remove('hide');
});

// 설명창 닫기 버튼 이벤트
const $closeBtn = document.querySelector('.close-btn');
$closeBtn.addEventListener('click', () => {
    document.getElementById('explain').classList.add('hide');
});

