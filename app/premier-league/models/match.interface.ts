import { Team } from "./team.interface";

export interface Match {
    homeTeamID: number,
    awayTeamID: number,
    venue: string,
    city: string,
    homeTeamScore?: number,
    awayTeamScore?: number,
    id: number
}