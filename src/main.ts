import Phaser from 'phaser';
import { BenchmarkScene } from './scenes/BenchmarkScene';

new Phaser.Game({
    type: Phaser.WEBGL,
    parent: 'game',
    width: 1280,
    height: 720,
    backgroundColor: '#14141a',
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: [BenchmarkScene],
});