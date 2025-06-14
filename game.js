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
