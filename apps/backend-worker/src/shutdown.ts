// apps/worker/src/shutdown.ts
import { logger } from './logger';
import { closeBrowser } from './browser';
import { Redis } from 'ioredis';

export async function gracefulShutdown(connection?: Redis, signal?: string) {
  logger.info({ signal }, 'Shutdown requested');
  try { await connection?.quit(); } catch (e) { logger.warn({ e }, 'Error quitting redis'); }
  try { await closeBrowser(); } catch (e) { logger.warn({ e }, 'Error closing browser'); }
  process.exit(0);
}
