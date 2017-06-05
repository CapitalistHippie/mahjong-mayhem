import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Models.
import { Game } from './models';
import { Game as ApiGame } from '../mahjong-mayhem-api/models';

@Injectable()
export abstract class MahjongService {

  constructor() {
  }

  abstract getGames(pageSize?: number, pageIndex?: number, createdBy?: string, player?: string, gameTemplate?: string, state?: string): Observable<Game[]>;
}
