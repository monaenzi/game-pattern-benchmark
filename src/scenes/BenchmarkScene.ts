import Phaser from 'phaser';

export class BenchmarkScene extends Phaser.Scene {
    constructor() {
        super('benchmark');
    }
    
    create(): void {
        this.add.text(16, 16, 'benchmark scene running', { color: '#ffffff' });
    }
    
    update(): void {
        // the active variant will advance the simulation here
    }
}