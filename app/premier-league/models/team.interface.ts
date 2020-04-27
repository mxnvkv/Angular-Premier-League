import { Club } from "./club.interface";

export interface Team {
    name: string,
    club: Club,
    gamesPlayed: number,
    gamesWon: number,
    gamesDrawn: number,
    gamesLost: number,
    goalsScored: number,
    goalsConceded: number,
    points: number,
    id: number
}