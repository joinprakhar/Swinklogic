# Backend-Worker Refactor TODO

## Tasks
- [ ] Create centralized config.ts file for Redis URL and queue name
- [ ] Refactor worker.ts to use centralized config and implement actual scraping logic
- [ ] Refactor enqueue.ts to use centralized config and provide reusable enqueue function
- [ ] Update index.ts to be main entry point starting the worker, remove commented code
- [ ] Ensure consistent imports and exports across files

## Modular Component Tasks for worker.ts
- [x] Create performScrape function that handles navigation, data extraction, and returns scrape result
- [x] Modify doScrape to acquire semaphore, get browser, create page, call performScrape, close page, release semaphore

## Followup Steps
- [ ] Test worker by running enqueue script and verifying job processing
- [ ] Ensure Redis connection works with configured URL
- [ ] Add error handling and logging for production readiness
