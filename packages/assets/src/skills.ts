export enum SKILLS_KEYS {
    HEAL = 'Heal',
    BLOW = 'Blow',
    DARKNESS = 'Darkness'
}

export const SKILLS = new Map(
    [
        [SKILLS_KEYS.HEAL, `assets/skills/Heal.png`],
        [SKILLS_KEYS.BLOW, `assets/skills/Blow.png`],
        [SKILLS_KEYS.DARKNESS, `assets/skills/Darkness.png`],
    ]
)