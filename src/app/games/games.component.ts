import { Component, OnInit, ViewChild } from '@angular/core';

// Components.
import { GameDetailComponent } from '../game-detail/game-detail.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  @ViewChild(GameDetailComponent) gameDetail: GameDetailComponent;

  constructor() {
  }

  ngOnInit(): void {
  }

  private onGameSelected(game): void {
    this.gameDetail.game = game;
    this.gameDetail.update();
  }
}
