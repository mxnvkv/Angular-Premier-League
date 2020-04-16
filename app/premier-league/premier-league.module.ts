import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// containers
import { LeagueTableComponent } from './containers/league-table/league-table.component';
import { LeagueMatchesComponent } from './containers/league-matches/league-matches.component';
import { LeagueSettingsComponent } from './containers/league-settings/league-settings.component';

const routes: Routes = [
    { path: '', component: LeagueTableComponent, pathMatch: 'full' },
    { path: 'matches', component: LeagueMatchesComponent },
    { path: 'settings', component: LeagueSettingsComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [
        LeagueTableComponent,
        LeagueMatchesComponent,
        LeagueSettingsComponent
    ],
    providers: []
})

export class PremierLeagueModule {

}