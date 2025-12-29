import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import LeaderboardEntry from '@/lib/models/LeaderboardEntry'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const year = searchParams.get('year') || new Date().getFullYear().toString()
    const category = searchParams.get('category') || 'contributions' // contributions, streak, years
    const limit = parseInt(searchParams.get('limit') || '100')
    const search = searchParams.get('search') || ''

    await connectDB()

    // Build query
    const query: any = { year: parseInt(year) }
    if (search) {
      query.username = { $regex: search, $options: 'i' }
    }

    // Determine sort order based on category
    let sortField = {}
    switch (category) {
      case 'streak':
        sortField = { longestStreak: -1, totalContributions: -1 }
        break
      case 'years':
        sortField = { yearsInCode: -1, totalContributions: -1 }
        break
      case 'stars':
        sortField = { totalStars: -1, totalContributions: -1 }
        break
      default: // contributions
        sortField = { totalContributions: -1, longestStreak: -1 }
    }

    const entries = await LeaderboardEntry.find(query)
      .sort(sortField)
      .limit(limit)
      .select('-__v')
      .lean()

    // Get total count for this year
    const totalCount = await LeaderboardEntry.countDocuments({
      year: parseInt(year),
    })

    return NextResponse.json({
      success: true,
      entries,
      totalCount,
      year: parseInt(year),
      category,
    })
  } catch (error: any) {
    console.error('Leaderboard fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard', details: error.message },
      { status: 500 }
    )
  }
}
