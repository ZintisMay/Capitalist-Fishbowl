import { warning } from './warning.js';
import { id, displayPurchaseItems, updateMoney } from './utils.js';
import { playerDies, playerLives } from './playerDies.js';
import { displayStatusBars } from './displayStatusBars.js';

export const PLAYER = {
  updateStatus(stat, change) {
    // update, cap at 100
    PLAYER.STATUS[stat].balance += change;
    if (PLAYER.STATUS[stat].balance > 100) PLAYER.STATUS[stat].balance = 100;
    displayStatusBars(PLAYER.STATUS);
  },
  STATUS: {
    water: {
      balance: 100,
      color: 'blue',
      costPerSecond: 100 / 30,
      degrateThisStat() {
        this.balance -= this.costPerSecond;
      },
      warnPlayer() {
        if (this.balance <= 0) {
          gameOver('of dehydration');
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
      costPerSecond: 100 / 90,
      degrateThisStat() {
        this.balance -= this.costPerSecond;
      },
      warnPlayer() {
        if (this.balance <= 0) {
          gameOver('of hunger');
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
      costPerSecond: 100 / 180,
      degrateThisStat() {
        this.balance -= this.costPerSecond;
      },
      warnPlayer() {
        if (this.balance <= 0) {
          gameOver('of sleep deprivation');
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
      color: 'brown',
      costPerSecond: 100 / 180,
      degrateThisStat() {
        this.balance -= this.costPerSecond;
      },
      warnPlayer() {
        if (this.balance <= 0) {
          gameOver('from stress');
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
      costPerSecond: 100 / 600,
      degrateThisStat() {
        this.balance -= this.costPerSecond;
      },
      warnPlayer() {
        if (this.balance <= 0) {
          gameOver('from poor health');
        } else if (this.balance <= 15) {
          warning('You feel really unwell');
        } else if (this.balance <= 30) {
          warning('You feel unwell');
        } else {
        }
      },
    },
  },
  PURCHASE: {
    sink: {
      cost: 20,
      isPurchased: false,
      lastUsed: 0,
      cooldown: 0,
      targetEl: id('sink'),
      render,
      renderPurchaseButton,
      applyListener() {
        this.targetEl.addEventListener('mousedown', () => {
          if (wasUsedRecently(this)) return;
          PLAYER.updateStatus('water', 100);
          console.log(PLAYER.STATUS.water);
          this.lastUsed = new Date();
        });
      },
    },
    toilet: {
      cost: 30,
      isPurchased: false,
      lastUsed: 0,
      cooldown: 30,
      targetEl: id('toilet'),
      render,
      renderPurchaseButton,
      applyListener() {
        this.targetEl.addEventListener('mousedown', () => {
          if (wasUsedRecently(this)) return;
          PLAYER.updateStatus('stress', 30);
          this.lastUsed = new Date();
        });
      },
    },
    fridge: {
      cost: 40,
      isPurchased: false,
      lastUsed: 0,
      cooldown: 30,
      targetEl: id('fridge'),
      render,
      renderPurchaseButton,
      applyListener() {
        this.targetEl.addEventListener('mousedown', () => {
          if (wasUsedRecently(this)) return;
          PLAYER.updateStatus('food', 100);
          this.lastUsed = new Date();
        });
      },
    },
    shower: {
      cost: 50,
      isPurchased: false,
      lastUsed: 0,
      cooldown: 30,
      targetEl: id('shower'),
      render,
      renderPurchaseButton,
      applyListener() {
        this.targetEl.addEventListener('mousedown', () => {
          if (wasUsedRecently(this)) return;
          PLAYER.updateStatus('stress', 20);
          this.lastUsed = new Date();
        });
      },
    },
    bed: {
      cost: 60,
      isPurchased: false,
      lastUsed: 0,
      cooldown: 30,
      targetEl: id('bed'),
      render,
      renderPurchaseButton,
      applyListener() {
        this.targetEl.addEventListener('mousedown', () => {
          if (wasUsedRecently(this)) return;
          PLAYER.updateStatus('sleep', 50);
          this.lastUsed = new Date();
        });
      },
    },
    speakers: {
      cost: 75,
      isPurchased: false,
      lastUsed: 0,
      cooldown: 30,
      targetEl: id('speakers'),
      render,
      renderPurchaseButton,
      applyListener() {
        this.targetEl.addEventListener('mousedown', () => {
          if (wasUsedRecently(this)) return;
          PLAYER.updateStatus('stress', 15);
          this.lastUsed = new Date();
        });
      },
    },
    teevee: {
      cost: 100,
      isPurchased: false,
      lastUsed: 0,
      cooldown: 30,
      targetEl: id('teevee'),
      render,
      renderPurchaseButton,
      applyListener() {
        this.targetEl.addEventListener('mousedown', () => {
          if (wasUsedRecently(this)) return;
          PLAYER.updateStatus('stress', 15);
          this.lastUsed = new Date();
        });
      },
    },
  },
  BILLS: {
    rent: {
      name: 'rent',
      cost: 50,
      balance: 50,
      cooldown: 60,
      payBill() {
        this.balance += cost;
      },
      checkBill() {
        if (this.balance === 0) warning(`You must pay your rent`);
        if (this.balance < 0) {
          gameOver('You were evicted');
        }
      },
    },
    electric: {
      name: 'electric bill',
      cost: 50,
      balance: 50,
      cooldown: 60,
      payBill() {
        this.balance += cost;
      },
      checkBill() {
        if (this.balance === 0) warning(`You must pay your electric bill`);
        if (this.balance < 0) {
          warning(`Your electricity has been shut off`);
          id('blackout').style.display = 'block';
        } else {
          id('blackout').style.display = 'none';
        }
      },
    },
    heating: {
      name: 'heating bill',
      cost: 50,
      balance: 50,
      cooldown: 60,
      payBill() {
        this.balance += cost;
      },
      checkBill() {
        if (this.balance === 0) warning(`You must pay your ${this.name}`);
      },
    },
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

function gameOver(x) {
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

function wasUsedRecently(that) {
  let now = new Date();
  // was used in last 30 seconds?
  return now - that.lastUsed < 1000 * that.cooldown;
}
