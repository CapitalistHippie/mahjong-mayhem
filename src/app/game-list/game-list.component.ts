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
  private isLoadingGames: boolean;
  private games: Game[];
  private selectedGame: Game;

  @Output() gameSelected: EventEmitter<Game> = new EventEmitter();
  @Output() gameAddClicked = new EventEmitter();

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService) {
  }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.isLoadingGames = true;
    this.mahjongMayhemApiService.getGames().subscribe(
      games => {
        this.games = games;
        this.isLoadingGames = false;
      },
      error => this.errorMessage = <any>error, );
  }

  gameAdd(): void {
    this.gameAddClicked.emit();
  }

  gameSelect(game: Game): void {
    this.selectedGame = game;
    this.gameSelected.emit(game);
  }
}
