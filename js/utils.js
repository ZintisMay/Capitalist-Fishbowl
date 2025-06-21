export function updateMoney() {
  gameMoney.innerHTML = '$' + window.GAME_STATS.money;
  realMoney.innerHTML = '$' + window.GAME_STATS.realMoney;
}

const cache = {};

export function id(x) {
  if (cache[x]) return cache[x];
  const el = document.getElementById(x);
  cache[x] = el;
  return el;
}
