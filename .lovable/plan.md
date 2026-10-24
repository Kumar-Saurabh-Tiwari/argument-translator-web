# Live Translation Mockup

## User-facing result
Build the app’s first screen as a polished, responsive dark-mode conversation workspace with two live-speaking sides. Language selection and both text inputs will work entirely in local React state; typing on either side appears immediately as a visibly marked mock translation on the opposite side.

## Technical approach
- Replace the starter home screen with the two-sided interface, using the existing TanStack route and shared button, select, and textarea controls.
- Define the page’s palette, typography, surfaces, and motion as semantic tokens in `src/styles.css`.
- Add app-specific metadata to the home route and update the root metadata defaults.
- Keep the feature frontend-only; do not add Cloud, database, or AI connections.
