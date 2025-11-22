// apps/worker/src/scraper.ts
import { Job } from 'bullmq';
import { launchBrowser } from './browser';
import { logger } from './logger';
import { Semaphore } from './semaphore';
import { MAX_CONCURRENT_PAGES } from './config';

// semaphore for per-process page cap
const pageSemaphore = new Semaphore(MAX_CONCURRENT_PAGES);

export async function doScrape(job: Job) {
  await pageSemaphore.acquire();
  const payload = job.data ?? {};
  const targetUrl = payload.url ?? payload.target ?? 'https://example.com';

  let page = null;
  try {
    const b = await launchBrowser();
    page = await b.newPage();
    page.setDefaultNavigationTimeout(30_000);
    await page.setUserAgent('Mozilla/5.0 (compatible; SwinklogicBot/1.0)');

    logger.info({ jobId: job.id, url: targetUrl }, 'Navigating');
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

    const title = await page.title();
    const h1 = await page.$eval('h1', (el) => el.textContent?.trim()).catch(() => null);
    const html = await page.content();

    logger.info({ jobId: job.id, title, h1 }, 'Scrape done');
    return { title, h1, url: targetUrl, snapshotLength: html.length };
  } catch (err) {
    logger.error({ err, jobId: job.id }, 'Scrape error');
    throw err;
  } finally {
    if (page) {
      try { await page.close(); } catch (e) { logger.warn({ e }, 'Failed closing page'); }
    }
    pageSemaphore.release();
  }
}
