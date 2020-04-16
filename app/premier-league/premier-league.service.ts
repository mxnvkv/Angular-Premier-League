import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Team } from './models/team.interface';

import 'rxjs/add/operator/map';

const TEAMS_API = '/api/teams';

@Injectable()
export class PremierLeagueService {
    constructor(private http: Http) {
        console.log(this.http);
    }

    getAllTeams(): Observable<Team[]> {
        return this.http
            .get(TEAMS_API)
            .map((response: Response) => response.json());
    }

    addNewTeam(team: Team): Observable<Team> {
        return this.http
            .post(TEAMS_API, team)
            .map((response: Response) => response.json())
    }
}