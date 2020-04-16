import { Component } from '@angular/core';

interface Navigation {
    link: string,
    name: string,
    exact: boolean
}

@Component({
    selector: 'league-navigation',
    styleUrls: ['league-navigation.component.scss'],
    template: `
        <header class="header">
            <!-- Premier League logo -->
        </header>
        <nav class="navigation">
            <a
                *ngFor="let item of navigation"
                [routerLink]="item.link"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: item.exact }">
                {{ item.name }}    
            </a>
        </nav>
    `
})

export class LeagueNavigationComponent {
    navigation: Navigation[] = [
        {
            link: '/',
            name: 'Table',
            exact: true
        },
        {
            link: '/matches',
            name: 'Matches',
            exact: false
        },
        {
            link: '/settings',
            name: 'Settings',
            exact: false
        }
    ];
}