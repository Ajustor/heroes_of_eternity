export enum BACKGROUNDS_KEYS {
  Body = 'Body',
  Chaos = 'Chaos',
  Dark = 'Dark'
}

export const BACKGROUNDS = new Map([
  [BACKGROUNDS_KEYS.Body, [`assets/backgrounds/floor1.png`, `assets/backgrounds/wall1.png`]],
  [BACKGROUNDS_KEYS.Chaos, [`assets/backgrounds/floor2.png`, `assets/backgrounds/wall2.png`]],
  [BACKGROUNDS_KEYS.Dark, [`assets/backgrounds/floor3.png`, `assets/backgrounds/wall3.png`]],
])