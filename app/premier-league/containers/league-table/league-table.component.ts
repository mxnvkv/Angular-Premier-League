import { Component, OnInit } from '@angular/core';
import { PremierLeagueService } from '../../premier-league.service';
import { Team } from '../../models/team.interface';

@Component({
    selector: 'league-table',
    styleUrls: ['league-table.component.scss'],
    template: `
        <div class="league-table">
            <add-team
                (add)="addTeam($event)"></add-team>

            <div class="team-list">
                <team-item
                    *ngFor="let item of teams; let i = index"
                    [team]="item"
                    [teamIndex]="i"
                    (edit)="editTeam($event)"
                    (delete)="deleteTeam($event)"></team-item>
            </div>
        </div>
    `
})

export class LeagueTableComponent implements OnInit {
    teams: Team[];
    team: Team;

    constructor(private premierLeagueService: PremierLeagueService) {}

    ngOnInit() {
        this.premierLeagueService
            .getAllTeams()
            .subscribe((data: Team[]) => this.teams = data);
    }

    addTeam(team: Team) {
        this.premierLeagueService
            .addNewTeam(team)
            .subscribe((data: Team) => this.teams.push(team));
    }

    editTeam(team: Team) {
        this.premierLeagueService
            .editTeam(team)
            .subscribe((data: Team) => {
                this.teams = this.teams.map((changeTeam: Team) => {
                    if (changeTeam.id === team.id) {
                        changeTeam = Object.assign({}, changeTeam, team);
                    }

                    return changeTeam;
                })
            });
    }

    deleteTeam(team: Team) {
        this.premierLeagueService
            .deleteTeam(team)
            .subscribe((data: Team) => {
                this.teams = this.teams.filter((checkTeam: Team) => {
                    if (checkTeam.id !== team.id) {
                        return checkTeam;
                    }
                })
            });
    }
}