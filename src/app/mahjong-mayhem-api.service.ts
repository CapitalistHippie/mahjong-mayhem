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

  /**
   * 
   * @method
   * @name getAuthenticationUri
   * @description Returns the API's authentication URI including callback URL parameter.
   * 
   */
  public getAuthenticationUri(): string {
    return this.domain + '/auth/avans?callbackUrl=http://localhost:4200/authcallback';
  }

  /**
  *
	* @method
	* @name getGames
	* @param {number} pageSize - Het aantal games dat je terug wilt krijgen.
	* @param {number} pageIndex - Het aantal pagina's (gebaseerd op pageSize) dat geskipt moet worden.
	* @param {string} createdBy - Degene die de game heeft gemaakt. Let op, gebruik de username hier!
	* @param {string} player - Degene die meedoet in de game. Let op, gebruik de username hier!
	* @param {string} gameTemplate - Het id van de template van de game.
	* @param {string} state - In welke staat de game moet zijn.
	* 
	*/
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
