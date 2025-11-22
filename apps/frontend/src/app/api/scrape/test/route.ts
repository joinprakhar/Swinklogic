import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import genericScraper, { ScrapedJob } from '@/lib/scrapers/genericScraper';
import { getDataFromApi } from '@/lib/jobByApi';
import { IJobPost } from '@/lib/models/JobPost';

// POST /api/scrape/test - Test scraping with a config
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const config = body.config;
    const allResults: Partial<IJobPost>[] = [];
    const resultStatus: string[] = [];
    if (config) {
      if (!config.isApi) {
        const { data, info } = await genericScraper(config);
        const tagged = data.map((item: ScrapedJob) => ({
          ...item,
          source: config.source,
          url: config.url,
        }));
        allResults.push(...tagged);
        resultStatus.push(info);
      } else {
        const apiData = await getDataFromApi(config);
        if (apiData && apiData.length > 0) {
          allResults.push(...apiData);
        }
      }
      return NextResponse.json({ allResults, resultStatus, success: true });
    } else {
      return NextResponse.json({ message: "No config found" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error testing scrape',
      error
    }, { status: 500 });
  }
}
