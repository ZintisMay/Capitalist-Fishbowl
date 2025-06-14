const statusBars = document.getElementById('statusBars');
const purchaseBars = document.getElementById('purchaseBars');
const room = document.getElementById('room');
const workButton = document.getElementById('workButton');
const realMoney = document.getElementById('realMoney');
const gameMoney = document.getElementById('gameMoney');

let isGameRunning = true;
let timer = 0;
let game$ = 0;
let real$ = 0;

function gameLoop() {
  if (!isGameRunning) return;
  timer++;
  console.log('timer', timer);
}

setInterval(gameLoop, 1000);

workButton.addEventListener('click', function () {
  game$++;
  updateMoney();
});

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

const PLAYER_PAID = {};

const PLAYER_BILLS = {
  electric: 0,
  rent: 0,
  water: -1,
  doctor: -1,
  psychiatrist: -1,
  television: -1,
};
