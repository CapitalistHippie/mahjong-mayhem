import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Models.
import { Game, GameState } from './models';

@Injectable()
export abstract class MahjongService {

  constructor() {
  }

  gameStateStringFromEnum(gameState: GameState): string {
    switch (gameState) {
      case GameState.Finished:
        return 'Finished';
      case GameState.Open:
        return 'Open';
      case GameState.Playing:
        return 'Playing';
      default:
        throw new Error('Unknown game state: \'' + gameState + '\'');
    }
  }

  abstract getGames(pageSize?: number, pageIndex?: number, createdBy?: string, player?: string, gameTemplate?: string, state?: string): Observable<Game[]>;
}
