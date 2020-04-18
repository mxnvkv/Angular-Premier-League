import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Team } from './models/team.interface';

import 'rxjs/add/operator/map';

const TEAMS_API = '/api/teams';

@Injectable()
export class PremierLeagueService {
    constructor(private http: Http) {
        // console.log(this.http);
    }

    getAllTeams(): Observable<Team[]> {
        return this.http
            .get(TEAMS_API)
            .map((response: Response) => response.json());
    }

    addNewTeam(team: Team): Observable<Team> {
        return this.http
            .post(TEAMS_API, team)
            .map((response: Response) => response.json());
    }

    editTeam(team: Team): Observable<Team> {
        return this.http
            .put(`${TEAMS_API}/${team.id}`, team)
            .map((response: Response) => response.json());
    }

    deleteTeam(team: Team): Observable<Team> {
        return this.http
            .delete(`${TEAMS_API}/${team.id}`)
            .map((response: Response) => response.json());
    }

    returnPremierLeagueClubs() {
        return [
            { 
                clubName: 'Liverpool',
                logoURL: '/img/clubs/liverpool.png',
                venue: 'Anfield',
                city: 'Liverpool'
            },
            { 
                clubName: 'Chelsea',
                logoURL: '/img/clubs/chelsea.png',
                venue: 'Stamford Bridge',
                city: 'London'
            },
            { 
                clubName: 'Arsenal',
                logoURL: '/img/clubs/arsenal.png',
                venue: 'Emirates Stadium',
                city: 'London'
            }
        ];
    }
}