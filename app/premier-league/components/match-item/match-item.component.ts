import { Component, Input } from '@angular/core';
import { Match } from '../../models/match.interface';

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

            <!-- score -->
            <div class="score">

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
        </div>
    `
})

export class MatchItemComponent {
    @Input()
    match: Match;

    @Input()
    teamIndex: number;

    @Input()
    teamAmount: number;
}