# Game Pattern Benchmark

[![CI](https://github.com/monaenzi/game-pattern-benchmark/actions/workflows/ci.yml/badge.svg)](https://github.com/monaenzi/game-pattern-benchmark/actions/workflows/ci.yml)

## Are optimization patterns worth it in Phaser.js? A performance comparison of Object Pool and Spatial Partition

Student project in Mobile Software Development (MSD24 WS26/27)\
**Author:** Ramona Enzi\
**Supervisor:** DI(FH) Michael Ulm, MA\
**Original Title:** Lohnen sich Optimierungsmuster in Phaser.js? Ein Performancevergleich von Object Pool und Spatial Partition

> **Status:** baseline test scenario done, Object Pool and Spatial Partition in progress.

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

### Tech stack

All versions are pinned exactly so that measurements stay comparable.

| Tool | Version | Purpose |
| --- | --- | --- |
| [Phaser](https://phaser.io) | 4.2.1 | game framework |
| [TypeScript](https://www.typescriptlang.org) | 7.0.2 | language and type checking |
| [Vite](https://vite.dev) | 8.3.6 | dev server and bundler |
| [Node.js](https://nodejs.org) | 24 | runtime for tooling (see `.nvmrc`) |

### Project structure

```text
src/
  main.ts       entry point, starts Phaser
  config.ts     scenario parameters from the URL
  scenes/       benchmark scene and generated textures
  scenario/     rules shared by all variants, seeded random number generator
  variants/     baseline (Object Pool, Spatial Partition follow)
bench/          automated measurement scripts (planned)
results/        processed measurement data and charts (planned)
docs/           research notes and reports (planned)
```

### Getting started

Requires Node.js 24 or newer.

```bash
npm install
npm run dev
```

Then open the URL Vite prints.

The scenario is configured through URL parameters:

| Parameter | Default | Meaning |
| --- | --- | --- |
| `variant` | `baseline` | implementation to run |
| `count` | `1000` | number of live objects (half enemies, half projectiles) |
| `seed` | `42` | seed for the random number generator |
| `hud` | `1` | `0` hides the stats overlay |

Example: `http://localhost:5173/?variant=baseline&count=5000&seed=42`

An unknown `variant` stops the scenario with an error in the browser console.

| Command | Description |
| --- | --- |
| `npm run dev` | starts the dev server with hot reload |
| `npm run build` | type-checks and builds the production version into `dist/` |
| `npm run preview` | serves the production build locally |

### License

No license has been chosen yet, so all rights are reserved for now.
