import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Game, GameTemplate, Tile, User, UserInGame, PostGame, PostMatch } from './models';
import { MOCK_GAMES } from './mock-models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MahjongMayhemApiService {
  public readonly domain: string;

  constructor(private http: Http) {
    this.domain = 'http://mahjongmayhem.herokuapp.com';
  }

  public getAuthenticationUri(): string {
    return this.domain + '/auth/avans?callbackUrl=http://localhost:4200/authcallback';
  }

  public authenticate(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }

  public unauthenticate(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getUsername(): string {
    return localStorage.getItem('username');
  }

  public getGameTemplates(): Observable<GameTemplate[]> {
    let payload = {};
    let queryParameters = {};
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let uri = `/gameTemplates`;

    return this.http
      .get(this.domain + uri, { headers: headers, params: queryParameters })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getGames(pageSize: number = undefined, pageIndex: number = undefined, createdBy: string = undefined, player: string = undefined, gameTemplate: string = undefined, state: string = undefined): Observable<Game[]> {
    let payload = {};
    let queryParameters = {};
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (pageSize !== undefined) {
      queryParameters['pageSize'] = pageSize;
    }

    if (pageIndex !== undefined) {
      queryParameters['pageIndex'] = pageIndex;
    }

    if (createdBy !== undefined) {
      queryParameters['createdBy'] = createdBy;
    }

    if (player !== undefined) {
      queryParameters['player'] = player;
    }

    if (gameTemplate !== undefined) {
      queryParameters['gameTemplate'] = gameTemplate;
    }

    if (state !== undefined) {
      queryParameters['state'] = state;
    }

    let uri = `/games`;

    return this.http
      .get(this.domain + uri, { headers: headers, params: queryParameters })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public postGame(game: PostGame) {
    let payload = {};
    let queryParameters = {};
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (this.isAuthenticated()) {
      headers.append('x-username', this.getUsername());
      headers.append('x-token', this.getToken());
    }

    payload['game'] = game;
    let uri = `/games`;

    return this.http
      .post(this.domain + uri, JSON.stringify(game), { headers: headers, params: queryParameters })
      .map(this.extractData)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
