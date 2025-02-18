import { Howl } from "howler";

export const backgroundMusic = new Howl({
  src: ["/sounds/background.mp3"],
  loop: true,
  volume: 0.5,
});
export const crashSound = new Howl({ src: ["/sounds/crash.mp3"], volume: 1.0 });
export const collectSound = new Howl({
  src: ["/sounds/collect.mp3"],
  volume: 0.8,
});
