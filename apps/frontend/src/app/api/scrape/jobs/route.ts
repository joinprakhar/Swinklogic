import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import JobPost from '@/lib/models/JobPost';

// GET /api/scrape/jobs - Get all jobs with optional filters
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const source = url.searchParams.get('source');
    const scrapedFrom = url.searchParams.get('scrapedFrom');
    const scrapedTo = url.searchParams.get('scrapedTo');
    const skills = url.searchParams.get('skills');
    const search = url.searchParams.get('search');

    // Build filter object
    const filter: Record<string, unknown> = {};

    if (source) {
      filter.source = source;
    }

    if (scrapedFrom || scrapedTo) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (filter as any).scrapedAt = {};
      if (scrapedFrom) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (filter as any).scrapedAt.$gte = new Date(scrapedFrom);
      }
      if (scrapedTo) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (filter as any).scrapedAt.$lte = new Date(scrapedTo);
      }
    }

    if (skills) {
      const skillArray = skills.split(',').map(s => s.trim()).filter(s => s);
      if (skillArray.length > 0) {
        filter.skills = { $in: skillArray.map(skill => new RegExp(skill, 'i')) };
      }
    }

    if (search) {
      filter.$or = [
        { title: { $regex: new RegExp(search, 'i') } },
        { company: { $regex: new RegExp(search, 'i') } },
        { description: { $regex: new RegExp(search, 'i') } }
      ];
    }

    // Get all jobs with optional filters
    const jobs = await JobPost.find(filter)
      .sort({ scrapedAt: -1 }) // Sort by most recent first
      .limit(100) // Limit results for performance
      .exec();

    // Get unique sources for filter dropdown
    const uniqueSources = await JobPost.distinct('source');

    // Get total count for pagination info
    const total = await JobPost.countDocuments(filter);

    return NextResponse.json({
      jobs: jobs,
      total: total,
      sources: uniqueSources
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({
      message: 'Error fetching job listings',
      error: (error as Error).message
    }, { status: 500 });
  }
}
