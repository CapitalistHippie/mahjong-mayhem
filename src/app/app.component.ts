import { Component, ViewChild } from '@angular/core';
import { GameListComponent } from './game-list/game-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mahjong Mayhem';

  @ViewChild('gameDetail') gameDetail;

  private onGameSelected(game): void {
    this.gameDetail.game = game;
  }
}
