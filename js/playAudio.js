import { rand } from './utils.js';
const AUDIO = {
  youDied: new Audio('./sounds/youDied.mp3'),
  typewriter1: new Audio('./sounds/typewriter1.mp3'),
  typewriter2: new Audio('./sounds/typewriter2.mp3'),
  typewriter3: new Audio('./sounds/typewriter3.mp3'),
};

export function keyAudio() {
  const val = rand(1, 3);
  const fileName = `./sounds/typewriter${rand(1, 3)}.mp3`;
  const a = new Audio(fileName);
  a.play();
}

export function playAudio(x) {
  const a = new Audio(`./sounds/${x}.mp3`);
  a.play();
}
