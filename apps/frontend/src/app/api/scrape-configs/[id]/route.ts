import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ScraperConfig from '@/lib/models/scrapeConfig';

// GET /api/scrape-configs/[id] - Get single configuration by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const config = await ScraperConfig.findById(id);
    if (!config) {
      return NextResponse.json({
        success: false,
        message: 'Configuration not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: config
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error fetching configuration',
      error: (error as Error).message
    }, { status: 500 });
  }
}

// PUT /api/scrape-configs/[id] - Update configuration
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
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

    const config = await ScraperConfig.findById(id);
    if (!config) {
      return NextResponse.json({
        success: false,
        message: 'Configuration not found'
      }, { status: 404 });
    }

    // Check if URL is being changed and if it conflicts with another config
    if (url && url !== config.url) {
      const existingConfig = await ScraperConfig.findOne({ url });
      if (existingConfig) {
        return NextResponse.json({
          success: false,
          message: 'Another configuration with this URL already exists'
        }, { status: 400 });
      }
    }

    const updatedConfig = await ScraperConfig.findByIdAndUpdate(
      id,
      {
        url: url || config.url,
        isApi: isApi !== undefined ? isApi : config.isApi,
        wrapperSelector: wrapperSelector || config.wrapperSelector,
        source: source || config.source,
        isRegular: isRegular !== undefined ? isRegular : config.isRegular,
        selectors: selectors || config.selectors,
        keys: keys || config.keys,
        urlConfig: urlConfig || config.urlConfig
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Configuration updated successfully',
      data: updatedConfig
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error updating configuration',
      error: (error as Error).message
    }, { status: 500 });
  }
}

// PATCH /api/scrape-configs/[id]/toggle - Toggle configuration active status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const config = await ScraperConfig.findById(id);
    if (!config) {
      return NextResponse.json({
        success: false,
        message: 'Configuration not found'
      }, { status: 404 });
    }

    const updatedConfig = await ScraperConfig.findByIdAndUpdate(
      id,
      { isActive: !config.isActive },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: `Configuration ${updatedConfig!.isActive ? 'activated' : 'deactivated'} successfully`,
      data: updatedConfig
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error toggling configuration status',
      error: (error as Error).message
    }, { status: 500 });
  }
}
