import { Component, OnInit } from '@angular/core';

// Services.
import { ThemeService } from '../../theme.service';

// Models.
import { Theme, Tile } from '../../models';

@Component({
  selector: 'app-view-settings',
  templateUrl: './view-settings.component.html',
  styleUrls: ['./view-settings.component.scss']
})
export class ViewSettingsComponent implements OnInit {

  private selectedTheme: Theme;

  private themes: Theme[];

  private exampleTiles: Tile[];

  private tileNames: string[];

  constructor(private themeService: ThemeService) {
    this.selectedTheme = themeService.getActiveTheme();
    this.themes = themeService.getThemes();

    this.exampleTiles = [];
    let exampleTileBamboo = new Tile();
    exampleTileBamboo.name = '1';
    exampleTileBamboo.suit = 'bamboo';
    this.exampleTiles.push(exampleTileBamboo);

    let exampleTileCharacter = new Tile();
    exampleTileCharacter.name = '1';
    exampleTileCharacter.suit = 'character';
    this.exampleTiles.push(exampleTileCharacter);

    let exampleTileCircle = new Tile();
    exampleTileCircle.name = '1';
    exampleTileCircle.suit = 'circle';
    this.exampleTiles.push(exampleTileCircle);

    let exampleTileWind = new Tile();
    exampleTileWind.name = 'north';
    exampleTileWind.suit = 'wind';
    this.exampleTiles.push(exampleTileWind);

    let exampleTileDragon = new Tile();
    exampleTileDragon.name = 'red';
    exampleTileDragon.suit = 'dragon';
    this.exampleTiles.push(exampleTileDragon);

    let exampleTileFlower = new Tile();
    exampleTileFlower.name = 'chrysanthemum';
    exampleTileFlower.suit = 'flower';
    this.exampleTiles.push(exampleTileFlower);

    let exampleTileSeason = new Tile();
    exampleTileSeason.name = 'summer';
    exampleTileSeason.suit = 'season';
    this.exampleTiles.push(exampleTileSeason);

    this.tileNames = [];
    this.tileNames.push('1');
    this.tileNames.push('2');
    this.tileNames.push('3');
  }

  ngOnInit(): void {
  }

  onThemeSelected(): void {
    this.themeService.setActiveTheme(this.selectedTheme);
  }
}
