# Sudoku

A small Sudoku game that runs in the browser and generates its own puzzles.

Use the Node version in `.nvmrc` (24.21.0) and pnpm 12 (`packageManager` in `package.json`; Corepack will pick it up). Install with `pnpm install`, then `pnpm start` or `pnpm dev` to run the Vite dev server. `pnpm build` writes a production bundle to `dist/`.

The UI is React 19, rendered with `react-dom` and styled with Emotion (`@emotion/css`). Icons come from `react-icons`. Puzzle generation and solving live in TypeScript under `src/public/js`. `pnpm test` runs ESLint 10, `tsc --noEmit`, and Vitest (jsdom, Testing Library) with v8 coverage, which has to stay at 100%. `pnpm test:unit` runs the tests alone, `pnpm typecheck` runs the compiler alone, and `pnpm test:watch` reruns the tests as files change. GitHub Actions runs the same `pnpm test` script on push and pull request.
