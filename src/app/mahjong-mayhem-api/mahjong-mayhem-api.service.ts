import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Game, GameTile, GameTemplate, Tile, User, UserInGame, GamePost, PostMatch } from './models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MahjongMayhemApiService {
  public readonly domain: string;
  public readonly defaultHeaders: Headers;

  constructor(private http: Http) {
    this.domain = 'https://mahjongmayhem.herokuapp.com';

    this.defaultHeaders = new Headers();
    // this.defaultHeaders.append('Content-Type', 'application/json');
  }

  private authenticatedPost(uri: string, body: object, headers?: Headers, queryParameters?): Observable<any> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated.');
    }

    if (headers == undefined) {
      headers = new Headers(this.defaultHeaders);
    }

    if (queryParameters == undefined) {
      queryParameters = {};
    }

    headers.append('x-username', this.getUsername());
    headers.append('x-token', this.getToken());
    headers.append('Content-Type', 'application/json');

    // queryParameters['x-username'] = this.getUsername();
    // queryParameters['x-token'] = this.getToken();

    return this.http
      .post(this.domain + uri, JSON.stringify(body), { headers: headers, params: queryParameters })
      .map(this.extractData)
      .catch(this.handleError);
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
    return this.getToken() != null;
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getUsername(): string {
    return localStorage.getItem('username');
  }

  public getGameTemplates(): Observable<GameTemplate[]> {
    let queryParameters = {};
    let headers = new Headers(this.defaultHeaders);

    let uri = `/gameTemplates`;

    return this.http
      .get(this.domain + uri, { headers: headers, params: queryParameters })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getGames(pageSize: number = undefined, pageIndex: number = undefined, createdBy: string = undefined, player: string = undefined, gameTemplate: string = undefined, state: string = undefined): Observable<Game[]> {
    let queryParameters = {};
    let headers = new Headers(this.defaultHeaders);

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

  public getGameByGameId(gameId: string): Observable<Game> {
    let queryParameters = {};
    let headers = new Headers(this.defaultHeaders);

    let uri = `/games/${gameId}`;

    return this.http
      .get(this.domain + uri, { headers: headers, params: queryParameters })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public postGame(game: GamePost): Observable<Game> {
    let uri = `/games`;

    return this.authenticatedPost(uri, game);
  }

  public getGameTiles(gameId: string, matched: boolean = undefined): Observable<GameTile[]> {
    let queryParameters = {};
    let headers = new Headers(this.defaultHeaders);

    if (matched !== undefined) {
      queryParameters['matched'] = matched;
    }

    let uri = `/games/${gameId}/tiles`;

    return this.http
      .get(this.domain + uri, { headers: headers, params: queryParameters })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public postGamesByGameIdPlayers(gameId: string): Observable<void> {
    let queryParameters = {};
    let headers = new Headers(this.defaultHeaders);

    if (this.isAuthenticated()) {
      headers.append('x-username', this.getUsername());
      headers.append('x-token', this.getToken());
    }

    let uri = `/games/${gameId}/players`;

    return this.http
      .post(this.domain + uri, '', { headers: headers, params: queryParameters })
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errorMessage = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errorMessage = error.message ? error.message : error.toString();
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }
}
