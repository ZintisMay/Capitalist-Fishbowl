import { warning } from './js/warning.js';
import { jumpAnimation } from './js/jumpAnimation.js';
import { displayStatusBars } from './js/displayStatusBars.js';
import { playerDies, playerLives } from './js/playerDies.js';

import { PLAYER } from './js/PLAYER.js';

const statusBars = document.getElementById('statusBars');
const purchaseBars = document.getElementById('purchaseBars');
const room = document.getElementById('room');
const realMoney = document.getElementById('realMoney');
const gameMoney = document.getElementById('gameMoney');
const warnings = document.getElementById('warnings');
const blackout = document.getElementById('blackout');

// furniture
const workButton = document.getElementById('workButton');
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
const TICK_INTERVAL = 1000;

setInterval(gameLoop, TICK_INTERVAL);

function gameLoop() {
  if (!isGameRunning) return;
  timer++;
  displayStatusBars(PLAYER.STATUS);
  for (let key in PLAYER.STATUS) {
    PLAYER.STATUS[key].updateThisStat();
    PLAYER.STATUS[key].warnPlayer();
  }

  purchaseBars.innerHTML = '';
  for (let key in PLAYER.PURCHASE) {
    const { cost, renderPurchaseButton, render } = PLAYER.PURCHASE[key];

    // @#$@#$ needs fixing
    renderPurchaseButton(key, purchaseBars);
  }
  console.log('timer', timer);
}

function incrementBills() {
  if (timer % 60 === 0) {
  }
}
workButton.addEventListener('click', function () {
  if (!isGameRunning) return;
  game$++;
  updateMoney();
  jumpAnimation();
});

function updateMoney() {
  gameMoney.innerHTML = '$' + game$;
  realMoney.innerHTML = '$' + real$;
}

function gameOver() {
  isGameRunning = false;
  playerDies();
}
