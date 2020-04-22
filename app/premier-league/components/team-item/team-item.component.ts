import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Team } from '../../models/team.interface';
import { PremierLeagueService } from '../../premier-league.service';
import { Club } from '../../models/club.interface';

@Component({
    selector: 'team-item',
    styleUrls: ['team-item.component.scss'],
    template: `
        <div 
            class="team"
            [ngClass]="{
                'red': teamIndex % 2 === 0,
                'dark-red': teamIndex % 2 !== 0
            }"> 
            
            <!-- Club's logo -->

            <div class="club-logo"
                [style.background-image]="'url(' + team.club.logoURL + ')'"></div>

            <!-- Team's name -->
            
            <div *ngIf="!isEditing" class="team-name">
                {{ team.name }}
            </div>

            <input 
                *ngIf="isEditing"
                class="team-name-input"
                [value]="team?.name"
                (input)="changeName(name.value)"
                #name>

            <!-- Change club's logo -->
            
            <!-- 
                Issue:

                It is impossible to bind team's club
                to then club in the options

                However, if we use [value] && [selected]
                everything works fine, except that we cannot
                bind object to [value], only strings

                <select
                    *ngIf="isEditing"
                    name="club"
                    #club="ngModel"
                    [ngModel]="team?.club">
                    Change club's logo
                    <option
                        *ngFor="let item of premierLeagueTeams"
                        [value]="item"
                        [selected]="item === team?.club">
                        {{ item.club }}
                    </option>
                </select> 
             -->

            <select
                *ngIf="isEditing"
                class="team-club-change"
                name="club"
                [(ngModel)]="team.club"
                (ngModelChange)="changeTeam($event)">
                Change club's logo
                <option
                    *ngFor="let item of premierLeagueTeams"
                    [ngValue]="item">
                    {{ item.clubName }}
                </option>
            </select>
            
            <div class="buttons">
                <button *ngIf="!isEditing" (click)="toggleEdit()">
                    Edit
                </button>

                <button *ngIf="isEditing" (click)="toggleEdit()">
                    Save
                </button>

                <button (click)="deleteTeam()">Delete</button>
            </div>
        </div>
    `
})

export class TeamItemComponent {
    constructor(private premierLeagueService: PremierLeagueService) {}

    @Input()
    team: Team;

    @Input()
    teamIndex: number;

    @Output()
    edit: EventEmitter<Team> = new EventEmitter<Team>();

    @Output()
    delete: EventEmitter<Team> = new EventEmitter<Team>();


    isEditing: boolean;
    premierLeagueTeams: Club[] = this.premierLeagueService.returnPremierLeagueClubs();

    toggleEdit() {
        if (this.isEditing) {
            this.edit.emit(this.team);
        }

        this.isEditing = !this.isEditing;
    }

    changeName(name: string) {
        this.team.name = name;
    }

    changeTeam(club) {
        this.team.club = club;
    }

    deleteTeam() {
        this.delete.emit(this.team);
    }
}

