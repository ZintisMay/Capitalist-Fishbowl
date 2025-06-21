import { id } from './utils.js';
export function playerDies() {
  const p = id('person');
  p.style.transform = `translateY(50%) rotate(90deg) `;
}

export function playerLives() {
  const p = id('person');
  p.style.transform = ``;
}
