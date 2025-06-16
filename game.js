const statusBars = document.getElementById('statusBars');
const purchaseBars = document.getElementById('purchaseBars');
const room = document.getElementById('room');
const workButton = document.getElementById('workButton');
const realMoney = document.getElementById('realMoney');
const gameMoney = document.getElementById('gameMoney');
const blackout = document.getElementById('blackout');
const bed = document.getElementById('bed');
const lightbulb = document.getElementById('lightbulb');
const shower = document.getElementById('shower');
const speakers = document.getElementById('speakers');
const teevee = document.getElementById('teevee');
const toilet = document.getElementById('toilet');
const sink = document.getElementById('sink');
const fridge = document.getElementById('fridge');
const person = document.getElementById('person');

let isGameRunning = true;
let timer = 0;
let game$ = 0;
let real$ = 0;
let jumpInterval = null;

function gameLoop() {
  if (!isGameRunning) return;
  timer++;
  checkBills();
  console.log('timer', timer);
}

function incrementBills() {
  if (timer % 60 === 0) {
  }
}

function checkBills() {
  // console.log(PLAYER_BILLS);
  if (PLAYER_BILLS.electric < 0) {
    blackout.style.display = 'block';
  } else {
    blackout.style.display = 'none';
  }
}

setInterval(gameLoop, 1000);

workButton.addEventListener('click', function () {
  game$++;
  updateMoney();
  if (!jumpInterval) {
    jumpInterval = jumpAnimation();
  }
});

function jumpAnimation() {
  let frame = 0;
  let direction = 1;
  return setInterval(() => {
    frame += direction;
    if (frame >= 10) direction = -1;
    if (frame < 0) {
      clearInterval(jumpInterval);
      jumpInterval = 0;
      return;
    }
    person.style.transform = `translateY(-${1 * frame}%)`;
  }, 10);
}

function updateMoney() {
  gameMoney.innerHTML = '$' + game$;
  realMoney.innerHTML = '$' + real$;
}

const STATUS = {
  water: 0,
  food: 0,
  sleep: 0,
  stress: 0,
  health: 0,
};

const STATUS_MODS_PER_TICK = {
  water: 100 / (3 * 60),
  food: 100 / (10 * 60),
  sleep: 100 / (5 * 60),
  health: 100 / (20 * 60),
  stress: 0,
};

const PLAYER_BILLS_COST = {
  electric: 0,
  rent: 0,
  water: -1,
  doctor: -1,
  psychiatrist: -1,
  television: -1,
};

const PLAYER_BILLS = {
  electric: 0,
  rent: 0,
  water: -1,
  doctor: -1,
  psychiatrist: -1,
  television: -1,
};
