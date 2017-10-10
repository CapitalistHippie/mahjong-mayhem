import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Game, GameTile, GameTemplate, Tile, User, UserInGame, GamePost, PostMatch, MatchEvent, PlayerJoinedEvent, MatchPost } from '../models';

declare var io: any;

// TODO: Should probably move this class to it's own file.
export class GameObservable {

  public readonly gameId: string;

  private socket: any;

  private startEvent: Observable<void>;
  private endEvent: Observable<void>;
  private playerJoinedEvent: Observable<PlayerJoinedEvent>;
  private matchEvent: Observable<MatchEvent>;

  constructor(gameId: string) {
    this.gameId = gameId;
    this.socket = io.connect("http://mahjongmayhem.herokuapp.com?gameId=" + gameId);

    this.startEvent = this.createObservable<void>('start');
    this.endEvent = this.createObservable<void>('end');
    this.playerJoinedEvent = this.createObservable<PlayerJoinedEvent>('playerJoined');
    this.matchEvent = this.createObservable<MatchEvent>('match');
  }

  private createObservable<T>(event: string) {
    let observable = new Observable<T>(observer => {
      this.socket.on(event, (obj: T) => {
        observer.next(obj);
      }, error => {
        observer.error(error);
      });
    });

    return observable;
  }

  public subscribeStartEvent(...args): Subscription {
    return this.startEvent.subscribe(...args);
  }

  public subscribeEndEvent(...args): Subscription {
    return this.endEvent.subscribe(...args);
  }

  public subscribePlayerJoinedEvent(...args): Subscription {
    return this.playerJoinedEvent.subscribe(...args);
  }

  public subscribeMatchEvent(...args): Subscription {
    return this.matchEvent.subscribe(...args);
  }
}

@Injectable()
export class MahjongMayhemApiService {
  public readonly domain: string;
  public readonly defaultHeaders: Headers;

  private gameObservables: Map<string, GameObservable>;

  constructor(private http: Http) {
    this.domain = 'https://mahjongmayhem.herokuapp.com';

    this.defaultHeaders = new Headers();
    this.gameObservables = new Map<string, GameObservable>();
  }

  private get(uri: string, queryParameters?, headers?: Headers | null): Observable<any> {
    if (queryParameters == undefined) {
      queryParameters = {};
    }

    if (headers == undefined) {
      headers = new Headers(this.defaultHeaders);
    }

    return this.http
      .get(this.domain + uri, { headers: headers, params: queryParameters })
      .map(this.extractData)
      .catch(this.handleError);
  }

  private authenticatedPost(uri: string, body?: object, queryParameters?, headers?: Headers): Observable<any> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated.');
    }

    if (queryParameters == undefined) {
      queryParameters = {};
    }

    if (headers == undefined) {
      headers = new Headers(this.defaultHeaders);
    }
    let jsonBody = undefined
    if (body != undefined) { jsonBody = JSON.stringify(body); }

    headers.append('x-username', this.getUsername());
    headers.append('x-token', this.getToken());
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(this.domain + uri, jsonBody, { headers: headers, params: queryParameters })
      .map(this.extractData)
      .catch(this.handleError);
  }

  private authenticatedDelete(uri: string, headers?: Headers): Observable<any> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated.');
    }

    if (headers == undefined) {
      headers = new Headers(this.defaultHeaders);
    }

    headers.append('x-username', this.getUsername());
    headers.append('x-token', this.getToken());
    headers.append('Content-Type', 'application/json');

    return this.http
      .delete(this.domain + uri, { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getAuthenticationUri(): string {
    return this.domain + '/auth/avans?callbackUrl=' + window.location.origin + '/authcallback';
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
    let uri = '/gameTemplates';

    return this.get(uri);
  }

  public getGames(pageSize: number = undefined, pageIndex: number = undefined, createdBy: string = undefined, player: string = undefined, gameTemplate: string = undefined, state: string = undefined): Observable<Game[]> {
    let queryParameters = {};

    if (pageSize != undefined) {
      queryParameters['pageSize'] = pageSize;
    }

    if (pageIndex != undefined) {
      queryParameters['pageIndex'] = pageIndex;
    }

    if (createdBy != undefined) {
      queryParameters['createdBy'] = createdBy;
    }

    if (player != undefined) {
      queryParameters['player'] = player;
    }

    if (gameTemplate != undefined) {
      queryParameters['gameTemplate'] = gameTemplate;
    }

    if (state != undefined) {
      queryParameters['state'] = state;
    }

    let uri = '/games';

    return this.get(uri, queryParameters);
  }

  public getGameByGameId(gameId: string): Observable<Game> {
    let uri = '/games/' + gameId;

    return this.get(uri);
  }

  public postGame(game: GamePost): Observable<Game> {
    let uri = '/games';

    return this.authenticatedPost(uri, game);
  }

  public postPlayerToGame(gameId: string) {
    let uri = '/games/' + gameId + '/players';

    return this.authenticatedPost(uri, null);
  }

  public deleteGame(gameId: string) {
    let uri = '/games/' + gameId

    return this.authenticatedDelete(uri)
  }

  public startGame(gameId: string) {
    let uri = '/games/' + gameId + '/start'

    return this.authenticatedPost(uri)
  }

  public getGameTiles(gameId: string, matched: boolean = undefined): Observable<GameTile[]> {
    let queryParameters = {};

    if (matched != undefined) {
      queryParameters['matched'] = matched;
    }

    let uri = '/games/' + gameId + '/tiles';

    return this.get(uri, queryParameters);
  }

  public observeGame(gameId: string): GameObservable {
    let gameObserver = this.gameObservables.get(gameId);

    if (gameObserver == null) {
      gameObserver = new GameObservable(gameId);
      this.gameObservables.set(gameId, gameObserver);
    }

    return gameObserver;
  }

  public submitMatch(gameId: string, match: MatchPost): Observable<any> {
    let uri = '/games/' + gameId + '/tiles/matches'
    return this.authenticatedPost(uri, match)
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
      errorMessage = error.status + ' - ' + error.statusText || err;
    } else {
      errorMessage = error.message ? error.message : error.toString();
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }
}
