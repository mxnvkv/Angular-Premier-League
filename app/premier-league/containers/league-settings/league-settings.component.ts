import { Component, OnInit } from '@angular/core';
import { PremierLeagueService } from '../../premier-league.service';
import { v1 as uuidv1 } from 'uuid';
import { Team } from '../../models/team.interface';
import { Match } from '../../models/match.interface';
import { Matchday } from '../../models/matchday.interface';

@Component({
    selector: 'league-settings',
    styleUrls: ['league-settings.component.scss'],
    template: `
        <div class="settings">

            <div class="start-season">
                <div class="container">
                    <h2>Start season</h2>

                    <button (click)="startSeason()">Let's go!</button>
                </div>

                <img class="background" src="/img/header-bg.png">
                <div class="players-bg"></div>

            </div>


            <div class="delete-all">
                <h2>Want to start over?</h2>

                <button 
                    class="delete-button"
                    [disabled]="!matches" 
                    (click)="deleteSchedule()">
                    Delete everything
                </button>
            </div>
        </div>

        <!-- <div 
            class="schedule"
            *ngFor="let matchday of matches; let i = index">
            Matchday {{ i + 1 }}
            <br>
            <div
                *ngFor="let match of matchday.matches">
                {{ match.homeTeam.name }} - {{ match.awayTeam.name }}
            </div>
        </div>  -->
    `
})

export class LeagueSettingsComponent implements OnInit {
    constructor(private premierLeagueService: PremierLeagueService) {}

    teams: Team[];
    matches: Matchday[];

    ngOnInit() {
        this.premierLeagueService
            .getAllTeams()
            .subscribe((data: Team[]) => this.teams = data)

        this.premierLeagueService
            .getAllMatchdays()
            .subscribe((data: Matchday[]) => this.matches = data)
    }

    startSeason() {
        // this.teams = this.teams.sort(() => Math.random() - 0.5);

        // we will use round robin algorithm
        // to create schedule for the season
        // https://nrich.maths.org/1443

        if (this.teams.length % 2 === 0) {

            let swapFirstPair = true; // last team won't have all Home matches
            let reversedHalfSeason: Matchday[] = [];
            
            // first half of the season
            for (let i = 0; i < this.teams.length - 1; i++) {

                let teams = [...this.teams];
                let match: Match;

                let matchday: Matchday = {
                    id: uuidv1(),
                    matches: []
                };

                let swapTeams = true; // for fixed H/A schedule 
                let team1: Team, team2: Team;

                // for second half of the season

                let reversedMatch: Match;
                let reversedMatchday: Matchday = {
                    id: uuidv1(),
                    matches: []
                }


                // first pair
                
                if (swapFirstPair) {
                    team1 = teams.pop();
                    team2 = teams.shift();
                } else {
                    team1 = teams.shift();
                    team2 = teams.pop();
                }

                match = {
                    homeTeam: team1,
                    awayTeam: team2,
                    venue: team1.club.venue,
                    city: team1.club.city,
                    id: uuidv1()
                }

                reversedMatch = {
                    homeTeam: team2,
                    awayTeam: team1,
                    venue: team2.club.venue,
                    city: team2.club.city,
                    id: uuidv1()
                }

                matchday.matches.push(match);
                reversedMatchday.matches.push(reversedMatch);

                swapFirstPair = !swapFirstPair;

                team1 = null;
                team2 = null;
                match = null;


                // rest pairs

                do {
                    if (swapTeams) {
                        team1 = teams.pop();
                        team2 = teams.shift();
                    } else {
                        team1 = teams.shift();
                        team2 = teams.pop();
                    }

                    match = {
                        homeTeam: team1,
                        awayTeam: team2,
                        venue: team1.club.venue,
                        city: team1.club.city,
                        id: uuidv1()
                    }

                    reversedMatch = {
                        homeTeam: team2,
                        awayTeam: team1,
                        venue: team2.club.venue,
                        city: team2.club.city,
                        id: uuidv1()
                    }

                    matchday.matches.push(match);
                    reversedMatchday.matches.push(reversedMatch);

                    // console.log(reversedMatch);

                    swapTeams = !swapTeams;

                } while(teams.length)

                // adding matchday to DB
                this.premierLeagueService
                    .addMatchday(matchday)
                    .subscribe((data: Matchday) => this.matches.push(matchday))

                // adding reversed matchday to array
                reversedHalfSeason.push(reversedMatchday);

                // taking last team
                let fixedPositionTeam = this.teams.pop(); 

                // moving each team to the next position
                let lastTeam = this.teams.pop();
                this.teams.unshift(lastTeam);

                // returning last team
                this.teams.push(fixedPositionTeam);
            }

            // adding reversed matchdays to DB
            reversedHalfSeason.forEach((reversedMatchday: Matchday) => {
                this.premierLeagueService
                    .addMatchday(reversedMatchday)
                    .subscribe((data: Matchday) => this.matches.push(reversedMatchday))
            })

        } else {
            // odd length

            let reversedHalfSeason: Matchday[] = [];

            // first half of the season
            for (let i = 0; i < this.teams.length; i++) {
                
                // taking first team to create pairs
                let restTeam = this.teams.shift();

                let teams = [...this.teams];
                let match: Match;

                let matchday: Matchday = {
                    id: uuidv1(),
                    matches: []
                };
                
                let swapTeams = true; // for fixed H/A schedule
                let team1: Team, team2: Team;

                // for second half of the season

                let reversedMatch: Match;
                let reversedMatchday: Matchday = {
                    id: uuidv1(),
                    matches: []
                }


                // creating pairs
                do {
                    if (swapTeams) {
                        team1 = teams.pop();
                        team2 = teams.shift();
                    } else {
                        team1 = teams.shift();
                        team2 = teams.pop();
                    }

                    match = {
                        homeTeam: team1,
                        awayTeam: team2,
                        venue: team1.club.venue,
                        city: team1.club.city,
                        id: uuidv1()
                    }

                    reversedMatch = {
                        homeTeam: team2,
                        awayTeam: team1,
                        venue: team2.club.venue,
                        city: team2.club.city,
                        id: uuidv1()
                    }

                    matchday.matches.push(match);
                    reversedMatchday.matches.push(reversedMatch);

                    swapTeams = !swapTeams;
                } while(teams.length)

                // adding matchday to DB
                this.premierLeagueService
                    .addMatchday(matchday)
                    .subscribe((data: Matchday) => this.matches.push(matchday))

                // adding reversed matchday to array
                reversedHalfSeason.push(reversedMatchday);

                // returning first team
                this.teams.unshift(restTeam);

                // moving each team to the next position
                let lastTeam = this.teams.pop();
                this.teams.unshift(lastTeam);
            }

            // adding reversed matchdays to DB
            reversedHalfSeason.forEach((reversedMatchday: Matchday) => {
                this.premierLeagueService
                    .addMatchday(reversedMatchday)
                    .subscribe((data: Matchday) => this.matches.push(reversedMatchday))
            })
        }
    }

    deleteSchedule() {
        this.matches.forEach( match => {
            this.premierLeagueService
                .deleteMatchday(match)
                .subscribe((data: Matchday) => {
                    this.matches = this.matches.filter( el => el.id !== match.id )
                });
        })
    }
}
