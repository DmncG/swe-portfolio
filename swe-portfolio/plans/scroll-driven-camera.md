# Plan: Scroll-driven camera + floating sections over TestParticleCurve

## Goal
Bring back the Hero / Projects+Experience / Skills / About section stack as
scrollable DOM content floating over the `TestParticleCurve` R3F canvas, with
the camera angle transitioning smoothly per-section as the user scrolls
(instead of the current mouse-driven drift), using `motion/react` for content
choreography.

## Current state (as of this plan)
- `App.tsx` renders only `<TestParticleCurve />` full-screen; the old section
  stack (`Hero`, `Projects`, `Skills`, `About`, `TopNav`, `NavDots`,
  `CVButton`) is commented out.
- `TestParticleCurve` (`src/r3f/TestParticleCurve/index.tsx`) drives the
  camera via `state.pointer` (mouse position) lerped in `useFrame` — no
  scroll tie-in yet.
- `Projects` section already uses `motion/react` (`whileInView`, `useInView`,
  `animate`) for entrance choreography — this is the pattern to replicate
  for other sections.
- `drei` (`^10.7.7`) and `motion` (`^12.41.0`) are already dependencies.

## Steps

1. **Un-fix the canvas layer**
   - Wrap `TestParticleCurve`'s `<Canvas>` container in
     `position: fixed; inset: 0; z-index: 0`.
   - Restore the section stack in `App.tsx` in normal document flow, each
     section `min-h-screen`, wrapped in a container with
     `position: relative; z-index: 10` so it renders above the canvas.

2. **Get scroll progress**
   - Use motion's `useScroll()` (no `target` → tracks whole document) at the
     top-level layout to get a `scrollYProgress` MotionValue (0→1 across full
     page height).

3. **Bridge scroll progress into the R3F tree without re-rendering**
   - Pass the `scrollYProgress` MotionValue via context/props into a new
     `CameraRig` component rendered inside `<Canvas>`.
   - In a `useEffect`, subscribe with
     `scrollYProgress.on("change", v => scrollRef.current = v)` — store in a
     ref, not React state, so scroll doesn't force React re-renders every
     frame.
   - `useFrame` reads `scrollRef.current` each frame to drive the camera.

4. **Define per-section camera waypoints**
   - One waypoint per section, e.g.:
     - Hero: `[0, 0, 30]` looking at knot center (current default).
     - Projects/Experience: different orbit angle/distance.
     - About/Skills: another angle.
   - In `useFrame`, interpolate camera position + lookAt target between the
     two nearest waypoints based on `scrollRef.current`, using
     `THREE.MathUtils.lerp` (same technique already used for mouse drift).

5. **Layer mouse drift as a secondary offset**
   - Keep the existing pointer-based repel/drift effect, but apply it as an
     offset added on top of the scroll-driven base camera position, so the
     scene still feels alive rather than purely scroll-locked.

6. **Content choreography via motion.dev**
   - Reuse the existing `whileInView` pattern from `Projects` for `About` and
     `Skills` sections (currently they don't have this yet).
   - These fire on viewport intersection, which will naturally loosely sync
     with the camera arriving at that section's waypoint.

7. **Restore navigation**
   - Re-enable `NavDots` / `TopNav`, which use `IntersectionObserver` on
     section refs for active-section tracking and click-to-scroll — this is
     independent of the canvas layer and should work unchanged.

8. **Fix pointer interaction now that DOM content overlays the canvas**
   - The shader currently reads `state.pointer`, which requires pointer
     events to land on the canvas itself.
   - Set the canvas to `pointer-events: none` and instead track mouse
     position via a `window` `mousemove` listener into a ref, feeding that
     into the shader/camera logic instead of `state.pointer`.

## Open questions / things to decide during implementation
- Exact waypoint camera positions/lookAt targets and curve parameter changes
  (if any) per section — will likely need visual tuning once wired up.
- Whether to drive section content opacity directly from `scrollYProgress`
  (via `useTransform`) for tighter scrubbing sync, vs. keeping the looser
  `whileInView` threshold-based trigger.
- Performance check once the canvas renders continuously behind a scrolling
  page — confirm `position: fixed` compositing doesn't cause scroll jank.
