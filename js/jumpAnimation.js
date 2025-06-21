import { id } from './utils.js';

let jumpInterval = null;
export function jumpAnimation() {
  if (jumpInterval) return;
  let frame = 0;
  let direction = 1;
  return setInterval(() => {
    frame += direction;
    if (frame >= 10) direction = -1;
    if (frame < 0) {
      clearInterval(jumpInterval);
      return;
    }
    id('person').style.transform = `translateY(-${1 * frame}%)`;
  }, 10);
}
