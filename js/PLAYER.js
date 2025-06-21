import { warning } from './warning.js';
import { id } from './utils.js';

export const PLAYER = {
  STATUS: {
    water: {
      balance: 100,
      color: 'blue',
      costPerSecond: 100 / 30,
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
  PURCHASE: {
    toilet: {
      cost: 20,
      isPurchased: false,
      renderPurchaseButton,
      render() {
        id('toilet').style.display = this.isPurchased ? 'block' : 'none';
      },
    },
    sink: {
      cost: 20,
      isPurchased: false,
      renderPurchaseButton,
      render() {
        id('sink').style.display = this.isPurchased ? 'block' : 'none';
      },
    },
    fridge: {
      cost: 20,
      isPurchased: false,
      renderPurchaseButton,
      render() {
        id('fridge').style.display = this.isPurchased ? 'block' : 'none';
      },
    },
    shower: {
      cost: 20,
      isPurchased: false,
      renderPurchaseButton,
      render() {
        id('shower').style.display = this.isPurchased ? 'block' : 'none';
      },
    },
    bed: {
      cost: 20,
      isPurchased: false,
      renderPurchaseButton,
      render() {
        id('bed').style.display = this.isPurchased ? 'block' : 'none';
      },
    },
    teevee: {
      cost: 100,
      isPurchased: false,
      renderPurchaseButton,
      render() {
        id('teevee').style.display = this.isPurchased ? 'block' : 'none';
      },
    },
    speakers: {
      cost: 50,
      isPurchased: false,
      renderPurchaseButton,
      render() {
        id('speakers').style.display = this.isPurchased ? 'block' : 'none';
      },
    },
  },
  BILLS: {
    electric: {
      balance: 0,
      costPerWeek: 30,
      render() {
        electric.style.display = this.isPurchased ? 'block' : 'none';
      },
    },
    rent: {
      balance: 0,
      costPerWeek: 150,
      render() {
        rent.style.display = this.isPurchased ? 'block' : 'none';
      },
    },
    water: {
      balance: 0,
      costPerWeek: 30,
      render() {
        water.style.display = this.isPurchased ? 'block' : 'none';
      },
    },
  },
};

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
