
export interface ScrapedJob {
  title: string;
  company?: string;
  location?: string;
  experience?: string;
  description?: string;
  tags: string[];
  posted?: string;
  link: string;
  source?: string;
  url?: string;
  scrapedAt?: Date;
}

interface ScraperConfig {
  url: string;
  wrapperSelector: string;
  selectors: {
    title?: string;
    company?: string;
    location?: string;
    experience?: string;
    description?: string;
    tags?: string;
    posted?: string;
    link?: string;
  };
  source: string;
}

interface ScraperResult {
  data: ScrapedJob[];
  info: string;
}

const scrapeFromConfig = async (config: ScraperConfig): Promise<ScraperResult> => {
  const isVercel = !!process.env.VERCEL_ENV;
  let puppeteer: any,
    launchOptions: any = {
      headless: true,
      defaultViewport: null,
    };

  if (isVercel) {
    const chromium = (await import("@sparticuz/chromium")).default;
    puppeteer = await import("puppeteer-core");
    launchOptions = {
      ...launchOptions,
      args: chromium.args,
      executablePath: await chromium.executablePath(),
    };
  } else {
    puppeteer = await import("puppeteer");
  }

  const browser = await puppeteer.launch(launchOptions);
  try {
    const page = await browser.newPage();

    // Spoof as real user
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    await page.setExtraHTTPHeaders({
      "accept-language": "en-US,en;q=0.9",
    });

    await page.goto(config.url, { waitUntil: "networkidle2", timeout: 60000 });
    await page.waitForSelector(config.wrapperSelector);

    const results = await page.evaluate(
      ({ wrapperSelector, selectors }: { wrapperSelector: string; selectors: ScraperConfig['selectors'] }) => {
        const items = Array.from(document.querySelectorAll(wrapperSelector));
        return items.map((el) => {
          const getText = (sel: string) => {
            if (!sel || !el) return "";
            const element = (el as HTMLElement).querySelector(sel) as HTMLElement | null;
            return element?.innerText?.trim() || "";
          };
          const getAttr = (sel: string, attr: string = "href") => {
            if (!sel || !el) return "";
            const element = (el as HTMLElement).querySelector(sel) as HTMLElement | null;
            return element?.getAttribute(attr) || "";
          };
          const getList = (sel: string) => sel ? Array.from((el as HTMLElement).querySelectorAll(sel)).map((li) => (li as HTMLElement).innerText.trim()) : [];

          return {
            title: getText(selectors.title || ""),
            company: getText(selectors.company || ""),
            location: getText(selectors.location || ""),
            experience: getText(selectors.experience || ""),
            description: getText(selectors.description || ""),
            tags: getList(selectors.tags || ""),
            posted: getText(selectors.posted || ""),
            link: getAttr(selectors.link || "", "href"),
          };
        });
      },
      { wrapperSelector: config.wrapperSelector, selectors: config.selectors }
    ) as ScrapedJob[];
    // const results = {}
    console.log(`✅ Found ${results.length} items for ${config.source}`);
    return {
      data: results,
      info: `✅ Found ${results.length} items for ${config.source}`,
    };
  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
    return {
      data: [],
      info: `❌ Error: ${(err as Error).message} items for ${config.source}`,
    };
  } finally {
    await browser.close();
  }
};

export default scrapeFromConfig;
