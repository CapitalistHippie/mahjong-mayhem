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

  public tileSuitStringToEnum(tileSuit: string): TileSuit {
    switch (tileSuit.toLowerCase()) {
      case 'bamboo': return TileSuit.Bamboo;
      case 'character': return TileSuit.Character;
      case 'circle': return TileSuit.Circle;
      case 'wind': return TileSuit.Wind;
      case 'dragon': return TileSuit.Dragon;
      case 'flower': return TileSuit.Flower;
      case 'season': return TileSuit.Season;
      default: throw Error('Unknown tile suit: ' + tileSuit + '.');
    }
  }

  public tileSuitEnumToString(tileSuit: TileSuit): string {
    switch (tileSuit) {
      case TileSuit.Bamboo: return 'bamboo';
      case TileSuit.Character: return 'character';
      case TileSuit.Circle: return 'circle';
      case TileSuit.Wind: return 'wind';
      case TileSuit.Dragon: return 'dragon';
      case TileSuit.Flower: return 'flower';
      case TileSuit.Season: return 'season';
      default: throw Error('Unknown tile suit: ' + tileSuit + '.');
    }
  }
}
