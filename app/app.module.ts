import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { PremierLeagueModule } from '../app/premier-league/premier-league.module'

import { LeagueNavigationComponent } from './premier-league/containers/league-navigation/league-navigation.component';
import { NotFoundComponent } from './premier-league/containers/not-found/not-found.component';

const routes: Routes = [
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LeagueNavigationComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    PremierLeagueModule
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {

}