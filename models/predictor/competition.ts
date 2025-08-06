import mongoose from "mongoose";

export interface ICompetition {
  apiCompetitionId: number; // 2021
  name: string; // "Premier League"
  code: string; // "PL"
  type: string; // "LEAGUE"
  emblem?: string;
}

const CompetitionSchema = new mongoose.Schema<ICompetition>({
  apiCompetitionId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  type: { type: String, required: true },
  emblem: { type: String }
}, {
  timestamps: true
});

export const Competition = mongoose.models.Competition || mongoose.model<ICompetition>('competition', CompetitionSchema);