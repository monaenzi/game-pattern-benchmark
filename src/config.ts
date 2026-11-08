/**
 * Scenario configuration read from the URL e.g. '?variant=baseline&count=1000&seed=42'.
 */
export type VariantName = 'baseline';

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

const VARIANTS: readonly VariantName[] = ['baseline'];

const DEFAULTS: ScenarioConfig = {
    variant: 'baseline',
    count: 1000,
    seed: 42,
    hud: true,
};

/** Reads config from the URL and falls back to defaults if missing or invalid. */
export function parseConfig(search: string): ScenarioConfig {
    const params = new URLSearchParams(search);
    
    const variant = params.get('variant');
    const count = Number(params.get('count'));
    const seedParam = params.get('seed');
    const seed = seedParam === null ? NaN : Number(seedParam);
    
    return {
        variant: VARIANTS.includes(variant as VariantName)
            ? (variant as VariantName)
            : DEFAULTS.variant,
        count: Number.isInteger(count) && count > 0 ? count : DEFAULTS.count,
        seed: Number.isInteger(seed) ? seed : DEFAULTS.seed,
        hud: params.get('hud') !== '0',
    };
}