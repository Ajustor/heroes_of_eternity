import { randomInt, roll3d6, roll4d6DropLowest } from './random'
import { test, expect, describe } from 'bun:test'

describe('random', () => {
    describe('randomInt', () => {
        test('should generate a number within the specified range', () => {
            const min = 1
            const max = 10
            const result = randomInt(min, max)
            expect(result).toBeGreaterThanOrEqual(min)
            expect(result).toBeLessThanOrEqual(max)
        })

        test('should include both min and max in the range', () => {
            const min = 1
            const max = 1
            const result = randomInt(min, max)
            expect(result).toBe(min)
        })
    })

    describe('roll3d6', () => {
        test('should generate a number between 3 and 18', () => {
            const result = roll3d6()
            expect(result).toBeGreaterThanOrEqual(3)
            expect(result).toBeLessThanOrEqual(18)
        })
    })

    describe('roll4d6DropLowest', () => {
        test('should generate a number between 3 and 18', () => {
            const result = roll4d6DropLowest()
            expect(result).toBeGreaterThanOrEqual(3)
            expect(result).toBeLessThanOrEqual(18)
        })
    })
})
