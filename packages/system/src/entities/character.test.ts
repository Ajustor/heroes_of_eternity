import { Character } from './character'
import { JOBS } from '../constants/jobs'
import { CHARACTERS_KEYS } from '@hoe/assets'
import { test, expect, beforeEach, describe } from 'bun:test'

let character: Character

beforeEach(() => {
    character = new Character({
        id: '1',
        userId: 'user1',
        name: 'Test Character',
        level: 1,
        job: JOBS.FREELANCE,
        skin: CHARACTERS_KEYS.Claude,
        maxMana: 100,
        mana: 100,
        maxLife: 100,
        life: 100,
        intelligence: 10,
        strength: 10,
        agility: 10,
        dexterity: 10,
        experience: 0
    })
})

describe('Character', () => {
    describe('Stats Calculations', () => {
        test('calculateDamage should calculate damage based on strength and dexterity', () => {
            const damage = character.calculateDamage()
            expect(damage).toBeGreaterThanOrEqual(1)
            expect(damage).toBeLessThanOrEqual(22) // 2*strength + random(-2,2)
        })

        test('calculateDefense should calculate defense based on agility', () => {
            const defense = character.calculateDefense()
            expect(defense).toBe(15) // 1.5 * agility
        })

        test('calculateMagic should calculate magic based on intelligence', () => {
            const magic = character.calculateMagic()
            expect(magic).toBe(20) // 2 * intelligence
        })
    })

    describe('Leveling System', () => {
        test('xpToNextLevel should calculate XP needed for next level', () => {
            expect(character.xpToNextLevel()).toBe(100) // level * 100
        })

        test('canLevelUp should return true when enough XP', () => {
            character.experience = 100
            expect(character.canLevelUp()).toBe(true)
        })

        test('canLevelUp should return false when not enough XP', () => {
            character.experience = 99
            expect(character.canLevelUp()).toBe(false)
        })

        describe('levelUp', () => {
            test('should increase level and reset experience', () => {
                character.experience = 100
                const newChar = character.levelUp()
                expect(newChar.level).toBe(2)
                expect(newChar.experience).toBe(0)
            })

            test('should increase maxLife and life', () => {
                character.experience = 100
                const newChar = character.levelUp()
                expect(newChar.maxLife).toBe(110)
                expect(newChar.life).toBe(110)
            })

            test('should increase maxMana and mana', () => {
                character.experience = 100
                const newChar = character.levelUp()
                expect(newChar.maxMana).toBe(110)
                expect(newChar.mana).toBe(110)
            })

            test('should throw error when cannot level up', () => {
                character.experience = 99
                expect(() => character.levelUp()).toThrow('Character cannot level up')
            })
        })
    })

    describe('Resource Management', () => {
        test('takeDamage should reduce life when taking damage', () => {
            const newChar = character.takeDamage(20)
            expect(newChar.life).toBe(80)
        })

        test('takeDamage should not reduce life below 0', () => {
            const newChar = character.takeDamage(150)
            expect(newChar.life).toBe(0)
        })

        test('restoreLife should restore life up to maxLife', () => {
            character.life = 50
            const newChar = character.restoreLife(70)
            expect(newChar.life).toBe(100)
        })

        test('restoreMana should restore mana up to maxMana', () => {
            character.mana = 50
            const newChar = character.restoreMana(70)
            expect(newChar.mana).toBe(100)
        })
    })

    describe('Entity Conversion', () => {
        test('toEntity should convert character to entity', () => {
            const entity = character.toEntity()
            expect(entity).toEqual({
                id: '1',
                userId: 'user1',
                name: 'Test Character',
                level: 1,
                job: JOBS.FREELANCE,
                skin: CHARACTERS_KEYS.Claude,
                maxMana: 100,
                mana: 100,
                maxLife: 100,
                life: 100,
                intelligence: 10,
                strength: 10,
                agility: 10,
                dexterity: 10,
                experience: 0
            })
        })
    })
})
