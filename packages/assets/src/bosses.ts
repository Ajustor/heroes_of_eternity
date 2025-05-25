export enum BOSSES_KEYS {
  Chaos = 'Chaos',
  Troll = 'Troll',
  DarkLord = 'DarkLord'
}

export const BOSSES = new Map(
  [
    [BOSSES_KEYS.Chaos, `assets/characters/boss1.png`],
    [BOSSES_KEYS.Troll, `assets/characters/boss2.png`],
    [BOSSES_KEYS.DarkLord, `assets/characters/boss3.png`],
  ]
)