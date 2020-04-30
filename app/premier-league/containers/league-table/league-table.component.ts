import { Component, OnInit } from '@angular/core';
import { PremierLeagueService } from '../../premier-league.service';
import { Team } from '../../models/team.interface';
import { Settings } from '../../models/settings.interface';
import { Matchday } from '../../models/matchday.interface';
import { Match } from '../../models/match.interface';

@Component({
    selector: 'league-table',
    styleUrls: ['league-table.component.scss'],
    template: `
        <div
            *ngIf="!seasonSettings?.hasSeasonStarted"
            class="league-teams"
            [ngClass]="{
                'do-not-display': seasonSettings?.hasSeasonStarted
            }">
            <add-team
                (add)="addTeam($event)"></add-team>

            <div class="team-list">
                <team-item
                    *ngFor="let item of teams; let i = index"
                    [team]="item"
                    [teamIndex]="i"
                    (edit)="editTeam($event)"
                    (delete)="deleteTeam($event)"></team-item>
            </div>
        </div>

        <div
            *ngIf="seasonSettings?.hasSeasonStarted"
            class="league-table">

            <div
                *ngIf="isLoading">
                Loading...
            </div>

            <table
                *ngIf="!isLoading" 
                class="table">
                <tr>
                    <th>Position</th>
                    <th class="club">Club</th>
                    <th>Played</th>
                    <th>Won</th>
                    <th>Drawn</th>
                    <th>Lost</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Points</th>
                </tr>
                <tr
                    *ngFor="let team of sortedTeams; let i = index"
                    class="teams"
                    [ngClass]="{
                        'red': i % 2 === 0,
                        'dark-red': i % 2 !== 0,
                        'champion': hasSeasonEnded && i === 0
                    }">
                    <td 
                        class="bold"
                        [ngClass]="{
                            'trophy': hasSeasonEnded && i === 0
                        }"> 
                        {{ hasSeasonEnded && i === 0 ? '🏆' : i + 1 }} 
                    </td>
                    <td class="club-td"> 
                        <div 
                            class="club-logo"
                            [style.background-image]=" 'url(' + team.club.logoURL + ')' "></div>

                        <span class="club-name">
                            {{ team.name }} 
                        </span>
                    </td>
                    <td> {{ team.gamesPlayed }} </td>
                    <td> {{ team.gamesWon }} </td>
                    <td> {{ team.gamesDrawn }} </td>
                    <td> {{ team.gamesLost }} </td>
                    <td> {{ team.goalsScored }} </td>
                    <td> {{ team.goalsConceded }} </td>
                    <td> 
                        {{ 
                            (team.goalsScored - team.goalsConceded) > 0 ? '+' : ''
                        }}{{ team.goalsScored - team.goalsConceded }} 
                    </td>
                    <td class="bold"> {{ team.points }} </td>
                </tr>
            </table>
        </div>
    `
})

export class LeagueTableComponent implements OnInit {
    teams: Team[];
    sortedTeams: Team[];
    matches: Matchday[];
    hasSeasonEnded: boolean = false;
    team: Team;
    seasonSettings: Settings;
    isLoading: boolean = true;

    constructor(private premierLeagueService: PremierLeagueService) {}

    ngOnInit() {
        this.premierLeagueService
            .getAllTeams()
            .subscribe((data: Team[]) => this.teams = data);

        this.premierLeagueService
            .getAllMatchdays()
            .subscribe((data: Matchday[]) => {
                this.matches = data

                let totalMatches = 0;
                let completedMatches = 0;

                data.forEach((matchday: Matchday) => {
                    matchday.matches.forEach((match: Match) => {
                        totalMatches++;

                        if (match.awayTeamScore && match.homeTeamScore) {
                            completedMatches++;
                        }
                    })
                })

                if (completedMatches === totalMatches) {
                    this.hasSeasonEnded = true;
                }
            });

        this.premierLeagueService
            .getAllTeams()
            .subscribe((data: Team[]) => this.sortedTeams = data);  

        this.premierLeagueService
            .getSettings()
            .subscribe((data: Settings) => {
                this.seasonSettings = data;
            });

        setTimeout(() => {
            this.sortTeams();
        }, 250); 
    }

    addTeam(team: Team) {
        this.premierLeagueService
            .addNewTeam(team)
            .subscribe((data: Team) => this.teams.push(team));
    }

    editTeam(team: Team) {
        this.premierLeagueService
            .editTeam(team)
            .subscribe((data: Team) => {
                this.teams = this.teams.map((changeTeam: Team) => {
                    if (changeTeam.id === team.id) {
                        changeTeam = Object.assign({}, changeTeam, team);
                    }

                    return changeTeam;
                })
            });
    }

    deleteTeam(team: Team) {
        this.premierLeagueService
            .deleteTeam(team)
            .subscribe((data: Team) => {
                this.teams = this.teams.filter((checkTeam: Team) => {
                    if (checkTeam.id !== team.id) {
                        return checkTeam;
                    }
                })
            });
    }

    sortTeams() {
        let performanceTime = performance.now();

        
        // setting table

        this.sortedTeams = this.sortedTeams.map((team: Team) => {

            this.matches.forEach((matchday: Matchday) => {
                matchday.matches.forEach((match: Match) => {
                    if (match.awayTeamScore && match.homeTeamScore) {
                        if (team.id === match.homeTeamID) {

                            // games played
                            team.gamesPlayed++;

                            // games won | drawn | lost  |  points 
                            if (match.homeTeamScore > match.awayTeamScore) {
                                team.gamesWon++;
                                team.points += 3;
                            } else if (match.homeTeamScore === match.awayTeamScore) {
                                team.gamesDrawn++;
                                team.points++;
                            } else {
                                team.gamesLost++;
                            }

                            // goals scored | conceded
                            team.goalsScored += +match.homeTeamScore;
                            team.goalsConceded += +match.awayTeamScore;

                        } else if (team.id === match.awayTeamID) {
                            
                            // games played
                            team.gamesPlayed++;

                            // games won | drawn | lost  |  points
                            if (match.awayTeamScore > match.homeTeamScore) {
                                team.gamesWon++;
                                team.points += 3;
                            } else if (match.awayTeamScore === match.homeTeamScore) {
                                team.gamesDrawn++;
                                team.points++
                            } else {
                                team.gamesLost++;
                            }

                            // goals scored | conceded
                            team.goalsScored += +match.awayTeamScore;
                            team.goalsConceded += +match.homeTeamScore;
                        }
                    }
                })
            })

            return team;
        });



        // sort algorithm

        this.sortedTeams.sort((a: Team, b: Team) => {
            return b.points - a.points;
        })

        this.sortedTeams.sort((a: Team, b: Team) => {
            if (b.points === a.points) {
                return (b.goalsScored - b.goalsConceded) - (a.goalsScored - a.goalsConceded);
            }
        })

        this.sortedTeams.sort((a: Team, b: Team) => {
            if (b.points === a.points) {
                if (b.goalsScored - b.goalsConceded === a.goalsScored - a.goalsConceded) {
                    return b.goalsScored - a.goalsScored;
                }
            }
        })

        console.log(`Execution time: ${(performance.now() - performanceTime).toFixed(3)}`);
        this.isLoading = false;
    }
}