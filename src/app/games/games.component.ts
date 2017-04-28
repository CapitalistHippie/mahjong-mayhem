import { Component, OnInit, ViewChild } from '@angular/core';

// Services.
import { MahjongMayhemApiService } from '../mahjong-mayhem-api.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  @ViewChild('gameDetail') gameDetail;

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService) {
  }

  private onGameSelected(game): void {
    this.gameDetail.game = game;
  }

  ngOnInit() {
  }
}
