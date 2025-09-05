import { warning } from './warning.js';
import { id, displayPurchaseItems, updateMoney } from './utils.js';
import { playerDies, playerLives } from './playerDies.js';
import { displayStatusBars } from './displayStatusBars.js';
import { playAudio } from './playAudio.js';

// setInterval(() => console.log(PLAYER), 5000);

export const PLAYER = {
  updateStatus(stat, change) {
    // update, cap at 100
    PLAYER.STATUS[stat].balance += change;
    if (PLAYER.STATUS[stat].balance > 100) PLAYER.STATUS[stat].balance = 100;
    displayStatusBars(PLAYER.STATUS);
  },
  STATUS: {
    water: createStatus(
      'blue',
      30,
      'You feel thirsty',
      'You feel really thirsty',
      'of dehydration'
    ),
    food: createStatus(
      'green',
      45,
      'You feel hungry',
      'You feel really hungry',
      'of hunger'
    ),
    gottaPee: createStatus(
      'gold',
      60,
      'You have to pee',
      'You really have to pee',
      'of holding it in too long'
    ),
    sleep: createStatus(
      'purple',
      75,
      'You feel sleepy',
      'You feel really sleepy',
      'of sleep deprivation'
    ),
    hygeine: createStatus(
      'orange',
      90,
      'You smell a little',
      'You smell pretty bad',
      'of stinkiness'
    ),
    boredom: createStatus(
      'aqua',
      105,
      'You are a little bored',
      'You are really bored',
      'of boredom'
    ),
    stress: createStatus(
      'brown',
      120,
      'You feel stressed',
      'You feel really stressed',
      'of stress'
    ),
    health: createStatus(
      'red',
      135,
      'You feel sick',
      'You feel really sick',
      'of a preventable illness'
    ),
  },
  PURCHASE: {
    sink: {
      cost: 20,
      isPurchased: false,
      targetEl: id('sink'),
      render,
      renderPurchaseButton,
      applyListener() {
        this.targetEl.addEventListener('mousedown', () => {
          PLAYER.updateStatus('water', 100);
        });
      },
    },
    fridge: {
      cost: 30,
      isPurchased: false,
      targetEl: id('fridge'),
      render,
      renderPurchaseButton,
      applyListener() {
        this.targetEl.addEventListener('mousedown', () => {
          PLAYER.updateStatus('food', 100);
        });
      },
    },
    toilet: {
      cost: 40,
      isPurchased: false,
      targetEl: id('toilet'),
      render,
      renderPurchaseButton,
      applyListener() {
        this.targetEl.addEventListener('mousedown', () => {
          PLAYER.updateStatus('gottaPee', 100);
        });
      },
    },
    bed: {
      cost: 50,
      isPurchased: false,
      targetEl: id('bed'),
      render,
      renderPurchaseButton,
      applyListener() {
        this.targetEl.addEventListener('mousedown', () => {
          PLAYER.updateStatus('sleep', 100);
        });
      },
    },
    shower: {
      cost: 60,
      isPurchased: false,
      targetEl: id('shower'),
      render,
      renderPurchaseButton,
      applyListener() {
        this.targetEl.addEventListener('mousedown', () => {
          PLAYER.updateStatus('hygeine', 100);
        });
      },
    },
    teevee: {
      cost: 70,
      isPurchased: false,
      targetEl: id('teevee'),
      isPlaying: false,
      render,
      renderPurchaseButton,
      applyListener() {
        this.targetEl.addEventListener('mousedown', () => {
          PLAYER.updateStatus('boredom', 100);
        });
      },
    },
    speakers: {
      cost: 80,
      isPurchased: false,
      targetEl: id('speakers'),
      isPlaying: false,
      render,
      renderPurchaseButton,
      applyListener() {
        this.targetEl.addEventListener('mousedown', () => {
          PLAYER.updateStatus('stress', 100);
        });
      },
    },
  },
  BILLS: {
    rent: {
      gameOverMessage: 'evicted from your room',
      name: 'rent',
      cost: 50,
      balance: 50,
      cooldown: 60,
      payBill() {
        this.balance += this.cost;
      },
      checkBill() {
        if (this.balance === 0) warning(`You must pay your rent`);
        if (this.balance < 0) {
          const allImages = id('room').querySelectorAll('*');
          // hide everything but work
          for (let img of allImages) {
            if (img.id === 'person') continue;
            img.style.display = 'none';
          }
        } else {
          const allImages = id('room').querySelectorAll('*');
          // hide everything but work
          for (let img of allImages) {
            if (img.id === 'person') continue;
            img.style.display = 'block';
          }
        }
      },
    },
    electric: {
      gameOverMessage: 'cant work in the dark',
      name: 'electric bill',
      cost: 50,
      balance: 50,
      cooldown: 60,
      payBill() {
        this.balance += this.cost;
        id('blackout').style.display = 'none';
      },
      checkBill() {
        if (this.balance === 0) warning(`You must pay your electric bill`);
        if (this.balance <= 0) {
          warning(`Your electricity has been shut off`);
          id('blackout').style.display = 'block';
        }
      },
    },
    // heating: {
    //   gameOverMessage: 'from the cold',
    //   name: 'heating bill',
    //   cost: 50,
    //   balance: 50,
    //   cooldown: 60,
    //   payBill() {
    //     this.balance += this.cost;
    //   },
    //   checkBill() {
    //     if (this.balance === 0) warning(`You must pay your ${this.name}`);
    //   },
    // },
  },
};

function render() {
  this.targetEl.style.display = this.isPurchased ? 'block' : 'none';
}

function renderPurchaseButton(text, target) {
  if (this.isPurchased) return;
  if (window.GAME_STATS.money < this.cost) return;
  // @#$@#$ can refactor to a function, need to pass "this" to function
  const button = createPurchaseButton(text, this.cost);
  button.classList.add('pay');

  target.appendChild(button);
  const that = this;
  // @#$@#$ this and that aren't coming through correctly, need to move this function out and pass in the context
  button.addEventListener('click', function (e) {
    if (window.GAME_STATS.money >= that.cost) {
      window.GAME_STATS.money -= that.cost;
      that.isPurchased = true;
      e.target.remove();
      that.render();
      displayPurchaseItems(PLAYER.PURCHASE);
      updateMoney();
    }
  });
}

function createPurchaseButton(text, cost) {
  const el = document.createElement('div');
  el.classList.add('purchaseButton');
  el.innerHTML = `$${cost}: ${text}`;
  return el;
}

export function gameOver(x) {
  playAudio('youDied');
  GAME_STATS.isGameRunning = false;
  const blackoutLayer = id('blackout');
  blackoutLayer.style.display = 'flex';
  blackoutLayer.style.zIndex = 1000000;
  blackoutLayer.innerHTML = `<div>YOU DIED<p style="font-size: 30px;">${x}</p></div>`;

  ['statusBars', 'bills', 'gameMoney', 'warnings', 'purchaseBars'].forEach(
    (item) => (id(item).style.display = 'none')
  );

  playerDies();
}

function createStatus(color, timeDegredation, warn1, warn2, loseMessage) {
  return {
    balance: 100,
    color,
    costPerSecond: 100 / timeDegredation,
    warn1,
    warn2,
    loseMessage,
    degrateThisStat() {
      this.balance -= this.costPerSecond;
    },
    warnPlayer() {
      if (this.balance <= 0) {
        gameOver(loseMessage);
      } else if (this.balance <= 15) {
        warning(warn2);
      } else if (this.balance <= 30) {
        warning(warn1);
      } else {
      }
    },
  };
}
