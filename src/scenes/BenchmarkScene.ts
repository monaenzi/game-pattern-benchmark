import Phaser from 'phaser';
import type { ScenarioConfig } from '../config';
import { FIXED_DT } from '../scenario/rules';
import { createVariant } from '../variants';
import type { StepStats, Variant } from '../variants/Variant';
import { createTextures } from './textures';

/** States exposed on window so measurement scripts can read it */
export interface BenchmarkState {
    config: ScenarioConfig;
    frame: number;
    last: StepStats | null;
}

declare global {
    interface Window {
        benchmark?: BenchmarkState;
    }
}

export class BenchmarkScene extends Phaser.Scene {
    private config!: ScenarioConfig;
    private variant!: Variant;
    private hud?: Phaser.GameObjects.Text;
    private frame = 0;


    constructor() {
        super('benchmark');
    }

    init(config: ScenarioConfig): void {
        this.config = config;
    }
    
    create(): void {
        createTextures(this);

        this.variant = createVariant(this.config.variant);
        this.variant.create(this, this.config);

        if (this.config.hud) {
           this.hud = this.add
            .text(8, 8, '', {fontFamily: 'monospace', fontSize: '14px', color: '#ffffff'})
            .setDepth(1000)
            .setBackgroundColor('#000000aa')
            .setPadding(6);
        }
        window.benchmark = { config: this.config, frame: 0, last: null };
    }
    
    update(): void {
        const stats = this.variant.step(FIXED_DT);
        this.frame++;

        window.benchmark!.frame = this.frame;
        window.benchmark!.last = stats;

        // only updates 4 times per second
        if (this.hud && this.frame % 15 === 0) {
            this.hud.setText([
                `variant ${this.variant.name}`,
                `fps ${this.game.loop.actualFps.toFixed(1)}`,
                `enemies ${stats.enemies}`,
                `shots ${stats.projectiles}`,
                `checks ${stats.collisionChecks}`,
            ]);
        }
    }
}