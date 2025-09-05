export function updateMoney() {
  gameMoney.innerHTML = `$${window.GAME_STATS.money}`;
  moneyPerMinute.innerHTML = `(${Math.floor(
    (window.GAME_STATS.aggregateMoney / window.GAME_STATS.timer) * 60
  )} per min)`;
  realMoney.innerHTML = '$' + window.GAME_STATS.realMoney;
}

export function displayPurchaseItems(items) {
  id('purchaseBars').innerHTML = '';

  // purchaseable items become visible
  for (let key in items) {
    // @#$@#$ DO NOT DESTRUCTURE FUNCTIONS LOSE CONTEXT
    const item = items[key];
    // @#$@#$ needs fixing
    item.renderPurchaseButton(key, id('purchaseBars'), GAME_STATS.money);
  }
}

const idCache = {};
export function id(x) {
  return idCache[x] || (idCache[x] = document.getElementById(x));
}

export function rand(a, b) {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
