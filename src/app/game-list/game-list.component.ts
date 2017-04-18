import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Game } from '../../models';

const GAMES: Game[] = [
  { _id: '57b9d324106c6811006e9c29', id: '57b9d324106c6811006e9c29', minPlayers: 2, maxPlayers: 4 },
  { _id: '57b9d324106c6811006e9c28', id: '57b9d324106c6811006e9c28', minPlayers: 5, maxPlayers: 9 }
];

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  public games = GAMES;
  public selectedGame: Game;

  @Output() gameSelected = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  gameSelect(game: Game): void {
    this.selectedGame = game;
    this.gameSelected.emit(game);
  }
}
