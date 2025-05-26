export enum BOSSES_KEYS {
  Chaos = 'Chaos',
  Troll = 'Troll',
  DarkLord = 'DarkLord'
}

export const BOSSES = new Map(
  [
    [BOSSES_KEYS.Chaos, `assets/bosses/boss1.png`],
    [BOSSES_KEYS.Troll, `assets/bosses/boss2.png`],
    [BOSSES_KEYS.DarkLord, `assets/bosses/boss3.png`],
  ]
)