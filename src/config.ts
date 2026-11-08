/**
 * Scenario configuration read from the URL e.g. '?variant=baseline&count=1000&seed=42'.
 */

const VARIANTS = ['baseline'] as const;
export type VariantName = (typeof VARIANTS)[number];

export interface ScenarioConfig {
    //Which implementation runs
    variant: VariantName;
    //Target number
    count: number;
    //Seed for RNG
    seed: number;
    //Show stats on screen
    hud: boolean;
}

const DEFAULTS: ScenarioConfig = {
    variant: 'baseline',
    count: 1000,
    seed: 42,
    hud: true,
};

/**
 * Reads config from the URL and falls back to defaults if missing or invalid.
 * Unknown variant throws an error, so typos can't silently measure the wrong variant.
 */
export function parseConfig(search: string): ScenarioConfig {
    const params = new URLSearchParams(search);
    
    const variant = params.get('variant');
    if (variant !== null && !(VARIANTS as readonly string[]).includes(variant)) {
        throw new Error(`Unknown variant "${variant}". Available: ${VARIANTS.join(', ')}`);
    }

    const count = Number(params.get('count'));
    const seedParam = params.get('seed');
    const seed = seedParam === null ? NaN : Number(seedParam);
    
    return {
        variant: (variant as VariantName | null) ?? DEFAULTS.variant,
        count: Number.isInteger(count) && count > 0 ? count : DEFAULTS.count,
        seed: Number.isInteger(seed) ? seed : DEFAULTS.seed,
        hud: params.get('hud') !== '0',
    };
}