import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Game, GameTemplate, Tile, User, UserInGame, PostGame, PostMatch } from '../models';
import { MOCK_GAMES } from './mock-games';

@Injectable()
export class MahjongMayhemApiService {
  constructor() {
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
	* @param {string} state - In welke staat de game moet zijn
	* 
	*/
  public getGames(pageSize: number = undefined, pageIndex: number = undefined, createdBy: string = undefined, player: string = undefined, gameTemplate: string = undefined, state: string = undefined) {
    let payload = {};
    let queryParameters = {};
    let headers = new Headers();
    // headers.append('Content-Type', 'application/json');


    // if (parameters['pageSize'] !== undefined) {
    //   queryParameters['pageSize'] = parameters['pageSize'];
    // }


    // if (parameters['pageIndex'] !== undefined) {
    //   queryParameters['pageIndex'] = parameters['pageIndex'];
    // }


    // if (parameters['createdBy'] !== undefined) {
    //   queryParameters['createdBy'] = parameters['createdBy'];
    // }


    // if (parameters['player'] !== undefined) {
    //   queryParameters['player'] = parameters['player'];
    // }


    // if (parameters['gameTemplate'] !== undefined) {
    //   queryParameters['gameTemplate'] = parameters['gameTemplate'];
    // }


    // if (parameters['state'] !== undefined) {
    //   queryParameters['state'] = parameters['state'];
    // }

    // let uri = `/games`;

    // return this.http
    //   .get(this.domain + uri, { headers: headers, params: queryParameters })
    //   .map((res: Response) => {
    //     return res;
    //   });

    return MOCK_GAMES;
  }
}
