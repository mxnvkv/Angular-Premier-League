import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Team } from './models/team.interface';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { forkJoin } from 'rxjs/observable/forkJoin';  

import { Match } from './models/match.interface';
import { Matchday } from './models/matchday.interface';
import { Settings } from './models/settings.interface';

const TEAMS_API = '/api/teams';
const MATCHES_API = '/api/matches';
const SETTINGS_API = '/api/settings';

@Injectable()
export class PremierLeagueService {
    constructor(private http: Http) {}


    // teams

    getAllTeams(): Observable<Team[]> {
        return this.http
            .get(TEAMS_API)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    addNewTeam(team: Team): Observable<Team> {
        return this.http
            .post(TEAMS_API, team)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    editTeam(team: Team): Observable<Team> {
        return this.http
            .put(`${TEAMS_API}/${team.id}`, team)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    deleteTeam(team: Team): Observable<Team> {
        return this.http
            .delete(`${TEAMS_API}/${team.id}`)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }


    // matchdays

    getAllMatchdays(): Observable<Matchday[]> {
        return this.http
            .get(MATCHES_API)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    getMatchday(matchday: Matchday): Observable<Matchday> {
        return this.http
            .get(`${MATCHES_API}/${matchday.id}`)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    addMatchday(matchday: Matchday): Observable<Matchday> {
        return this.http
            .post(MATCHES_API, matchday)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    editMatchday(matchday: Matchday): Observable<Matchday> {
        return this.http
            .put(`${MATCHES_API}/${matchday.id}`, matchday)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    deleteMatchday(matchday: Matchday): Observable<Matchday> {
        return this.http
            .delete(`${MATCHES_API}/${matchday.id}`)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }


    // matches

    editMatch(match: Match): Observable<Match> {
        return this.http
            .put(`${MATCHES_API}/${match.id}`, match)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }


    // other

    getSettings(): Observable<Settings> {
        return this.http
            .get(`${SETTINGS_API}/1`)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    editSettings(settings: Settings): Observable<Settings> {
        return this.http
            .put(`${SETTINGS_API}/1`, settings)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    returnPremierLeagueClubs() {
        return [
            { 
                clubName: 'Arsenal',
                logoURL: '/img/clubs/arsenal.png',
                venue: 'Emirates Stadium',
                city: 'London'
            },
            { 
                clubName: 'Aston Villa',
                logoURL: '/img/clubs/aston_villa.png',
                venue: 'Villa Park',
                city: 'Birmingham'
            },
            { 
                clubName: 'Bournemouth',
                logoURL: '/img/clubs/bournemouth.png',
                venue: 'Vitality Stadium',
                city: 'Bournemouth'
            },
            { 
                clubName: 'Brighton',
                logoURL: '/img/clubs/brighton.png',
                venue: 'Amex Stadium',
                city: 'Falmer'
            },
            { 
                clubName: 'Burnley',
                logoURL: '/img/clubs/burnley.png',
                venue: 'Turf Moor',
                city: 'Burnley'
            },
            { 
                clubName: 'Chelsea',
                logoURL: '/img/clubs/chelsea.png',
                venue: 'Stamford Bridge',
                city: 'London'
            },
            { 
                clubName: 'Crystal Palace',
                logoURL: '/img/clubs/crystal_palace.png',
                venue: 'Selhurst Park',
                city: 'London'
            },
            { 
                clubName: 'Everton',
                logoURL: '/img/clubs/everton.png',
                venue: 'Goodison Park',
                city: 'Liverpool'
            },
            { 
                clubName: 'Leicester',
                logoURL: '/img/clubs/leicester_city.png',
                venue: 'King Power Stadium',
                city: 'Leicester'
            },
            { 
                clubName: 'Liverpool',
                logoURL: '/img/clubs/liverpool.png',
                venue: 'Anfield',
                city: 'Liverpool'
            },
            { 
                clubName: 'Manchester City',
                logoURL: '/img/clubs/manchester_city.png',
                venue: 'Etihad Stadium',
                city: 'Manchester'
            },
            { 
                clubName: 'Manchester United',
                logoURL: '/img/clubs/manchester_united.png',
                venue: 'Old Trafford',
                city: 'Manchester'
            },
            { 
                clubName: 'Newcastle',
                logoURL: '/img/clubs/newcastle_united.png',
                venue: "St. James' Park",
                city: 'Newcastle'
            },
            { 
                clubName: 'Norwich',
                logoURL: '/img/clubs/norwich_city.png',
                venue: 'Carrow Road',
                city: 'Norwich'
            },
            { 
                clubName: 'Sheffield United',
                logoURL: '/img/clubs/sheffield_united.png',
                venue: 'Bramall Lane',
                city: 'Sheffield'
            },
            { 
                clubName: 'Southampton',
                logoURL: '/img/clubs/southampton.png',
                venue: "St. Mary's Stadium",
                city: 'Southampton'
            },
            { 
                clubName: 'Tottenham',
                logoURL: '/img/clubs/tottenham_hotspur.png',
                venue: 'Tottenham Hotspur Stadium',
                city: 'London'
            },
            { 
                clubName: 'Watford',
                logoURL: '/img/clubs/watford.png',
                venue: 'Vicarage Road',
                city: 'Watford'
            },
            { 
                clubName: 'West Ham',
                logoURL: '/img/clubs/west_ham_united.png',
                venue: 'London Stadium',
                city: 'London'
            },
            { 
                clubName: 'Wolverhampton',
                logoURL: '/img/clubs/wolverhampton_wanderers.png',
                venue: 'Molineux Stadium',
                city: 'Wolverhampton'
            },
        ];
    }
}