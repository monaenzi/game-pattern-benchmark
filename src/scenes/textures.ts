import type Phaser from 'phaser';
import { ENEMY_RADIUS, PROJECTILE_RADIUS } from '../scenario/rules';

export const ENEMY_TEXTURE = 'enemy';
export const PROJECTILE_TEXTURE = 'projectile';

/**
 * Draws the two circle textures once at startup. Every object is then a
 * plain Image using one of them.
 */
export function createTextures(scene: Phaser.Scene): void {
    const g = scene.make.graphics({}, false);
    
    g.fillStyle(0xe5484d);
    g.fillCircle(ENEMY_RADIUS, ENEMY_RADIUS, ENEMY_RADIUS);
    g.generateTexture(ENEMY_TEXTURE, ENEMY_RADIUS * 2, ENEMY_RADIUS * 2);
    g.clear();
    g.fillStyle(0xf5d90a);
    g.fillCircle(PROJECTILE_RADIUS, PROJECTILE_RADIUS, PROJECTILE_RADIUS);
    g.generateTexture(PROJECTILE_TEXTURE, PROJECTILE_RADIUS * 2, PROJECTILE_RADIUS * 2);
    g.destroy();
}