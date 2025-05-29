export enum BEASTS_KEYS {
  Bat = 'Bat',
  Rat = 'Rat',
  Skeleton = 'Skeleton',
  Slime = 'Slime',
  Snake = 'Snake',
  Soldier = 'Soldier',
  Spider = 'Spider',
}

export const BEASTS = new Map(
  [
    [BEASTS_KEYS.Bat, `assets/beasts/Bat.png`],
    [BEASTS_KEYS.Rat, `assets/beasts/Rat.png`],
    [BEASTS_KEYS.Skeleton, `assets/beasts/Skeleton.png`],
    [BEASTS_KEYS.Slime, `assets/beasts/Slime.png`],
    [BEASTS_KEYS.Snake, `assets/beasts/Snake.png`],
    [BEASTS_KEYS.Soldier, `assets/beasts/Soldier.png`],
    [BEASTS_KEYS.Spider, `assets/beasts/Spider.png`],
  ]
)