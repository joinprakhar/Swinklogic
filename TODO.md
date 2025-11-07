# TODO: Fix Swinklogic Monorepo Issues

## Issues Identified
- Backend-worker TypeScript build failing (tsc showing help instead of compiling)
- Backend-worker BullMQ Redis connection error: maxRetriesPerRequest must be null
- Backend-api tsconfig.json missing include/exclude fields

## Tasks
- [ ] Update backend-worker tsconfig.json to ensure proper compilation
- [ ] Update backend-api tsconfig.json to add include/exclude fields
- [ ] Fix backend-worker Redis connection options for BullMQ
- [ ] Test build and dev commands after fixes

## Followup Steps
- Run `pnpm run build` to verify all packages build successfully
- Run `pnpm dev` to verify all services start without errors
