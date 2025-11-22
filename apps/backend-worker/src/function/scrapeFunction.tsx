async function doScrape(job: Job) {
  await pageSemaphore.acquire();
  const payload = job.data || {};
  const targetUrl = payload.url ?? payload.target ?? 'https://example.com';

  let page: Page | null = null;
  try {
    const b = await launchBrowser();
    page = await b.newPage();
    // optional: set a reasonable timeout & user agent
    page.setDefaultNavigationTimeout(30_000);
    await page.setUserAgent(
      'Mozilla/5.0 (compatible; SwinklogicBot/1.0; +https://example.com/bot)'
    );

    logger.info({ jobId: job.id, url: targetUrl }, 'Starting navigation');
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

    // Example scrape: get title and HTML
    const title = await page.title();
    const html = await page.content(); // be cautious for very large pages

    // Optionally extract something structured:
    const h1 = await page.$eval('h1', (el) => el.textContent?.trim()).catch(() => null);

    logger.info({ jobId: job.id, title, h1 }, 'Scrape result (summary)');

    // Return the results — BullMQ will store return value in job.returnvalue
    return { title, h1, url: targetUrl, snapshotLength: html.length };
  } catch (err) {
    logger.error({ err, jobId: job.id }, 'Error in doScrape');
    throw err; // rethrow so BullMQ marks job failed
  } finally {
    if (page) {
      try {
        await page.close();
      } catch (e) {
        logger.warn({ e }, 'Failed to close page');
      }
    }
    pageSemaphore.release();
  }
}

export { doScrape };