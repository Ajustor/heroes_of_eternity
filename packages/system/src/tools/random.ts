/**
 * Generates a random number between min and max (inclusive)
 * @param min Minimum value
 * @param max Maximum value
 * @returns Random number
 */
export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generates a random number with a DnD distribution (3d6)
 * @returns Random number between 3 and 18
 */
export function roll3d6(): number {
    return randomInt(1, 6) + randomInt(1, 6) + randomInt(1, 6)
}

/**
 * Generates a random number with a DnD distribution (4d6 drop lowest)
 * @returns Random number between 3 and 18
 */
export function roll4d6DropLowest(): number {
    const rolls = [
        randomInt(1, 6),
        randomInt(1, 6),
        randomInt(1, 6),
        randomInt(1, 6)
    ]
    const lowest = Math.min(...rolls)
    return rolls.reduce((acc, roll) => acc + roll, 0) - lowest
}

/**
 * Generates a random number with an exponential distribution
 * @param lambda Lambda parameter of the distribution
 * @returns Random number
 */
export function randomExponential(lambda: number): number {
    return -Math.log(1 - Math.random()) / lambda
}

/**
 * Generates a random number with a binomial distribution
 * @param n Number of trials
 * @param p Success probability
 * @returns Random number
 */
export function randomBinomial(n: number, p: number): number {
    let successes = 0
    for (let i = 0; i < n; i++) {
        if (Math.random() < p) {
            successes++
        }
    }
    return successes
}