import { randomInt } from '../tools/random'
import type { BeastEntity } from '@hoe/db'

export class Beast {
    private id: string
    private name: string
    private maxMana: number
    private mana: number
    private maxLife: number
    private life: number
    private intelligence: number
    private strength: number
    private agility: number
    private dexterity: number
    private experience: number

    constructor(data: BeastEntity) {
        this.id = data.id
        this.name = data.name
        this.maxMana = data.maxMana
        this.mana = data.maxMana
        this.maxLife = data.maxLife
        this.life = data.maxLife
        this.intelligence = data.intelligence
        this.strength = data.strength
        this.agility = data.agility
        this.dexterity = data.dexterity
        this.experience = data.experience ?? 0
    }

    /**
     * Calcule les dégâts basés sur la force et la dextérité
     * @returns Dégâts calculés
     */
    calculateDamage(): number {
        const baseDamage = this.strength * 2
        const modifier = randomInt(-2, 2) // Modificateur aléatoire
        return Math.max(1, baseDamage + modifier)
    }

    /**
     * Calcule la défense basée sur l'agilité
     * @returns Défense calculée
     */
    calculateDefense(): number {
        return this.agility * 1.5
    }

    /**
     * Calcule la magie basée sur l'intelligence
     * @returns Magie calculée
     */
    calculateMagic(): number {
        return this.intelligence * 2
    }

    /**
     * Prend des dégâts
     * @param damage Dégâts subis
     * @returns Bête mise à jour
     */
    takeDamage(damage: number): Beast {
        const newLife = Math.max(0, this.maxLife - damage)
        return new Beast({
            ...this,
            life: newLife
        })
    }

    /**
     * Restaure la vie
     * @param amount Montant à restaurer
     * @returns Bête mise à jour
     */
    restoreLife(amount: number): Beast {
        const newLife = Math.min(this.maxLife, this.life + amount)
        return new Beast({
            ...this,
            life: newLife
        })
    }

    /**
     * Restaure la mana
     * @param amount Montant à restaurer
     * @returns Bête mise à jour
     */
    restoreMana(amount: number): Beast {
        const newMana = Math.min(this.maxMana, this.mana + amount)
        return new Beast({
            ...this,
            mana: newMana
        })
    }
}
