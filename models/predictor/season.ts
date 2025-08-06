import mongoose from 'mongoose';

export interface ISeason {
  apiSeasonId: number; // 2403
  startDate: string; // "2025-08-15"
  endDate: string; // "2026-05-24"
  currentMatchday?: number;
  winner?: string;
}

const SeasonSchema = new mongoose.Schema<ISeason>({
  apiSeasonId: { type: Number, required: true, unique: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  currentMatchday: { type: Number },
  winner: { type: String }
}, {
  timestamps: true
});

export const Season = mongoose.models.Season || mongoose.model<ISeason>('season', SeasonSchema);