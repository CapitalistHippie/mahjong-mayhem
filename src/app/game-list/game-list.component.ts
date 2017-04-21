import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Game } from '../models';
import { MahjongMayhemApiService } from '../mahjong-mayhem-api.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  private errorMessage: string;
  private games: Game[];
  private selectedGame: Game;

  @Output() gameSelected: EventEmitter<Game> = new EventEmitter();

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService) {
  }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.mahjongMayhemApiService.getGames().subscribe(
      games => this.games = games,
      error => this.errorMessage = <any>error);
  }

  gameSelect(game: Game): void {
    this.selectedGame = game;
    this.gameSelected.emit(game);
  }
}
