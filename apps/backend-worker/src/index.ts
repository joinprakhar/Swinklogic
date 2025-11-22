// apps/worker/src/index.ts
import { createWorker } from './worker';
import { logger } from './logger';
import { gracefulShutdown } from './shutdown';
import { REDIS_URL } from './config';

import dotenv from "dotenv";

dotenv.config();


(async function main() {
  try {
    const { worker, connection } = createWorker();
    console.log(REDIS_URL)
    process.on('SIGINT', () => gracefulShutdown(connection, 'SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown(connection, 'SIGTERM'));

    logger.info('Worker started and listening for jobs...');
  } catch (err) {
    logger.error({ err }, 'Startup failed');
    process.exit(1);
  }
})();
