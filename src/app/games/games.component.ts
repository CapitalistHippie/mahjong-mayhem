import { Component, OnInit, ViewChild } from '@angular/core';

// Components.
import { GameDetailComponent } from '../game-detail/game-detail.component';

// Services.
import { MahjongMayhemApiService } from '../mahjong-mayhem-api.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  @ViewChild('gameDetail') gameDetail: GameDetailComponent;

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService) {
  }

  private onGameSelected(game): void {
    this.gameDetail.game = game;
    this.gameDetail.update();
  }

  ngOnInit(): void {
  }
}
