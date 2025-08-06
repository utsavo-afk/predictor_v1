import mongoose from 'mongoose';

export interface ITeam {
  name: string;
  shortName: string; // "MUN", "LIV"
  tla: string; // "ARS", "LIV", "MUN"
  logoUrl?: string;
  primaryColor?: string;
  apiTeamId?: number;
  venue?: string;
  founded?: number;
  website?: string;
  clubColors?: string;
  coachName?: string;
  address?: string;
  competitions: mongoose.Types.ObjectId[]; // Array of competition ObjectIds
  seasons: mongoose.Types.ObjectId[]; // Array of season ObjectIds
}

const TeamSchema = new mongoose.Schema<ITeam>({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  tla: { type: String, required: true },
  logoUrl: { type: String },
  primaryColor: { type: String },
  apiTeamId: { type: Number,required: true, unique: true },
  venue: { type: String },
  founded: { type: Number },
  website: { type: String },
  clubColors: { type: String },
  coachName: { type: String },
  address: { type: String },
  competitions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'competition' }],
  seasons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'season' }]
}, {
  timestamps: true
});

export const Team = mongoose.models.Team || mongoose.model<ITeam>('team', TeamSchema);