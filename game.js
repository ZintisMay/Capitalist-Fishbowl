import { warning } from './js/warning.js';
import { jumpAnimation } from './js/jumpAnimation.js';
import { displayStatusBars } from './js/displayStatusBars.js';
import { playerDies, playerLives } from './js/playerDies.js';

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

const PLAYER = {
  STATUS: {
    water: {
      balance: 100,
      color: 'blue',
      costPerSecond: 100 / 60,
      updateThisStat() {
        this.balance -= this.costPerSecond;
      },
      warnPlayer() {
        if (this.balance <= 0) {
          gameOver();
        } else if (this.balance <= 15) {
          warning('You feel really thirsty');
        } else if (this.balance <= 30) {
          warning('You feel thirsty');
        } else {
        }
      },
    },
    food: {
      balance: 100,
      color: 'green',
      costPerSecond: 100 / 5 / 60,
      updateThisStat() {
        this.balance -= this.costPerSecond;
      },
      warnPlayer() {
        if (this.balance <= 0) {
          gameOver();
        } else if (this.balance <= 15) {
          warning('You feel really hungry');
        } else if (this.balance <= 30) {
          warning('You feel hungry');
        } else {
        }
      },
    },
    sleep: {
      balance: 100,
      color: 'purple',
      costPerSecond: 100 / 4 / 60,
      updateThisStat() {
        this.balance -= this.costPerSecond;
      },
      warnPlayer() {
        if (this.balance <= 0) {
          gameOver();
        } else if (this.balance <= 15) {
          warning('You feel really sleepy');
        } else if (this.balance <= 30) {
          warning('You feel sleepy');
        } else {
        }
      },
    },
    stress: {
      balance: 100,
      color: 'black',
      costPerSecond: 100 / 30 / 60,
      updateThisStat() {
        this.balance -= this.costPerSecond;
      },
      warnPlayer() {
        if (this.balance <= 0) {
          gameOver();
        } else if (this.balance <= 15) {
          warning('You feel really stressed');
        } else if (this.balance <= 30) {
          warning('You feel stressed');
        } else {
        }
      },
    },
    health: {
      balance: 100,
      color: 'red',
      costPerSecond: 100 / 40 / 60,
      updateThisStat() {
        this.balance -= this.costPerSecond;
      },
      warnPlayer() {
        if (this.balance <= 0) {
          gameOver();
        } else if (this.balance <= 15) {
          warning('You feel really unwell');
        } else if (this.balance <= 30) {
          warning('You feel unwell');
        } else {
        }
      },
    },
  },
  BILLS: {
    electric: {
      balance: 0,
      costPerWeek: 30,
      render() {
        electric.style.display = this.balance > 0 ? 'none' : 'block';
      },
    },
    rent: {
      balance: 0,
      costPerWeek: 150,
      render() {
        rent.style.display = this.balance > 0 ? 'none' : 'block';
      },
    },
    water: {
      balance: 0,
      costPerWeek: 30,
      render() {
        water.style.display = this.balance > 0 ? 'none' : 'block';
      },
    },
    toilet: {
      balance: 0,
      costPerWeek: 30,
      render() {
        toilet.style.display = this.balance > 0 ? 'none' : 'block';
      },
    },
    // doctor: {
    //   balance: 0,
    //   costPerWeek: 150,
    //   render() {
    //     doctor.style.display = this.balance > 0 ? 'none' : 'block';
    //   },
    // },
    // psychiatrist: {
    //   balance: 0,
    //   costPerWeek: 150,
    //   render() {
    //     psychiatrist.style.display = this.balance > 0 ? 'none' : 'block';
    //   },
    // },
    television: {
      balance: 0,
      costPerWeek: 25,
      render() {
        television.style.display = this.balance > 0 ? 'none' : 'block';
      },
    },
    music: {
      balance: 0,
      costPerWeek: 15,
      render() {
        speakers.style.display = this.balance > 0 ? 'none' : 'block';
      },
    },
  },
};
