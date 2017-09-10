import { Component } from '@angular/core';

import { MahjongService } from '../../mahjong/mahjong.service/mahjong.service';
import { ThemeService } from '../../theme/theme.service/theme.service';

import { Tile, TileSuit } from '../../mahjong/models';
import { Theme } from '../../theme/theme.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  private selectedTheme: Theme;

  private themes: Theme[];

  private exampleTiles: Tile[];

  constructor(private mahjongService: MahjongService, private themeService: ThemeService) {
    this.selectedTheme = this.themeService.getActiveTheme();

    this.themes = themeService.getThemes();

    this.exampleTiles = [];

    let exampleTileBamboo = new Tile();
    exampleTileBamboo.name = '1';
    exampleTileBamboo.suit = TileSuit.Bamboo;
    this.exampleTiles.push(exampleTileBamboo);

    let exampleTileCharacter = new Tile();
    exampleTileCharacter.name = '1';
    exampleTileCharacter.suit = TileSuit.Character;
    this.exampleTiles.push(exampleTileCharacter);

    let exampleTileCircle = new Tile();
    exampleTileCircle.name = '1';
    exampleTileCircle.suit = TileSuit.Circle;
    this.exampleTiles.push(exampleTileCircle);

    let exampleTileWind = new Tile();
    exampleTileWind.name = 'north';
    exampleTileWind.suit = TileSuit.Wind;
    this.exampleTiles.push(exampleTileWind);

    let exampleTileDragon = new Tile();
    exampleTileDragon.name = 'red';
    exampleTileDragon.suit = TileSuit.Dragon;
    this.exampleTiles.push(exampleTileDragon);

    let exampleTileFlower = new Tile();
    exampleTileFlower.name = 'chrysanthemum';
    exampleTileFlower.suit = TileSuit.Flower;
    this.exampleTiles.push(exampleTileFlower);

    let exampleTileSeason = new Tile();
    exampleTileSeason.name = 'summer';
    exampleTileSeason.suit = TileSuit.Season;
    this.exampleTiles.push(exampleTileSeason);
  }

  onThemeSelected(): void {
    this.themeService.setActiveTheme(this.selectedTheme);
  }
}
