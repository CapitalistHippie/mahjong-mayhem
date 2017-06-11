import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Models.
import { Game, GameTemplate, GameState } from './models';

@Injectable()
export abstract class MahjongService {

  constructor() {
  }

  gameStateEnumFromString(gameState: string): GameState {
    switch (gameState) {
      case 'finished':
      case 'Finished':
        return GameState.Finished;
      case 'open':
      case 'Open':
        return GameState.Open;
      case 'playing':
      case 'Playing':
        return GameState.Playing;
      default:
        throw new Error('Unknown game state: \'' + gameState + '\'');
    }
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
  abstract getGameTemplates(): Observable<GameTemplate[]>
}
