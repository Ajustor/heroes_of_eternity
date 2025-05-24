import { randomInt } from '../tools/random'
import { JOBS } from '../constants/jobs'
import { CHARACTERS_KEYS } from '@hoe/assets'
import type { CharacterEntity } from '@hoe/db'

export class Character {
    private id: string
    private userId: string
    private name: string
    private level: number
    private job: JOBS
    private skin: CHARACTERS_KEYS
    private maxMana: number
    private mana: number
    private maxLife: number
    private life: number
    private intelligence: number
    private strength: number
    private agility: number
    private dexterity: number
    private experience: number

    constructor(data: CharacterEntity) {
        this.id = data.id
        this.userId = data.userId
        this.name = data.name
        this.level = data.level
        this.job = data.job
        this.skin = data.skin
        this.maxMana = data.maxMana
        this.mana = data.mana
        this.maxLife = data.maxLife
        this.life = data.life
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
     * Calcule l'expérience nécessaire pour le prochain niveau
     * @returns XP nécessaire
     */
    xpToNextLevel(): number {
        return this.level * 100
    }

    /**
     * Vérifie si le personnage peut monter de niveau
     * @returns true si le personnage peut monter de niveau
     */
    canLevelUp(): boolean {
        return this.experience >= this.xpToNextLevel()
    }

    /**
     * Monte le niveau du personnage
     * @returns Personnage mis à jour
     */
    levelUp(): Character {
        if (!this.canLevelUp()) {
            throw new Error('Character cannot level up')
        }

        return new Character({
            ...this,
            level: this.level + 1,
            experience: 0,
            maxLife: Math.floor(this.maxLife * 1.1),
            maxMana: Math.floor(this.maxMana * 1.1),
            life: Math.floor(this.maxLife * 1.1),
            mana: Math.floor(this.maxMana * 1.1)
        })
    }

    /**
     * Transforme l'entité en entité de base de données
     * @returns Objet compatible avec le schéma de la base de données
     */
    toEntity(): CharacterEntity {
        return {
            id: this.id,
            userId: this.userId,
            name: this.name,
            level: this.level,
            job: this.job,
            skin: this.skin,
            maxMana: this.maxMana,
            mana: this.mana,
            maxLife: this.maxLife,
            life: this.life,
            intelligence: this.intelligence,
            strength: this.strength,
            agility: this.agility,
            dexterity: this.dexterity,
            experience: this.experience
        }
    }

    /**
     * Prend des dégâts
     * @param damage Dégâts subis
     * @returns Personnage mis à jour
     */
    takeDamage(damage: number): Character {
        const newLife = Math.max(0, this.life - damage)
        return new Character({
            ...this,
            life: newLife
        })
    }

    /**
     * Restaure la vie
     * @param amount Montant à restaurer
     * @returns Personnage mis à jour
     */
    restoreLife(amount: number): Character {
        const newLife = Math.min(this.maxLife, this.life + amount)
        return new Character({
            ...this,
            life: newLife
        })
    }

    /**
     * Restaure la mana
     * @param amount Montant à restaurer
     * @returns Personnage mis à jour
     */
    restoreMana(amount: number): Character {
        const newMana = Math.min(this.maxMana, this.mana + amount)
        return new Character({
            ...this,
            mana: newMana
        })
    }
}
