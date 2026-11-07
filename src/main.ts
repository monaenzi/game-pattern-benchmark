import Phaser from 'phaser';
import { BenchmarkScene } from './scenes/BenchmarkScene';
import { WORLD_HEIGHT, WORLD_WIDTH } from './scenario/rules';

new Phaser.Game({
    type: Phaser.WEBGL,
    parent: 'game',
    width: WORLD_WIDTH,
    height: WORLD_HEIGHT,
    backgroundColor: '#14141a',
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: [BenchmarkScene],
});