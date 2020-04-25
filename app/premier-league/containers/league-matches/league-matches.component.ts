import { Component, OnInit } from '@angular/core';
import { PremierLeagueService } from '../../premier-league.service';
import { Matchday } from '../../models/matchday.interface';
import { Match } from '../../models/match.interface';

@Component({
    selector: 'league-matches',
    styleUrls: ['league-matches.component.scss'],
    template: `
        <div
            class="matchday"
            *ngFor="let matchday of matches; let i = index">

            <h2>Matchday {{ i + 1 }}</h2>

            <match-item
                *ngFor="let match of matchday.matches; let i = index; let c = count"
                [match]="match"
                [matchday]="matchday"
                [teamIndex]="i"
                [teamAmount]="c"
                (submitScore)="submitScore($event)"
                (getMatchday)="getMatchday($event)">
            </match-item>
        </div>
    `
})

export class LeagueMatchesComponent implements OnInit{
    constructor(private premierLeagueService: PremierLeagueService) {}

    matches: Matchday[];
    currentMatchday: Matchday;

    ngOnInit() {
        this.premierLeagueService
            .getAllMatchdays()
            .subscribe((data: Matchday[]) => this.matches = data);
    }

    submitScore(match: Match) {
        this.premierLeagueService
            .editMatch(match)
            .subscribe((data: Match) => {
                this.matches.forEach((matchdayToCheck: Matchday) => {
                    matchdayToCheck.matches.forEach((matchToCheck: Match) => {
                        if (matchdayToCheck.id === match.id) {
                            matchToCheck = Object.assign({}, matchToCheck, match);
                        }
                    })
                })
            })
    }

    getMatchday(matchday: Matchday) {
        console.log(matchday);
        this.currentMatchday = matchday;
    }
}

// this.premierLeagueService
        //     .editMatch(match, this.premierLeagueService.getMatchdayByMatch(this.matches, match) )
        //     .subscribe((data: Match) => {
        //         this.matches.forEach((matchday: Matchday) => {
        //             matchday.matches.forEach((matchToCheck: Match) => {
        //                 if (matchToCheck.id === match.id) {
        //                     matchToCheck = Object.assign({}, matchToCheck, match);
        //                 }

        //                 return matchToCheck;
        //             }) 
        //         })
        //     })

    //     this.matches.forEach((matchdayToCheck: Matchday) => {
    //         matchdayToCheck.matches.forEach((matchToCheck: Match) => {
    //             if (matchToCheck.id === match.id) {
    //                 matchToCheck = Object.assign({}, matchToCheck, match);
    //             }

    //             return matchdayToCheck;
    //         })
    //     })

    //    setTimeout(() => {
    //     this.premierLeagueService
    //         .editMatchday(this.currentMatchday)
    //         .subscribe((data: Matchday) => {
    //             this.matches.forEach((matchdayToCheck: Matchday) => {
    //                 if (matchdayToCheck.id = this.currentMatchday.id) {
    //                     matchdayToCheck = Object.assign({}, matchdayToCheck, this.currentMatchday);
    //                 }
    //             })
    //         })

    //    }, 1000);