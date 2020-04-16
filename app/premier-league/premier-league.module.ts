import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// components
import { AddTeamComponent } from './components/add-team/add-team.component';
import { TeamItemComponent } from './components/team-item/team-item.component';

// containers
import { LeagueTableComponent } from './containers/league-table/league-table.component';
import { LeagueMatchesComponent } from './containers/league-matches/league-matches.component';
import { LeagueSettingsComponent } from './containers/league-settings/league-settings.component';

// services
import { PremierLeagueService } from './premier-league.service';

const routes: Routes = [
    { path: '', component: LeagueTableComponent, pathMatch: 'full' },
    { path: 'matches', component: LeagueMatchesComponent },
    { path: 'settings', component: LeagueSettingsComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        RouterModule.forChild(routes),
        HttpModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        AddTeamComponent,
        TeamItemComponent,

        LeagueTableComponent,
        LeagueMatchesComponent,
        LeagueSettingsComponent
    ],
    providers: [
        PremierLeagueService
    ]
})

export class PremierLeagueModule {

}