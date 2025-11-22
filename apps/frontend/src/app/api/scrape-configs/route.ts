import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ScraperConfig from '@/lib/models/scrapeConfig';

// GET /api/scrape-configs - Get all active configurations
// GET /api/scrape-configs?all=true - Get all configurations including inactive
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const showAll = url.searchParams.get('all') === 'true';

    const query = showAll ? {} : { isActive: true };
    const configs = await ScraperConfig.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: configs,
      count: configs.length
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error fetching configurations',
      error: (error as Error).message
    }, { status: 500 });
  }
}

// POST /api/scrape-configs - Create new configuration
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const {
      url,
      isApi,
      wrapperSelector,
      source,
      isRegular,
      selectors,
      keys,
      urlConfig
    } = body;

    // Basic validation
    if (!url || !source) {
      return NextResponse.json({
        success: false,
        message: 'URL and source are required'
      }, { status: 400 });
    }

    if (!isApi && (!wrapperSelector || !selectors)) {
      return NextResponse.json({
        success: false,
        message: 'Wrapper selector and selectors are required for non-API sources'
      }, { status: 400 });
    }

    if (isApi && (!keys || keys.length === 0)) {
      return NextResponse.json({
        success: false,
        message: 'Keys array is required for API configurations'
      }, { status: 400 });
    }

    // Check if configuration already exists
    const existingConfig = await ScraperConfig.findOne({ url });
    if (existingConfig) {
      return NextResponse.json({
        success: false,
        message: 'Configuration with this URL already exists'
      }, { status: 400 });
    }

    const newConfig = await ScraperConfig.create({
      url,
      isApi,
      wrapperSelector,
      source,
      isRegular: isRegular || false,
      selectors: selectors || {},
      keys: keys || [],
      urlConfig: urlConfig || {}
    });

    return NextResponse.json({
      success: true,
      message: 'Configuration created successfully',
      data: newConfig
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error creating configuration',
      error: (error as Error).message
    }, { status: 500 });
  }
}
