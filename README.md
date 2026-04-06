# Sherpa

A marketplace app connecting travelers with buyers. Travelers post offers for items they can bring back; buyers post requests for items they want.

## Monorepo structure

```
apps/
  backend/   — NestJS REST API
  mobile/    — React Native mobile app
packages/
  shared/    — Shared TypeScript types and enums
```

## Getting started

### 1. Install dependencies

From the repo root:

```bash
yarn install
```

### 2. Build shared types

The `@sherpa/shared` package must be compiled before running any app. Run this once, and again whenever you change anything in `packages/shared/src/`:

```bash
cd packages/shared
yarn build
```

### 3. Run the backend

```bash
cd apps/backend
yarn start:dev
```

The API will be available at `http://localhost:3000/api`.

## Shared types

Types and enums used across apps live in `packages/shared/src/`. After editing them, rebuild:

```bash
cd packages/shared && yarn build
```
