# Comparison of Optimization Patterns

Four optimization patterns were researched. Object Pool and Spatial Partition solve the biggest problems in the test scenario, which is why they are implemented. Flyweight and Dirty Flag are only researched.

## Overview

| Pattern | Idea | Saves | Useful when … | Fits the scenario |
| --- | --- | --- | --- | --- |
| Object Pool | reuse objects instead of creating and deleting them | garbage collection work | many short-lived objects keep appearing and disappearing | yes: projectiles are fired and removed all the time |
| Spatial Partition | group objects by position and only compare objects that are close | computation time for collision checks | many objects need to be checked against each other | yes: every projectile is checked against every enemy |
| Flyweight | store data that many objects share only once | memory per object | many objects have large, identical data | no: hardly any objects to store, only position and speed |
| Dirty Flag | only recalculate a value when its inputs have changed | computation time for recalculations | many objects rarely change | no: objects are permanently in motion |

## Object Pool

Object Pool creates a set of objects once and reuses them. An object is not deleted but only marked as inactive and hidden. When a new object is needed, an inactive one is taken from the pool and reset (Nystrom, 2014, ch. "Object Pool").

In JavaScript, the garbage collector removes objects that are no longer used and decides on its own when to do this (MDN, n.d.-b). When many objects are created and deleted, it has to run more often, which can delay frames and make the game stutter. A pool avoids this, but it always uses memory, needs extra code and causes bugs if an object is not reset properly.

Whether Object Pool makes a measurable difference in the browser is an open question, because the effect depends on how the JavaScript engine handles garbage collection. In the test scenario, projectiles are fired and removed all the time and the baseline creates a new sprite each time.

## Spatial Partition

Spatial Partition divides the playing field into areas and only compares objects in the same or neighboring areas (Nystrom, 2014, ch. "Spatial Partition"; MDN, n.d.-a).

Without this, every projectile is checked against every enemy. With 500 of each, that is 250,000 checks per frame and with 5,000 of each, 25 million. The simplest form is a grid of equal cells: each object is put into its cell and a projectile is only checked against enemies in its own cell and the cells next to it. A quadtree is another option, which splits the field more finely where many objects are close together.

The grid has to be updated whenever objects move, so with only a few objects it can cost more than it saves. Since all objects in the test scenario move in every frame, a grid is a better fit than a quadtree, which would have to be rebuilt all the time. The grid has to find exactly the same hits as the baseline, which can be checked with the hit counter.

## Flyweight

Flyweight stores data that many objects share only once and each object keeps a reference to it (Gamma et al., 1994/2009; Nystrom, 2014, ch. "Flyweight"). A common example is a forest: the tree model and texture are stored once and each tree only stores its own position and size. The shared data cannot be changed for a single object.

In the test scenario, all objects already share one of two textures and the rest of their data is only position, speed and age. There is hardly any shared data left to move out.

## Dirty Flag

Dirty Flag marks an object when one of its inputs changes and only recalculates dependent values when they are needed (Nystrom, 2014, ch. "Dirty Flag"). An example is the position of an object attached to another one, which only has to be recalculated when the parent moves. The flag and the saved value need extra memory and forgetting to set the flag leads to old values that are hard to find.

In the test scenario, almost all objects move in every frame, so their values change all the time and Dirty Flag would not help.

## What Phaser Already Optimizes

Phaser already has some of these ideas built in. The test scenario does not use them, so that the measurements show the effect of the patterns themselves.

| Built into Phaser | Related to | How the project handles it |
| --- | --- | --- |
| Arcade Physics sorts moving objects into an RTree, a tree based on position. It is on by default and turning it off is recommended above about 5,000 objects (Phaser, n.d.-b) | Spatial Partition | not used: the scenario has its own collision check, so the measurements show the project’s own grid and not Phaser’s RTree |
| Groups can reuse objects with `get()`, `killAndHide()` and `maxSize` (Phaser, n.d.-a) | Object Pool | not used: the baseline uses `scene.add.image()` and `destroy()` and the Object Pool variant has its own pool |
| Batching draws many similar objects at once instead of one by one (Phaser, 2026) | rendering | kept the same: all objects are simple images with two shared textures, so drawing is identical in every variant |

## Reasons for the Selection

Object Pool and Spatial Partition solve the two biggest problems of the test scenario: many objects are created and removed all the time and every projectile is checked against every enemy. Because they solve different problems, each can be measured on its own. Flyweight and Dirty Flag would need a different scenario and could be looked at in later work.

## References

- - Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (2009). *Design patterns: Elements of reusable object-oriented software*. Addison-Wesley Professional. (Original work published 1994)
- MDN Web Docs. (n.d.-a). *2D collision detection*. <https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection>
- MDN Web Docs. (n.d.-b). *Memory management*. <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management>
- Nystrom, R. (2014). *Game programming patterns*. Genever Benning. <https://gameprogrammingpatterns.com/contents.html>
- Phaser. (n.d.-a). *Group*. Phaser documentation. <https://docs.phaser.io/phaser/concepts/gameobjects/group>
- Phaser. (n.d.-b). *Phaser.Physics.Arcade.World (API documentation, Phaser 4.1.0)*. <https://docs.phaser.io/api-documentation/class/physics-arcade-world>
- Phaser. (2026). *Phaser 4 rendering concepts*. <https://phaser.io/tutorials/phaser-4-rendering-concepts>

---

*This document was translated to English with Claude*
