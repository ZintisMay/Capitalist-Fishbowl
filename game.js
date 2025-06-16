import { warning } from './js/warning.js';

const statusBars = document.getElementById('statusBars');
const purchaseBars = document.getElementById('purchaseBars');
const room = document.getElementById('room');
const workButton = document.getElementById('workButton');
const realMoney = document.getElementById('realMoney');
const gameMoney = document.getElementById('gameMoney');
const warnings = document.getElementById('warnings');
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

function updateBills() {}

setInterval(gameLoop, 1000);

workButton.addEventListener('click', function () {
  game$++;
  updateMoney();
  warning('hi');
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

function gameOver() {
  alert('Game Over');
}

const STATUS = {
  water: {
    balance: 0,
    costPerSecond: 0,
    warnPlayer() {
      if (this.balance <= 0) {
      } else if (this.balance <= 20) {
      } else {
      }
    },
  },
  food: {
    balance: 0,
    costPerSecond: 0,
    warnPlayer() {
      if (this.balance <= 0) {
        gameOver();
      } else if (this.balance <= 20) {
      } else {
      }
    },
  },
  sleep: {
    balance: 0,
    costPerSecond: 0,
    warnPlayer() {
      if (this.balance <= 0) {
        gameOver();
      } else if (this.balance <= 20) {
      } else {
      }
    },
  },
  stress: {
    balance: 0,
    costPerSecond: 0,
    warnPlayer() {
      if (this.balance <= 0) {
        gameOver();
      } else if (this.balance <= 20) {
      } else {
      }
    },
  },
  health: {
    balance: 0,
    costPerSecond: 0,
    warnPlayer() {
      if (this.balance <= 0) {
        gameOver();
      } else if (this.balance <= 20) {
      } else {
      }
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
      costPerWeek: 20,
      render() {
        water.style.display = this.balance > 0 ? 'none' : 'block';
      },
    },
    toilet: {
      balance: 0,
      costPerWeek: 20,
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
