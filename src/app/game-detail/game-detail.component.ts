import { Component, OnInit, Input, ViewChild } from '@angular/core';

// Services.
import { MahjongMayhemApiService } from '../mahjong-mayhem-api.service';

// Components.
import { MahjongBoardComponent } from '../mahjong-board/mahjong-board.component';

// Models
import { Game } from '../models';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {
  @Input() game: Game;

  @ViewChild(MahjongBoardComponent) mahjongBoard: MahjongBoardComponent;

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService) {
  }

  ngOnInit(): void {
  }

  public update(): void {
    this.mahjongMayhemApiService.getGameTiles(this.game.id, false).subscribe(
      gameTiles => {
        this.mahjongBoard.gameTiles = gameTiles;
        this.mahjongBoard.update();
      },
      error => {
      }
    );
  }
}
