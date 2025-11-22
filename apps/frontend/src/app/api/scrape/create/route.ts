import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ScraperConfig from '@/lib/models/scrapeConfig';

// POST /api/scrape/create - Create scrape URL config
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { url, isApi, wrapperSelector, source, selectors } = await request.json();

    if (!url || !source) {
      return NextResponse.json({ err: "URL and source are required" }, { status: 400 });
    }

    if (!isApi && (!wrapperSelector || !selectors)) {
      return NextResponse.json({
        err: "Wrapper selector and selectors are required for non-API sources",
      }, { status: 400 });
    }

    const existingConfig = await ScraperConfig.findOne({ url });
    if (existingConfig) {
      return NextResponse.json({ err: "This configuration already exists" }, { status: 400 });
    }

    const newConfig = await ScraperConfig.create({
      url,
      isApi,
      wrapperSelector,
      source,
      selectors,
    });

    return NextResponse.json({
      message: "Scraper configuration created successfully",
      data: newConfig,
    }, { status: 201 });
  } catch (error) {
    console.error("Error in createScrapeUrl:", (error as Error).message);
    return NextResponse.json({ err: "Internal server error" }, { status: 500 });
  }
}
