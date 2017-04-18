import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Game } from '../models';
import { MahjongMayhemApiService } from '../mahjong-mayhem-api.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
  providers: [MahjongMayhemApiService]
})
export class GameListComponent implements OnInit {
  public games: Game[];
  public selectedGame: Game;

  @Output() gameSelected = new EventEmitter();

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService) {
  }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.mahjongMayhemApiService.getGames().then(games => this.games = games);
  }

  gameSelect(game: Game) {
    this.selectedGame = game;
    this.gameSelected.emit(game);
  }
}
