# Game Pattern Benchmark

## Are optimization patterns worth it in Phaser.js? A performance comparison of Object Pool and Spatial Partition

Student project in Mobile Software Development (MSD24 WS26/27)\
**Author:** Ramona Enzi\
**Supervisor:** DI(FH) Michael Ulm, MA\
**Original Title:** Lohnen sich Optimierungsmuster in Phaser.js? Ein Performancevergleich von Object Pool und Spatial Partition

### Goal

For a browser game to run smoothly, each frame has to be computed in about 16 milliseconds (60 FPS). The more objects are on screen at the same time, the harder that gets, and the game starts to stutter.

Game development has well-known optimization patterns for this, but their benefit has mostly been studied in classic game engines like Unity. This project measures whether, and from how many objects on, two of these patterns pay off in Phaser.js:

- **Object Pool:** objects are reused instead of being created and destroyed all the time. This should take load off memory management and avoid stutters caused by the browser's garbage collection.

- **Spatial Partition:** only objects that are close to each other are checked for collisions. This should reduce computation time, which otherwise grows very quickly with the number of objects.

The results are meant to help developers of browser games decide whether the extra implementation effort is worth it for the number of objects they expect.

### Expected result

- a reproducible test scenario in Phaser.js with three variants (baseline, Object Pool, Spatial Partition)
- automated measurements and the resulting data
- a written comparison stating for each pattern, from which object count it performs measurably better than the baseline or that it shows no benefit in the tested range

### Test scenario

Not a full game, but a playing field where projectiles are constantly spawned and removed, move around and collide with enemies. The scenario runs without player input and with fixed starting values, so every run behaves the same way.

It is implemented in three variants:

| Variant | Description |
| --- | --- |
| Baseline | no optimization, used as the reference |
| Object Pool | projectiles are reused from a pool |
| Spatial Partition | collision checks use a spatial division of the playing field |

### Measurements

- **Metrics:** frame computation time and memory usage
- **Object counts:** at least six levels between 100 and 10,000
- **Repetitions:** at least ten per variant and object count
- **Environment:** one fixed test machine with pinned Chrome and Phaser versions
- **Execution:** automated in the browser

### Scope

Out of scope for this project: implementing further patterns or combinations of patterns, comparisons with other frameworks or game engines, a full browser game and measurements across different browsers, operating systems or devices.

### Timeline

| Until | Milestone |
| --- | --- |
| 20.10.2026 | Concept and timeline |
| 09.11.2026 | Research, baseline test scenario, report 1 |
| 14.12.2026 | Object Pool, Spatial Partition, measurement setup, report 2 |
| 10.01.2027 | Full measurement runs, analysis, report 3 |
| 26.01.2027 | Final documentation and presentation |

### Project structure (planned)

```text
src/      test scenario and its three variants
bench/    automated measurement scripts
results/  processed measurement data and charts
docs/     research notes and reports
```

### Getting started

Will be added once the baseline test scenario is in place.