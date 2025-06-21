import { warning } from './warning.js';
import { id } from './utils.js';
import { playerDies, playerLives } from './playerDies.js';
import { displayStatusBars } from './displayStatusBars.js';

export const PLAYER = {
  updateStatus(stat, change) {
    // update, cap at 100
    PLAYER.STATUS[stat].balance += change;
    if (PLAYER.STATUS[stat].balance > 100) PLAYER.STATUS[stat].balance = 100;
    displayStatusBars();
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
      costPerSecond: 100 / 90,
      degrateThisStat() {
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
      costPerSecond: 100 / 180,
      degrateThisStat() {
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
      costPerSecond: 100 / 180,
      degrateThisStat() {
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
      costPerSecond: 100 / 600,
      degrateThisStat() {
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
  PURCHASE: {
    toilet: {
      cost: 20,
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
    fridge: {
      cost: 20,
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
      cost: 20,
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
      cost: 20,
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
      cost: 50,
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
  // BILLS: {
  //   electric: {
  //     balance: 0,
  //     costPerWeek: 30,
  //     render,
  //   },
  //   rent: {
  //     balance: 0,
  //     costPerWeek: 150,
  //     render,
  //   },
  //   water: {
  //     balance: 0,
  //     costPerWeek: 30,
  //     render,
  //   },
  // },
};

function render() {
  this.targetEl.style.display = this.isPurchased ? 'block' : 'none';
}

function renderPurchaseButton(text, target) {
  if (this.isPurchased) return;
  if (window.GAME_STATS.money < this.cost) return;
  // @#$@#$ can refactor to a function, need to pass "this" to function
  const button = createPurchaseButton(text, this.cost);

  target.appendChild(button);
  const that = this;
  // @#$@#$ this and that aren't coming through correctly, need to move this function out and pass in the context
  button.addEventListener('click', function (e) {
    if (window.GAME_STATS.money > that.cost) {
      window.GAME_STATS.money -= that.cost;
      that.isPurchased = true;
      e.target.remove();
      that.render();
    }
  });
}

function createPurchaseButton(text, cost) {
  const el = document.createElement('div');
  el.classList.add('purchaseButton');
  el.innerHTML = `$${cost}: ${text}`;
  return el;
}

function gameOver() {
  GAME_STATS.isGameRunning = false;
  playerDies();
}

function wasUsedRecently(that) {
  let now = new Date();
  // was used in last 30 seconds?
  return now - that.lastUsed < 1000 * that.cooldown;
}
