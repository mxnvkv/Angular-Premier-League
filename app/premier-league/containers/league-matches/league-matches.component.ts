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
                (editedMatchday)="editMatchday($event)">
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

    editMatchday(matchday: Matchday) {
        this.premierLeagueService
            .editMatchday(matchday)
            .subscribe((data: Matchday) => {
                this.matches = this.matches.map((el: Matchday) => {
                    if (el.id === matchday.id) {
                        el = Object.assign({}, el, matchday);
                    }

                    return el;
                })
            })
    }

    submitScore(match: Match) {
        // setTimeout(() => {
        //     this.premierLeagueService
        //         .editMatchday(this.currentMatchday)
        //         .subscribe((data: Matchday) => {

        //             this.matches = this.matches.map((el: Matchday) => {
        //                 if (el.id === this.currentMatchday.id) {
        //                     el.matches = el.matches.map((m: Match) => {
        //                         m.homeTeam.name = 'test';
        //                         return m;
        //                     })
        //                 }
        //                 return el;
        //             })
                    
        //         });
        // }, 100)
    }

    getMatchday(matchday: Matchday) {
        // this.currentMatchday = matchday;
    }
}