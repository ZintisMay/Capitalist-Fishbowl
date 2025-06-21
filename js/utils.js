export function updateMoney() {
  gameMoney.innerHTML = '$' + window.GAME_STATS.money;
  realMoney.innerHTML = '$' + window.GAME_STATS.realMoney;
}

const cache = {};
export function id(x) {
  return cache[x] || (cache[x] = document.getElementById(x));
}
