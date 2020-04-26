import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Match } from '../../models/match.interface';
import { Matchday } from '../../models/matchday.interface';
import { PremierLeagueService } from '../../premier-league.service';

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
                    {{ match.homeTeam.name }}
                </div>

                <div 
                    class="team-club-logo"
                    [style.background-image]="'url(' + match.homeTeam.club.logoURL + ')'"></div>
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
                    [style.background-image]="'url(' + match.awayTeam.club.logoURL + ')'"></div>

                <span class="team-name away-name">
                    {{ match.awayTeam.name }}
                </span>
            </div>

            <!-- stadium -->
            <div class="stadium">
                <div class="stadium-icon"></div>

                {{ match.homeTeam.club.venue }},

                <span class="city">
                    &nbsp;
                    {{ match.homeTeam.club.city }}
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
                "
                (click)="setScore(); toggleSettingScore()">
                Save
            </button>
        </div>
    `
})

export class MatchItemComponent {
    constructor(private premierLeagueService: PremierLeagueService) {}

    @Input()
    match: Match;

    @Input()
    matchday: Matchday;

    @Input()
    teamIndex: number;

    @Input()
    teamAmount: number;

    // @Output()
    // submitScore: EventEmitter<Match> = new EventEmitter<Match>();

    // @Output()
    // getMatchday: EventEmitter<Matchday> = new EventEmitter<Matchday>();

    @Output()
    editedMatchday: EventEmitter<Matchday> = new EventEmitter<Matchday>();

    settingScore: boolean = false;
    submittedScore: Match = {...this.match};

    setHomeScore(score: number) {
        this.submittedScore.homeTeamScore = score;
    }

    setAwayScore(score: number) {
        this.submittedScore.awayTeamScore = score;
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

            // console.log(this.matchday);

            this.editedMatchday.emit(this.matchday);

            // this.submitScore.emit(this.match);
            // this.getMatchday.emit(this.matchday);
        }
    }

    toggleSettingScore() {
        this.settingScore = !this.settingScore;
    }
}