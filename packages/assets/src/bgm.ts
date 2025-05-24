export enum BGM_KEYS {
  Battle = 'Battle',
  GameOver = 'GameOver',
  Victory = 'Victory'
}

export const BGM = new Map([
  [BGM_KEYS.Battle, `assets/bgm/Battle.m4a`],
  [BGM_KEYS.GameOver, `assets/bgm/Gameover.m4a`],
  [BGM_KEYS.Victory, `assets/bgm/Victory2.m4a`]
])