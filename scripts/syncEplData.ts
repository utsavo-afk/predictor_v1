import mongoose from "mongoose";
import { env } from "@/env";
import { Team } from "@/models/predictor/team";
import { Season } from "@/models/predictor/season";
import { Competition } from "@/models/predictor/competition";
import { connectToDb } from "@/db";

const API_TOKEN = env.FOOTBALL_DATA_ORG_API_TOKEN;
const API_BASE_URL = 'http://api.football-data.org/v4';

function extractPrimaryColor(clubColors: string): string | undefined {
  if (!clubColors) return undefined;
  
  const colorMap: Record<string, string> = {
    'red': '#DC2626',
    'blue': '#2563EB',
    'claret': '#7C2D12',
    'navy': '#1E293B',
    'sky blue': '#0EA5E9',
    'royal blue': '#1D4ED8',
    'white': '#FFFFFF',
    'black': '#000000',
    'gold': '#F59E0B'
  };

  const colors = clubColors.toLowerCase();
  for (const [colorName, hexValue] of Object.entries(colorMap)) {
    if (colors.includes(colorName)) {
      return hexValue;
    }
  }
  return undefined;
}

// interface ApiResponse {
//   count: number;
//   filters: {
//     season: number;
//   };
//   competition: {
//     id: number;
//     name: string;
//     code: string;
//     type: string;
//     emblem: string;
//   };
//   season: {
//     id: number;
//     startDate: string;
//     endDate: string;
//     currentMatchday: number;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     winner: any;
//   };
//   teams: Array<{
//     area: {
//       id: number;
//       name: string;
//       code: string;
//       flag: string;
//     };
//     id: number;
//     name: string;
//     shortName: string;
//     tla: string;
//     crest: string;
//     address: string;
//     website: string;
//     founded: number;
//     clubColors: string;
//     venue: string;
//     coach?: {
//       name: string;
//     };
//   }>;
// }

interface SyncResult {
  success: boolean;
  synced?: number;
  errors?: string[];
  competitionId?: mongoose.Types.ObjectId;
  seasonId?: mongoose.Types.ObjectId;
}

async function syncPremierLeagueData(season: number = 2025, competitionCode: string = 'PL'):Promise<SyncResult> {
  await connectToDb();
  
  try {
    console.log(`🚀 Starting sync for ${competitionCode} ${season} season...`);
    
    // Fetch data from API
    const response = await fetch(
      `${API_BASE_URL}/competitions/${competitionCode}/teams?season=${season}`,
      {
        headers: {
          'X-Auth-Token': API_TOKEN
        }
      }
    );

    const data = await response.json();
    console.log(`📊 Found ${data.teams.length} teams to sync`);

    // 1. Save Competition
    const savedCompetition = await Competition.findOneAndUpdate(
      { apiCompetitionId: data.competition.id },
      {
        apiCompetitionId: data.competition.id,
        name: data.competition.name,
        code: data.competition.code,
        type: data.competition.type,
        emblem: data.competition.emblem
      },
      { upsert: true, new: true }
    );
    console.log(`✅ Competition: ${savedCompetition.name}`);

    // 2. Save Season
    const savedSeason = await Season.findOneAndUpdate(
      { apiSeasonId: data.season.id },
      {
        apiSeasonId: data.season.id,
        startDate: data.season.startDate,
        endDate: data.season.endDate,
        currentMatchday: data.season.currentMatchday,
        winner: data.season.winner?.name || null
      },
      { upsert: true, new: true }
    );
    console.log(`✅ Season: ${savedSeason.apiSeasonId}`);

    // 3. Save Teams
    let syncedCount = 0;
    for (const apiTeam of data.teams) {
      // Check existing team to preserve competitions/seasons arrays
      const existingTeam = await Team.findOne({ apiTeamId: apiTeam.id });
      
      let competitions = [savedCompetition._id];
      let seasons = [savedSeason._id];
      
      if (existingTeam) {
        // Add new competition/season if not already present
        if (!existingTeam.competitions.includes(savedCompetition._id)) {
          competitions = [...existingTeam.competitions, savedCompetition._id];
        } else {
          competitions = existingTeam.competitions;
        }
        
        if (!existingTeam.seasons.includes(savedSeason._id)) {
          seasons = [...existingTeam.seasons, savedSeason._id];
        } else {
          seasons = existingTeam.seasons;
        }
      }

      await Team.findOneAndUpdate(
        { apiTeamId: apiTeam.id },
        {
          name: apiTeam.name,
          shortName: apiTeam.shortName,
          tla: apiTeam.tla,
          logoUrl: apiTeam.crest,
          apiTeamId: apiTeam.id,
          venue: apiTeam.venue,
          founded: apiTeam.founded,
          website: apiTeam.website,
          clubColors: extractPrimaryColor(apiTeam.clubColors),
          coachName: apiTeam.coach?.name,
          address: apiTeam.address,
          competitions,
          seasons
        },
        { upsert: true, new: true }
      );
      
      syncedCount++;
      console.log(`✅ Team: ${apiTeam.name}`);
    }

    console.log(`🎉 Sync completed! ${syncedCount} teams synced`);
    return { success: true, synced: syncedCount, errors: [], competitionId: savedCompetition._id, seasonId: savedSeason._id };

  } catch (error) {
    console.error('❌ Sync failed:', error);
    return { success: false };
  }
}

async function main(){
    try {
        await syncPremierLeagueData();
        process.exit(0)
    } catch (error) {
        console.error('❌ Error occurred while syncing:', error);
    }
}

main().catch(console.error);