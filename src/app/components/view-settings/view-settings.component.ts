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

  constructor(private themeService: ThemeService) {
    this.selectedTheme = themeService.getActiveTheme();
    this.themes = themeService.getThemes();

    this.exampleTiles = [];
    let exampleTileBamboo9 = new Tile();
    exampleTileBamboo9.name = '1';
    exampleTileBamboo9.suit = 'bamboo';
    this.exampleTiles.push(exampleTileBamboo9);

    let exampleTileCharacter9 = new Tile();
    exampleTileCharacter9.name = '1';
    exampleTileCharacter9.suit = 'character';
    this.exampleTiles.push(exampleTileCharacter9);

    let exampleTileCircle9 = new Tile();
    exampleTileCircle9.name = '1';
    exampleTileCircle9.suit = 'circle';
    this.exampleTiles.push(exampleTileCircle9);

    let exampleTileWindNorth = new Tile();
    exampleTileWindNorth.name = 'north';
    exampleTileWindNorth.suit = 'wind';
    this.exampleTiles.push(exampleTileWindNorth);

    let exampleTileDragonRed = new Tile();
    exampleTileDragonRed.name = 'red';
    exampleTileDragonRed.suit = 'dragon';
    this.exampleTiles.push(exampleTileDragonRed);

    let exampleTileFlowerChrysanthemum = new Tile();
    exampleTileFlowerChrysanthemum.name = 'chrysanthemum';
    exampleTileFlowerChrysanthemum.suit = 'flower';
    this.exampleTiles.push(exampleTileFlowerChrysanthemum);

    let exampleTileSeasonSummer = new Tile();
    exampleTileSeasonSummer.name = 'summer';
    exampleTileSeasonSummer.suit = 'season';
    this.exampleTiles.push(exampleTileSeasonSummer);
  }

  ngOnInit(): void {
  }

  onThemeSelected(): void {
    this.themeService.setActiveTheme(this.selectedTheme);
  }
}
