import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import genericScraper, { ScrapedJob } from '@/lib/scrapers/genericScraper';
import ScraperConfig from '@/lib/models/scrapeConfig';
import JobPost, { IJobPost } from '@/lib/models/JobPost';
import transporter from '@/lib/nodemailer';
import generateJobEmailTemplate from '@/lib/jobEmailContent';
import { getDataFromApi } from '@/lib/jobByApi';

function normalizeLink(link: string, configUrl: string) {
  // Create URL object from config
  const urlObj = new URL(configUrl);
  const baseUrl = urlObj.origin + "/"; // e.g. "https://www.glassdoor.co.in/"

  // If link already contains the baseUrl, return as is
  if (link.startsWith(baseUrl)) {
    return link;
  }

  // If link already starts with domain but missing protocol (e.g. www.glassdoor.co.in/...)
  if (link.startsWith(urlObj.host)) {
    return urlObj.protocol + "//" + link;
  }

  // Otherwise prepend baseUrl
  return baseUrl + link.replace(/^\/+/, ""); // remove leading slashes
}

async function scraperFunction(sources: string[] | null = null) {
  // Build query for scrapeConfig
  const query: Record<string, unknown> = { isRegular: true, isActive: true };
  if (sources && Array.isArray(sources) && sources.length > 0) {
    query.source = { $in: sources };
  }
  const configs = await ScraperConfig.find(query);
  const allResults: ScrapedJob[] = [];
  const newInserted: IJobPost[] = [];
  const resultStatus: string[] = [];
  for (const config of configs) {
    if (!config.isApi) {
      const { data, info } = await genericScraper(config);
      const tagged = data.map((item: ScrapedJob) => ({
        ...item,
        source: config.source,
        url: config.url,
        link: normalizeLink(item.link || '', config.url),
      }));
      allResults.push(...tagged);
      resultStatus.push(info);
    } else {
      const apiData = await getDataFromApi(config);
      if (apiData && apiData.length > 0) {
        allResults.push(...apiData);
      }
    }
  }
  for (const post of allResults) {
    post.source = post.source || "";
    post.scrapedAt = new Date();

    const exists = await JobPost.findOne({ link: post.link });

    if (!exists) {
      try {
        const newPost = await JobPost.create(post);
        newInserted.push(newPost);
      } catch (err) {
        console.error("Error inserting post:", post, err);
      }
    }
  }
  const html = await generateJobEmailTemplate(newInserted);

  await transporter.sendMail({
    from: '"The Scrapper" <maddison53@ethereal.email>',
    to: "mingohuts@gmail.com",
    subject: "JD for recent job Posted",
    text: "Welcome to the SCRAPPER", // plain‑text body
    html: html, // HTML body
  });
  return {
    resultStatus,
    allResults,
    newInserted,
  };
}

// GET /api/scrape - Scrape all jobs
// GET /api/scrape?sources=source1,source2 - Scrape specific sources
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const sourcesParam = url.searchParams.get('sources');
    const sources = sourcesParam ? sourcesParam.split(',') : null;

    const { allResults, newInserted, resultStatus } = await scraperFunction(sources);
    return NextResponse.json({
      totalScraped: allResults.length,
      newInsertedCount: newInserted.length,
      newInserted,
      allScraped: allResults, // full data scraped (whether inserted or not)
      resultStatus,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error scraping jobs',
      error: (error as Error).message
    }, { status: 500 });
  }
}

// POST /api/scrape - Scrape all jobs
// POST /api/scrape with body { sources: ['source1', 'source2'] } - Scrape specific sources
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const sources = body.sources || null;
    const { allResults, newInserted, resultStatus } = await scraperFunction(sources);
    return NextResponse.json({
      totalScraped: allResults.length,
      newInsertedCount: newInserted.length,
      newInserted,
      allScraped: allResults, // full data scraped (whether inserted or not)
      resultStatus,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error scraping jobs',
      error: (error as Error).message
    }, { status: 500 });
  }
}
