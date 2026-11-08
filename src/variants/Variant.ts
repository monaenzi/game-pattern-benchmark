import type Phaser from 'phaser';
import type { ScenarioConfig } from '../config';

/** Numbers a variant returns after every step for hud and measurements. */
export interface StepStats {
    enemies: number;
    projectiles: number;
    // Number of enemy pairs tested for collision
    collisionChecks: number;
    hits: number;
}

/**
 * Common interface for all implementations of the scenario,
 * so scene and measurement code don't need to know which one is running.
 */
export interface Variant {
    readonly name: string;
    create(scene: Phaser.Scene, config: ScenarioConfig): void;
    step(dt: number): StepStats;
}