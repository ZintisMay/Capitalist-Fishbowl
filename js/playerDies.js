export function playerDies() {
  const p = document.getElementById('person');
  p.style.transform = `translateY(50%) rotate(90deg) `;
}

export function playerLives() {
  const p = document.getElementById('person');
  p.style.transform = ``;
}
