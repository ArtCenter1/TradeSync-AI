# TradeSync-AI Technical Context

## Core Technologies
- Frontend: Expo SDK 50 (React Native)
- Language: TypeScript 5.0+
- State Management: Zustand 4.4+
- UI: NativeWind (Tailwind for React Native)
- Navigation: Expo Router 3.0

## Development Environment
```bash
# Required Globals
nvm use 20
npm install -g expo-cli@latest
npm install -g eas-cli

# Project Setup
npm install
expo start
```

## Key Dependencies
- Trading Integration: `tradingview-api`, `ccxt`
- AI: `openai`, `langchain`
- State: `@reduxjs/toolkit`, `zustand`
- Utilities: `date-fns`, `lodash`, `axios`

## Configuration Patterns
```ts
// Typical store configuration
create<T>()((set) => ({
  strategies: [],
  addStrategy: (strategy) => 
    set((state) => ({ strategies: [...state.strategies, strategy] })),
}))
```

## Testing Strategy
- Component: React Testing Library
- E2E: Detox
- API: Jest + Supertest
- Coverage: 80% minimum

## Deployment Pipeline
```mermaid
graph TD
  A[Git Push] --> B[ESLint Check]
  B --> C[Test Suite]
  C --> D{E2E Pass?}
  D -->|Yes| E[EAS Build]
  D -->|No| F[Alert Team]
