/**
 * Generates a random number between min and max (inclusive)
 * @param min Minimum value
 * @param max Maximum value
 * @returns Random number
 */
export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random number with a normal distribution
 * @param mean Mean value
 * @param stdDev Standard deviation
 * @returns Random number
 */
export function randomNormal(mean: number = 0, stdDev: number = 1): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Conformity with Box-Muller transform
    while (v === 0) v = Math.random();
    
    const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return num * stdDev + mean;
}

/**
 * Generates a random number with a weighted distribution
 * @param weights Array of weights
 * @returns Index of selected weight
 */
export function randomWeighted(weights: number[]): number {
    const total = weights.reduce((acc, weight) => acc + weight, 0);
    const rand = Math.random() * total;
    let sum = 0;
    
    for (let i = 0; i < weights.length; i++) {
        sum += weights[i];
        if (rand < sum) return i;
    }
    
    return weights.length - 1;
}

/**
 * Generates a random number with a DnD distribution (3d6)
 * @returns Random number between 3 and 18
 */
export function roll3d6(): number {
    return randomInt(1, 6) + randomInt(1, 6) + randomInt(1, 6);
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
    ];
    const lowest = Math.min(...rolls);
    return rolls.reduce((acc, roll) => acc + roll, 0) - lowest;
}

/**
 * Generates a random number with an exponential distribution
 * @param lambda Lambda parameter of the distribution
 * @returns Random number
 */
export function randomExponential(lambda: number): number {
    return -Math.log(1 - Math.random()) / lambda;
}

/**
 * Generates a random number with a binomial distribution
 * @param n Number of trials
 * @param p Success probability
 * @returns Random number
 */
export function randomBinomial(n: number, p: number): number {
    let successes = 0;
    for (let i = 0; i < n; i++) {
        if (Math.random() < p) successes++;
    }
    return successes;
}