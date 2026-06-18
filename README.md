# Image Gallery

An image gallery with infinite scroll, smooth animations and photo deletion by click or keyboard.

## Demo
https://image-gallery-six-blue.vercel.app/

## Installation
npm install
npm run dev

The app will be available at http://localhost:5173.

## Running tests
npm test

To run tests once without watch mode:
npm test -- --run

## Technical decisions

### React + Vite instead of Next.js
This project doesn't require routing, SSR or any of Next.js strengths, so React + Vite was the right tool for the job.

### Picsum API instead of jsonplaceholder
The jsonplaceholder API wasn't available during development, so I replaced it with Picsum Photos, which offers a similar interface with real images. The goal is to demonstrate the gallery functionality regardless of the data source.

### Architecture
For a project of this size, I went with a simple structure grouped by functionality — no unnecessary layers. In a larger project I'd consider splitting by features or following a different architecture.

src/
  components/
    EmptyState/
    ErrorMessage/
    ImageCard/
    ImageGallery/
    Skeleton/
    ScrollToTop/
    Spinner/
  hooks/
    usePhotos.ts
  styles/
    variables.scss
  types/
    index.ts

Data logic is completely separated from the UI. `usePhotos` handles fetching, pagination, loading state and deletion. Components only deal with rendering.

### SCSS Modules
I used SCSS Modules to avoid style collisions, with shared variables in `variables.scss` to keep consistency between the gallery grid and the skeleton loader — both use the exact same columns and gap.

### Native IntersectionObserver
For infinite scroll I used the native IntersectionObserver API instead of an external library. It's powerful enough for this use case and avoids adding unnecessary dependencies.

### Framer Motion
Pure CSS animations caused visible jumps in the grid when removing elements. I used Framer Motion to solve this — `AnimatePresence` keeps the element in the DOM until the exit animation completes, eliminating the jumps.

### crypto.randomUUID()
Used to generate unique IDs per element. The Picsum API repeats IDs across pages, which caused issues with React keys when deleting elements.

### DOM performance
I'm aware of the performance issue that a large DOM can cause. After researching, I concluded that virtualisation is complex to implement correctly in a grid with Framer Motion animations, and that the data volume of this API doesn't cause real performance issues in practice. In a project with larger data volumes, I'd implement `react-window` or TanStack Virtual to virtualise the grid.

## Tests
Unit tests for the two main pieces of the app:
- **ImageCard:** rendering, deletion on click and keyboard (Enter and Space), correct aria-label.
- **usePhotos:** initial photo load, API error handling, correct photo deletion and pagination.
- **ScrollToTop:** button not shown on load, appears on scroll, calls `window.scrollTo` with correct params on click.

## Accessibility
Images are fully keyboard navigable — Tab to move between them, Enter or Space to delete. Each image has a descriptive aria-label with the author's name. Loading and error states use `role="status"` and `role="alert"` to communicate changes to screen readers.
