import { Component, OnInit } from '@angular/core';

import { MahjongService } from '../../mahjong/mahjong.service/mahjong.service';
import { ThemeService } from '../../theme/theme.service/theme.service';

import { ExampleTile } from '../example-tile.model';
import { Theme } from '../../theme/theme.model';
import { Suit } from '../../mahjong/models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  private selectedTheme: Theme;

  private themes: Theme[];

  private exampleTiles: ExampleTile[];

  private tileNames: string[];

  constructor(private mahjongService: MahjongService, private themeService: ThemeService) {
    this.selectedTheme = this.themeService.getActiveTheme();

    this.themes = themeService.getThemes();

    this.exampleTiles = [];

    let exampleTileBamboo = new ExampleTile();
    exampleTileBamboo.name = '1';
    exampleTileBamboo.suit = Suit.Bamboo;
    this.exampleTiles.push(exampleTileBamboo);

    let exampleTileCharacter = new ExampleTile();
    exampleTileCharacter.name = '1';
    exampleTileCharacter.suit = Suit.Character;
    this.exampleTiles.push(exampleTileCharacter);

    let exampleTileCircle = new ExampleTile();
    exampleTileCircle.name = '1';
    exampleTileCircle.suit = Suit.Circle;
    this.exampleTiles.push(exampleTileCircle);

    let exampleTileWind = new ExampleTile();
    exampleTileWind.name = 'north';
    exampleTileWind.suit = Suit.Wind;
    this.exampleTiles.push(exampleTileWind);

    let exampleTileDragon = new ExampleTile();
    exampleTileDragon.name = 'red';
    exampleTileDragon.suit = Suit.Dragon;
    this.exampleTiles.push(exampleTileDragon);

    let exampleTileFlower = new ExampleTile();
    exampleTileFlower.name = 'chrysanthemum';
    exampleTileFlower.suit = Suit.Flower;
    this.exampleTiles.push(exampleTileFlower);

    let exampleTileSeason = new ExampleTile();
    exampleTileSeason.name = 'summer';
    exampleTileSeason.suit = Suit.Season;
    this.exampleTiles.push(exampleTileSeason);

    this.tileNames = [];
    this.tileNames.push('1');
    this.tileNames.push('2');
    this.tileNames.push('3');
    this.tileNames.push('west');
  }

  ngOnInit(): void {
  }

  onThemeSelected(): void {
    this.themeService.setActiveTheme(this.selectedTheme);
  }
}
