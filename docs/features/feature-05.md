# Feature 05: Post-Processing Scroll-Driven Animation

## Feature Name
**Scroll-Controlled Image Sequence with Animated Lightroom Sliders**

## Description
- Top filter buttons (Lightroom, Photoshop/Nik, AiArty Enhancer/Matting) switch editing tool content
- Lightroom tab displays scroll-driven section where image progressively changes from unprocessed to edited
- Visual-only Lightroom sliders animate in sync with scroll position
- Desktop: split layout (left: image, right: sliders), Mobile: stacked layout (top: image, bottom: sliders)

## Primary User Flow
1. User lands on Post-Processing page with Lightroom tab selected
2. User sees unprocessed photo on left, visual Lightroom sliders on right (desktop)
3. User scrolls down → image progressively transitions through 20-40 WebP frames (original → edited)
4. Slider handles move smoothly to reflect adjustments (Exposure, Contrast, Highlights, etc.)
5. User continues scrolling → final edited image displayed with all slider adjustments shown
6. User scrolls back up → animation reverses, returning to original state
7. User clicks different tab (e.g., Photoshop/Nik) → new scroll section loads with different workflow

## Modules Involved
- **PostProcessingPage Component** (main page container)
- **FilterButtons Component** (tool category selection)
- **ScrollAnimationSection Component** (scroll-driven container)
- **ImageSequencePlayer Component** (maps scroll position to frame index)
- **VisualSliderPanel Component** (non-interactive Lightroom-like UI)
- **VisualSlider Component** (individual slider with animated handle)
- **ScrollProgressTracker** (calculates scroll position within section)

## Dependencies
- **React + Vite** (component framework)
- **GSAP + ScrollTrigger** (scroll-to-frame mapping, slider animations)
- **Framer Motion** (tab switching animations)
- **Tailwind CSS** (split layout desktop, stacked mobile)
- **WebP image sequence** (20-40 frames per technique, preloaded or lazy-loaded in chunks)

## Open Questions / Missing Info
- Q1: Frame count: 20, 30, or 40 frames? More frames = smoother but larger bundle
- A1: Start with 20 frames, create a variable so I can test different counts
- Q2: Preload strategy: all frames upfront, or progressive loading?
- A2: all frames upfront
- Q3: Scroll direction: should scroll-up reverse animation, or lock final state?
- A3: Reverse animation (bidirectional scroll)
- Q4: Mobile: reduce frame count for smaller screens?
- A4: No
- Q5: Slider animation: linear easing or match real editing curves?
- A5: linear
- Q6: Desktop split: 50/50 or 60/40 (image/sliders)?
- A6: 80/20 (image gets more space)
- Q7: Photoshop/Nik and AiArty tabs: placeholder content or full implementation?
- A7: Placeholder content for now (TODO status per POST_PROCESSING.md)
- Q8: Should scroll snap to start/end of section?
- A8: Yes, snap to start of section, free-flowing within, snap to end
