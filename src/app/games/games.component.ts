import { Component, OnInit, ViewChild } from '@angular/core';

// Services.
import { MahjongMayhemApiService } from '../mahjong-mayhem-api.service';

// Components.
import { MahjongBoardComponent } from '../mahjong-board/mahjong-board.component';

// Models.
import { Game } from '../models';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  @ViewChild(MahjongBoardComponent) mahjongBoard: MahjongBoardComponent;

  selectedGame: Game;

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService) {
  }

  ngOnInit(): void {
  }

  private onGameSelected(game): void {
    this.selectedGame = game;

    this.mahjongMayhemApiService.getGameTiles(this.selectedGame.id).subscribe(
      gameTiles => {
        this.mahjongBoard.gameTiles = gameTiles;
        this.mahjongBoard.update();
      },
      error => {
      }
    );
  }
}
