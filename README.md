# abn-amroflix

A Vue application that replicates the show browsing UI of a typical streaming platform.

## Architecture

See [architecture.md](./architecture.md)

## Setup

This project is scaffolded off the default Vue3 + Vite template provided by Vue.

### recommended IDE

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### Node version

See [.nvmrc file](.nvmrc)

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# Runs the end-to-end tests
pnpm test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
