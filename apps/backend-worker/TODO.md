# Backend-Worker Refactor TODO

## Tasks
- [ ] Create centralized config.ts file for Redis URL and queue name
- [ ] Refactor worker.ts to use centralized config and implement actual scraping logic
- [ ] Refactor enqueue.ts to use centralized config and provide reusable enqueue function
- [ ] Update index.ts to be main entry point starting the worker, remove commented code
- [ ] Ensure consistent imports and exports across files

## Followup Steps
- [ ] Test worker by running enqueue script and verifying job processing
- [ ] Ensure Redis connection works with configured URL
- [ ] Add error handling and logging for production readiness
