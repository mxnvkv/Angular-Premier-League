import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Team } from '../../models/team.interface';

@Component({
    selector: 'team-item',
    styleUrls: ['team-item.component.scss'],
    template: `
        <form 
            class="team"
            [ngClass]="{
                'red': teamIndex % 2 === 0,
                'dark-red': teamIndex % 2 !== 0
            }"> 

            <div class="club-logo"
                [style.background-image]="'url(' + team.club.logoURL + ')'"></div>

            <div class="team-name">
                {{ team.name }}
            </div>
        </form>
    `
})

export class TeamItemComponent {
    @Input()
    team: Team;

    @Input()
    teamIndex: number;
}