import { Injectable } from '@angular/core';

import { TileSuit } from '../models';

@Injectable()
export class MahjongService {
  constructor() {
  }

  getSuitTileNames(suit: TileSuit): string[] {
    switch (suit) {
      case TileSuit.Bamboo:
      case TileSuit.Character:
      case TileSuit.Circle:
        return ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      case TileSuit.Wind:
        return ['North', 'East', 'South', 'West'];
      case TileSuit.Dragon:
        return ['Green', 'Red', 'White'];
      case TileSuit.Flower:
        return ['Bamboo', 'Chrysanthemum', 'Orchid', 'Plum'];
      case TileSuit.Season:
        return ['Fall', 'Spring', 'Summer', 'Winter'];
    }
  }
}
