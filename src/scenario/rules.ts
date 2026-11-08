/**
 * Rules of the test scenario that are the same for every variant.
 * Variants may only change how objects are managed and how collisions
 * are found, never what happens in the scenario.
 */
import { SeededRandom } from './rng';

export const WORLD_WIDTH = 1280;
export const WORLD_HEIGHT = 720;

//every frame advances by 1/60 s.
export const FIXED_DT = 1 / 60;

export const PROJECTILE_RADIUS = 3;
export const PROJECTILE_SPEED = 400;
export const PROJECTILE_LIFETIME = 2;

export const ENEMY_RADIUS = 6;
export const ENEMY_SPEED = 60;

export const TURRET_X = WORLD_WIDTH / 2;
export const TURRET_Y = WORLD_HEIGHT / 2;
export const TURRET_SPIN = 2.5;

/** Splits object count into enemies and projectiles. */
export function deriveLoad(count: number) {
    const enemies = Math.max(1, Math.floor(count / 2));
    const projectiles = Math.max(1, count - enemies);
    const shotsPerSecond = projectiles / PROJECTILE_LIFETIME;
    return { enemies, shotsPerSecond };
}

export interface Spawn {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

/** Random position and direction for enemy. */
export function enemySpawn(rng: SeededRandom): Spawn {
    const angle = rng.range(0, Math.PI * 2);
    return {
        x: rng.range(ENEMY_RADIUS, WORLD_WIDTH - ENEMY_RADIUS),
        y: rng.range(ENEMY_RADIUS, WORLD_HEIGHT - ENEMY_RADIUS),
        vx: Math.cos(angle) * ENEMY_SPEED,
        vy: Math.sin(angle) * ENEMY_SPEED,
    };
}

/** So object bounces off the edge */
export function bounce(o: Spawn, radius: number): void {
    if (o.x < radius || o.x > WORLD_WIDTH - radius) o.vx = -o.vx;
    if (o.y < radius || o.y > WORLD_HEIGHT - radius) o.vy = -o.vy;
}

/** Checks whether two circles overlap. */
export function circlesOverlap(
    ax: number, ay: number, ar: number,
    bx: number, by: number, br: number,
): boolean {
    const dx = ax - bx;
    const dy = ay - by;
    const r = ar + br;
    return dx * dx + dy * dy < r * r;
}