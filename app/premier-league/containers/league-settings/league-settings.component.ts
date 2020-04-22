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
        </div>

        <button [disabled]="!matches" (click)="deleteSchedule()">Delet table</button>

        <div 
            class="schedule"
            *ngFor="let matchday of matches; let i = index">
            Matchday {{ i + 1 }}
            <br>
            <div
                *ngFor="let match of matchday.matches">
                {{ match.homeTeam.name }} - {{ match.awayTeam.name }}
            </div>
        </div> 
    `
})

export class LeagueSettingsComponent implements OnInit {
    teams: Team[];
    matches: Matchday[];

    constructor(private premierLeagueService: PremierLeagueService) {}

    ngOnInit() {
        this.premierLeagueService
            .getAllTeams()
            .subscribe((data: Team[]) => this.teams = data)

        setTimeout(() => {
            this.premierLeagueService
                .getAllMatchdays()
                .subscribe((data: Matchday[]) => this.matches = data)
        }, 10)
    }

    startSeason() {
        // this.teams = this.teams.sort(() => Math.random() - 0.5);

        // we will use round robin algorithm
        // to create schedule for the season
        // https://nrich.maths.org/1443

        if (this.teams.length % 2 === 0) {

            let swapFirstPair = true; // last team won't have all Home matches
            
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

                matchday.matches.push(match);
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

                    matchday.matches.push(match);
                    swapTeams = !swapTeams;

                } while(teams.length)

                // adding matchday to DB
                this.premierLeagueService
                    .addMatchday(matchday)
                    .subscribe((data: Matchday) => this.matches.push(matchday))

                // taking last team
                let fixedPositionTeam = this.teams.pop(); 

                // moving each team to the next position
                let lastTeam = this.teams.pop();
                this.teams.unshift(lastTeam);

                // returning last team
                this.teams.push(fixedPositionTeam);
            }

        } else {
            // odd length

            for (let i = 0; i < this.teams.length; i++) {
                
                // taking first team to create pairs
                let restTeam = this.teams.shift();
                console.log(restTeam);

                let teams = [...this.teams];
                let match: Match;

                let matchday: Matchday = {
                    id: uuidv1(),
                    matches: []
                };
                
                let swapTeams = true; // for fixed H/A schedule
                let team1: Team, team2: Team;


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

                    matchday.matches.push(match);

                    swapTeams = !swapTeams;
                } while(teams.length)

                this.premierLeagueService
                    .addMatchday(matchday)
                    .subscribe((data: Matchday) => this.matches.push(matchday))

                // returning first team
                this.teams.unshift(restTeam);

                // moving each team to the next position
                let lastTeam = this.teams.pop();
                this.teams.unshift(lastTeam);
            }
        }

        // second half
        setTimeout(() => {
            this.reverseSchedule(this.matches);
        }, 100);
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

    reverseSchedule(firstHalfSeason: Matchday[]) {

        firstHalfSeason.forEach((matchday: Matchday) => {
            let reversedMatchday: Matchday = {
                id: uuidv1(),
                matches: []
            };

            matchday.matches.forEach((match: Match) => {
                let reversedMatch: Match = {
                    homeTeam: match.awayTeam,
                    awayTeam: match.homeTeam,
                    venue: match.awayTeam.club.venue,
                    city: match.awayTeam.club.city,
                    id: uuidv1()
                };

                reversedMatchday.matches.push(reversedMatch);
            })

            this.premierLeagueService
                .addMatchday(reversedMatchday)
                .subscribe((data: Matchday) => this.matches.push(reversedMatchday));
        })
    }
}
