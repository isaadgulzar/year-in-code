import mongoose, { Schema, Document } from 'mongoose'

export interface ILeaderboardEntry extends Document {
  username: string
  avatarUrl?: string
  year: number
  yearsInCode: number
  totalContributions: number
  longestStreak: number
  totalStars: number
  topLanguages: string[]
  firstCommitDate?: Date
  hasVerifiedBadge: boolean
  submittedAt: Date
}

const LeaderboardEntrySchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
  },
  avatarUrl: String,
  year: {
    type: Number,
    required: true,
    index: true,
  },
  yearsInCode: {
    type: Number,
    required: true,
  },
  totalContributions: {
    type: Number,
    required: true,
    index: true, // For ranking
  },
  longestStreak: {
    type: Number,
    default: 0,
    index: true, // For ranking
  },
  totalStars: {
    type: Number,
    default: 0,
    index: true, // For ranking
  },
  topLanguages: {
    type: [String],
    default: [],
  },
  firstCommitDate: Date,
  hasVerifiedBadge: {
    type: Boolean,
    default: false,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
})

// Compound index: each user can have one entry per year
LeaderboardEntrySchema.index({ username: 1, year: 1 }, { unique: true })

export default mongoose.models.LeaderboardEntry ||
  mongoose.model<ILeaderboardEntry>('LeaderboardEntry', LeaderboardEntrySchema)
