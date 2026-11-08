// Based on mulberry32, source: https://stackoverflow.com/a/47593316
// Posted by bryc, modified by community. Retrieved 2026-11-06, License: CC BY-SA 4.0
// Adapted: rewritten as a TypeScript class, state kept in 32-bit range, added range()

/**
 * Seeded pseudo-random number generator (PRNG) based on mulberry32.
 *
 * Math.random() can't be given a seed, so every run would produce different
 * values. This generator always returns the same sequence for the same seed,
 * which keeps the test scenario identical across runs and variants.
 */
export class SeededRandom {
    private state: number;
    
    constructor(seed: number) {
        this.state = seed >>> 0;
    }

    /** Returns the next pseudo-random number in the range [0, 1). */
    next(): number {
        this.state = (this.state + 0x6d2b79f5) >>> 0;
        let t = this.state;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    
    /** Returns a pseudo-random number in the range [min, max). */
    range(min: number, max: number): number {
        return min + this.next() * (max - min);
    }
}