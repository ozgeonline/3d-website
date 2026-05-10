# 3D iPhone Product Page

Interactive iPhone product page built with React, Vite, WebGI, and GSAP. The page combines a fixed WebGI canvas with scroll-driven camera animation, responsive product sections, a preview mode, and a custom loading flow.

## Features

- Scroll-driven 3D phone animation with GSAP ScrollTrigger
- WebGI viewer setup for the `scene-black.glb` model
- Preview mode for interacting with the phone model
- Responsive Apple-style navigation with mobile dropdown menu
- Hero, sound, and display sections split into scoped component folders
- Shared UI components for section actions and scroll-to-top behavior
- CSS Modules for component styles
- Global color tokens in `src/styles/globals.css`
- `@` import alias for cleaner imports

## Tech Stack

- React 19
- Vite 8
- GSAP
- WebGI
- CSS Modules

## Project Structure

```text
src/
  animations/
    scrollAnimation.js
  app/
    App.jsx
  assets/
    images/
  components/
    layout/
      Loader/
      Nav/
    sections/
      DisplaySection/
      HeroSection/
      SoundSection/
    ui/
      ScrollTopButton/
      SectionActions/
    viewer/
      WebgiViewer/
  hooks/
    usePageLoaded.js
  styles/
    globals.css
  utils/
    scrollToSection.js
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 3D Model

The active WebGI model is loaded from:

```text
public/scene-black.glb
```

The model path is configured in:

```text
src/components/viewer/WebgiViewer/useWebgiViewer.js
```

## Animation Notes

Scroll animation is centralized in:

```text
src/animations/scrollAnimation.js
```

The section class names `hero-section`, `sound-section`, `sound-section-content`, and `display-section` are used as GSAP animation hooks. Keep these class names when refactoring section components.

Preview camera behavior is handled in:

```text
src/components/viewer/WebgiViewer/WebgiViewer.jsx
```

## Browser Requirements

This project requires WebGL/WebGL2 support. If the 3D model does not render, check that graphics acceleration is enabled in Chrome or Edge and that `chrome://gpu` reports WebGL as enabled.

## Known Build Warnings

The production build may show warnings from WebGI's bundled runtime:

- Large JavaScript chunk size
- Direct `eval` usage inside `webgi/dist/examples/runtime/bundle.m.js`

These warnings come from the WebGI dependency bundle, not from application code.
