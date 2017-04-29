import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

// Services
import { MahjongMayhemApiService } from '../mahjong-mayhem-api.service';

// Models
import { Game, Tile } from '../models';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit, OnChanges {
  private unmatchedGameTiles: Tile[];

  @Input() game: Game;

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      if (propName === 'game') {
        this.update();
      }
    }
  }

  update(): void {
    this.mahjongMayhemApiService.getGameTiles(this.game.id, false).subscribe(
      tiles => {
        this.unmatchedGameTiles = tiles;
        console.log(this.unmatchedGameTiles);
      },
      error => {
      }
    );
  }
}
