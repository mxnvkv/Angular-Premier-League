import { Component, Output, EventEmitter } from '@angular/core';
import { v1 as uuidv1 } from 'uuid';
import { Team } from '../../models/team.interface';
import { Club } from '../../models/club.interface';
import { PremierLeagueService } from '../../premier-league.service';

@Component({
    selector: 'add-team',
    styleUrls: ['add-team.component.scss'],
    template: `
        <form 
            (ngSubmit)="submitForm(teamForm.value, teamForm.valid); teamForm.reset()" 
            #teamForm="ngForm" 
            novalidate
            autocomplete="off">

            <div class="form-field">

                Team's name:
                <input
                    type="text"
                    required
                    name="name"
                    #name="ngModel"
                    [ngModel]="team?.name">
            </div>

            <div class="form-field">

                Select your team:
                <select
                    name="club"
                    [ngModel]="team?.club"
                    required>
                    <option
                        *ngFor="let item of premierLeagueTeams"
                        [ngValue]="item">
                        {{ item.clubName }}
                    </option>
                </select>
            </div>

            <button
                type="submit"
                class="submit-button"
                [disabled]="teamForm.invalid">
                Add team
            </button>
        </form>
    `
})

export class AddTeamComponent {
    constructor(private premierLeagueService: PremierLeagueService) {}

    team: Team;

    @Output()
    add: EventEmitter<Team> = new EventEmitter<Team>();

    submitForm(team: Team, isFormValid: boolean) {
        if (isFormValid) {
            let uniqueID = uuidv1();

            team = {
                ...team,
                gamesPlayed: 0,
                gamesWon: 0,
                gamesDrawn: 0,
                gamesLost: 0,
                goalsScored: 0,
                goalsConceded: 0,
                points: 0
            }

            team = Object.assign({}, team, { id: uniqueID })
            this.add.emit(team);
        }
    }

    public premierLeagueTeams: Club[] = this.premierLeagueService.returnPremierLeagueClubs();
}