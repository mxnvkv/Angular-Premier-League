import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Match } from '../../models/match.interface';
import { Matchday } from '../../models/matchday.interface';
import { PremierLeagueService } from '../../premier-league.service';
import { Team } from '../../models/team.interface';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
    selector: 'match-item',
    styleUrls: ['match-item.component.scss'],
    template: `
        <div class="match"
            [ngClass]="{
                'no-border-bottom': teamIndex + 1 === teamAmount,
                'red': teamIndex % 2 === 0,
                'dark-red': teamIndex % 2 !== 0
            }">

            <!-- home team -->
            <div class="team">
                <div class="team-name home-name">
                    {{ homeTeam?.name }}
                </div>

                <div 
                    class="team-club-logo"
                    [style.background-image]="'url(' + homeTeam?.club.logoURL + ')'"></div>
            </div>

            <!-- displaying score -->
            <div
                *ngIf="!settingScore" 
                class="score">
                <span 
                    class="score-home">
                    {{ match.homeTeamScore }}
                </span>
                
                <div class="score-separator"></div>

                <span 
                    class="score-away">
                    {{ match.awayTeamScore }}
                </span>
            </div>

            <!-- setting score -->
            <div
                *ngIf="settingScore"  
                class="score">

                <input
                    type="text"
                    name="homeTeamScore"
                    #homeTeamScore
                    (input)="setHomeScore(homeTeamScore.value)"
                    autocomplete="off">
                
                <div class="score-separator"></div>

                <input
                    type="text"
                    name="awayTeamScore"
                    #awayTeamScore
                    (input)="setAwayScore(awayTeamScore.value)"
                    autocomplete="off">
            </div>

            <!-- away team -->
            <div class="team">
                <div 
                    class="team-club-logo"
                    [style.background-image]="'url(' + awayTeam?.club.logoURL + ')'"></div>

                <span class="team-name away-name">
                    {{ awayTeam?.name }}
                </span>
            </div>

            <!-- stadium -->
            <div class="stadium">
                <div class="stadium-icon"></div>

                {{ homeTeam?.club.venue }},

                <span class="city">
                    &nbsp;
                    {{ homeTeam?.club.city }}
                </span>
            </div>

            <button 
                *ngIf="!settingScore && !match.homeTeamScore && !match.awayTeamScore"
                class="set-score"
                (click)="toggleSettingScore()">
                Set score
            </button>

            <button 
                *ngIf="settingScore && !match.homeTeamScore && !match.awayTeamScore"
                type="submit"
                class="set-score"
                [disabled]="
                    !submittedScore.homeTeamScore && submittedScore.awayTeamScore
                    || submittedScore.homeTeamScore && !submittedScore.awayTeamScore
                    || !validInputs
                "
                (click)="setScore(); toggleSettingScore();">
                Save
            </button>
        </div>
    `
})

export class MatchItemComponent implements OnInit {
    constructor(private premierLeagueService: PremierLeagueService) {}

    ngOnInit() {
        this.premierLeagueService
            .getAllTeams()
            .subscribe((data: Team[]) => {
                this.teams = data;

                this.homeTeam = this.teams.filter((team: Team) => team.id === this.match.homeTeamID)[0];
                this.awayTeam = this.teams.filter((team: Team) => team.id === this.match.awayTeamID)[0];
            });
    }

    @Input()
    match: Match;

    @Input()
    matchday: Matchday;

    @Input()
    teamIndex: number;

    @Input()
    teamAmount: number;

    @Output()
    editedMatchday: EventEmitter<Matchday> = new EventEmitter<Matchday>();

    teams: Team[];
    homeTeam: Team;
    awayTeam: Team;
    settingScore: boolean = false;
    submittedScore: Match = {...this.match};
    validInputs: boolean = true;
    specialSymbols = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;


    setHomeScore(score: number) {
        if (isNaN(score) || score % 1 !== 0 || this.specialSymbols.test(score.toString())) {
            this.validInputs = false;
        } else {
            this.submittedScore.homeTeamScore = score;
            this.validInputs = true;
        }
    }

    setAwayScore(score: number) {
        if (isNaN(score) || score % 1 !== 0 || this.specialSymbols.test(score.toString())) {
            this.validInputs = false;
        } else {
            this.submittedScore.awayTeamScore = score;
            this.validInputs = true;
        }
    }

    setScore() {
        if (this.submittedScore.homeTeamScore && this.submittedScore.awayTeamScore) {
            this.match = { ...this.match, ...this.submittedScore };

            this.matchday.matches = this.matchday.matches.map((el: Match) => {
                if (el.id === this.match.id) {
                    el = Object.assign({}, el, this.match);
                }

                return el;
            })

            this.editedMatchday.emit(this.matchday);
        }
    }

    toggleSettingScore() {
        this.settingScore = !this.settingScore;
    }
}