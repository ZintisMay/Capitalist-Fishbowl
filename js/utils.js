export function updateMoney() {
  gameMoney.innerHTML = '$' + window.GAME_STATS.money;
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

const cache = {};
export function id(x) {
  return cache[x] || (cache[x] = document.getElementById(x));
}
