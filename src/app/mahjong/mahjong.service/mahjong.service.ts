import { Injectable } from '@angular/core';

import { Suit } from '../models';

@Injectable()
export class MahjongService {
  constructor() {
  }

  getSuitTileNames(suit: Suit): string[] {
    switch (suit) {
      case Suit.Bamboo:
      case Suit.Character:
      case Suit.Circle:
        return ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      case Suit.Wind:
        return ['North', 'East', 'South', 'West'];
      case Suit.Dragon:
        return ['Green', 'Red', 'White'];
      case Suit.Flower:
        return ['Bamboo', 'Chrysanthemum', 'Orchid', 'Plum'];
      case Suit.Season:
        return ['Fall', 'Spring', 'Summer', 'Winter'];
    }
  }

  // abstract getGames(pageSize?: number, pageIndex?: number, createdBy?: string, player?: string, gameTemplate?: string, state?: string): Observable<Game[]>;
  // abstract getGameTemplates(): Observable<GameTemplate[]>
  // abstract createGame(game: GameCreate): Observable<Game>;
}
