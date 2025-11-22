// apps/worker/src/browser.ts
import puppeteer, { Browser } from 'puppeteer';
import { logger } from './logger';
import { HEADLESS, BROWSER_ARGS, CHROME_PATH } from './config';

let browser: Browser | null = null;
let launching = false;

export async function launchBrowser(): Promise<Browser> {
  if (browser && browser.isConnected()) return browser;
  if (launching) {
    // wait for ongoing launch
    while (launching) await new Promise((r) => setTimeout(r, 50));
    if (browser && browser.isConnected()) return browser;
  }
  launching = true;
  logger.info('Launching Chromium...');
  try {
    const launchOpts: any = {
      headless: HEADLESS,
      args: BROWSER_ARGS,
    };
    if (CHROME_PATH) launchOpts.executablePath = CHROME_PATH;

    browser = await puppeteer.launch(launchOpts);

    browser.on('disconnected', () => {
      logger.warn('Browser disconnected; marking null and scheduling relaunch');
      browser = null;
      setTimeout(() => launchBrowser().catch((err) => logger.error({ err }, 'Relaunch failed')), 1000);
    });

    logger.info('Chromium launched');
    return browser;
  } finally {
    launching = false;
  }
}

export async function closeBrowser() {
  if (browser) {
    try {
      await browser.close();
    } catch (e) {
      logger.warn({ e }, 'Error closing browser');
    } finally {
      browser = null;
    }
  }
}
