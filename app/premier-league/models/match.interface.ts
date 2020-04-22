import { Team } from "./team.interface";

export interface Match {
    homeTeam: Team,
    awayTeam: Team,
    venue: string,
    city: string,
    id: number
}