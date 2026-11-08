/**
 * Baseline: the straightforward implementation without any optimization.
 * This is the reference the optimized variants are measured against.
 */
import type Phaser from 'phaser';
import type { ScenarioConfig } from '../config';
import { SeededRandom } from '../scenario/rng';
import {
    ENEMY_RADIUS,
    PROJECTILE_LIFETIME,
    PROJECTILE_RADIUS,
    PROJECTILE_SPEED,
    TURRET_SPIN,
    TURRET_X,
    TURRET_Y,
    bounce,
    circlesOverlap,
    deriveLoad,
    enemySpawn,
} from '../scenario/rules';
import { ENEMY_TEXTURE, PROJECTILE_TEXTURE } from '../scenes/textures';
import type { StepStats, Variant } from './Variant';

interface Mover {
    sprite: Phaser.GameObjects.Image;
    x: number;
    y: number;
    vx: number;
    vy: number;
}

interface Projectile extends Mover {
    age: number;
}

export class BaselineVariant implements Variant {
    readonly name = 'baseline';
    private scene!: Phaser.Scene;
    private rng!: SeededRandom;
    private enemies: Mover[] = [];
    private projectiles: Projectile[] = [];
    private shotsPerSecond = 0;
    private shotAccumulator = 0;
    private turretAngle = 0;
    
    create(scene: Phaser.Scene, config: ScenarioConfig): void {
        this.scene = scene;
        this.rng = new SeededRandom(config.seed);
        
        const load = deriveLoad(config.count);
        this.shotsPerSecond = load.shotsPerSecond;
        
        for (let i = 0; i < load.enemies; i++) {
            this.enemies.push(this.spawnEnemy())
        }
    }
    
    step(dt: number): StepStats {
        this.fire(dt);
        this.moveEnemies(dt);
        this.moveProjectiles(dt);
        const { checks, hits } = this.collide();
        
        return {
            enemies: this.enemies.length,
            projectiles: this.projectiles.length,
            collisionChecks: checks,
            hits,
        };
    }
    
    /** Fires new projectiles from the turret in a rotating pattern. */
    private fire(dt: number): void {
        this.turretAngle += TURRET_SPIN * dt;
        this.shotAccumulator += this.shotsPerSecond * dt;
        
        while (this.shotAccumulator >= 1) {
            this.shotAccumulator -= 1;
            const angle = this.turretAngle + this.shotAccumulator * Math.PI * 2;
            this.projectiles.push({
                sprite: this.scene.add.image(TURRET_X, TURRET_Y, PROJECTILE_TEXTURE),
                x: TURRET_X,
                y: TURRET_Y,
                vx: Math.cos(angle) * PROJECTILE_SPEED,
                vy: Math.sin(angle) * PROJECTILE_SPEED,
                age: 0,
            });
        }
    }
    private moveEnemies(dt: number): void {
        for (const e of this.enemies) {
            e.x += e.vx * dt;
            e.y += e.vy * dt;
            bounce(e, ENEMY_RADIUS);
            e.sprite.setPosition(e.x, e.y);
        }
    }
    
    /** Moves projectiles and removes the ones whose lifetime is over. */
    private moveProjectiles(dt: number): void {
        this.projectiles = this.projectiles.filter((p) => {
            p.age += dt;
            if (p.age >= PROJECTILE_LIFETIME) {
                p.sprite.destroy();
                return false;
            }
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            bounce(p, PROJECTILE_RADIUS);
            p.sprite.setPosition(p.x, p.y);
            return true;
        });
    }
    
    /** Collision detection: every projectile against every enemy. */
    private collide(): { checks: number; hits: number } {
        let checks = 0;
        let hits = 0;
        
        for (const p of this.projectiles) {
            for (let i = 0; i < this.enemies.length; i++) {
                const e = this.enemies[i];
                checks++;
                
                if (circlesOverlap(p.x, p.y, PROJECTILE_RADIUS, e.x, e.y, ENEMY_RADIUS)) {
                    hits++;
                    e.sprite.destroy();
                    this.enemies[i] = this.spawnEnemy();
                }
            }
        }
        return { checks, hits };
    }
    
    private spawnEnemy(): Mover {
        const s = enemySpawn(this.rng);
        return {
            sprite: this.scene.add.image(s.x, s.y, ENEMY_TEXTURE),
            ...s,
        };
    }
}