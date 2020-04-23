import { Component, OnInit } from '@angular/core';
import { PremierLeagueService } from '../../premier-league.service';
import { Matchday } from '../../models/matchday.interface';

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
                [teamIndex]="i"
                [teamAmount]="c">
            </match-item>
        </div>
    `
})

export class LeagueMatchesComponent implements OnInit{
    constructor(private premierLeagueService: PremierLeagueService) {}

    matches: Matchday[];

    ngOnInit() {
        this.premierLeagueService
            .getAllMatchdays()
            .subscribe((data: Matchday[]) => this.matches = data);
    }
}