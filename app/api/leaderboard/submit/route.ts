import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import LeaderboardEntry from '@/lib/models/LeaderboardEntry'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      username,
      avatarUrl,
      year,
      yearsInCode,
      totalContributions,
      longestStreak,
      totalStars,
      topLanguages,
      firstCommitDate,
    } = body

    // Validate required fields
    if (
      !username ||
      !year ||
      yearsInCode === undefined ||
      totalContributions === undefined
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await connectDB()

    // Upsert: update if exists, create if not
    const entry = await LeaderboardEntry.findOneAndUpdate(
      { username, year },
      {
        username,
        avatarUrl,
        year,
        yearsInCode,
        totalContributions,
        longestStreak: longestStreak || 0,
        totalStars: totalStars || 0,
        topLanguages: topLanguages || [],
        firstCommitDate: firstCommitDate
          ? new Date(firstCommitDate)
          : undefined,
        submittedAt: new Date(),
        // hasVerifiedBadge will be updated separately when user purchases badge
      },
      {
        upsert: true,
        new: true,
      }
    )

    return NextResponse.json({
      success: true,
      message: 'Submitted to leaderboard!',
      entry,
    })
  } catch (error: any) {
    console.error('Leaderboard submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit to leaderboard', details: error.message },
      { status: 500 }
    )
  }
}
