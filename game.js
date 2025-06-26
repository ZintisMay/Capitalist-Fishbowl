import { jumpAnimation } from './js/jumpAnimation.js';
import { displayStatusBars } from './js/displayStatusBars.js';
import { displayBills } from './js/displayBills.js';

import { PLAYER } from './js/PLAYER.js';

import { updateMoney, id, displayPurchaseItems } from './js/utils.js';

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

const GAME_STATS = {
  isGameRunning: true,
  timer: 0,
  money: 1000,
  realMoney: 0,
  tickInterval: 1000,
};
window.GAME_STATS = GAME_STATS;
setUpListeners();

setInterval(gameLoop, GAME_STATS.tickInterval);

function gameLoop() {
  if (!GAME_STATS.isGameRunning) return;
  GAME_STATS.timer++;
  displayStatusBars(PLAYER.STATUS);
  displayPurchaseItems(PLAYER.PURCHASE);
  displayBills(PLAYER.BILLS);

  // Your stats degrade over time
  for (let key in PLAYER.STATUS) {
    PLAYER.STATUS[key].degrateThisStat();
    PLAYER.STATUS[key].warnPlayer();
  }
  console.log('timer', GAME_STATS.timer);
}

id('workButton').addEventListener('click', function () {
  if (!GAME_STATS.isGameRunning) return;
  GAME_STATS.money++;
  jumpAnimation();
  updateMoney();
  displayPurchaseItems(PLAYER.PURCHASE);
});

function setUpListeners() {
  for (let key in PLAYER.PURCHASE) {
    const item = PLAYER.PURCHASE[key];
    console.log('key', key, item);
    item.applyListener();
  }
}
