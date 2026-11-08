import Phaser from 'phaser';
import type { ScenarioConfig } from '../config';

export class BenchmarkScene extends Phaser.Scene {
    private config!: ScenarioConfig;

    constructor() {
        super('benchmark');
    }

    init(config: ScenarioConfig): void {
        this.config = config;
    }
    
    create(): void {
        if (this.config.hud) {
           this.add.text(16, 16, JSON.stringify(this.config, null, 2), { color: '#ffffff' }); 
        }
        
    }
    
    update(): void {
        // the active variant will advance the simulation here
    }
}