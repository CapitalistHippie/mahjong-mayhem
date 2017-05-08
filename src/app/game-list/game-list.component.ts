import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';

// Components.
import { GameCreateComponent } from '../game-create/game-create.component';

// Services.
import { MahjongMayhemApiService } from '../mahjong-mayhem-api.service';

// Directives.
import { ThemeDirective } from '../theme.directive';

// Models.
import { Game } from '../models';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  private errorMessage: string;
  private isLoadingGames: boolean;
  private games: Game[];
  private selectedGame: Game;

  @Output() gameSelected: EventEmitter<Game> = new EventEmitter();

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService, private dialog: MdDialog) {
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

  onCreateGameClicked(): void {
    let dialogReference = this.dialog.open(GameCreateComponent);
    dialogReference.componentInstance.gameCreated.subscribe((createdGame) => {
      dialogReference.close();
      this.getGames();
    })
  }

  onRefreshGamesClicked(): void {
    this.getGames();
  }

  onGameSelected(game: Game): void {
    this.selectedGame = game;
    this.gameSelected.emit(game);
  }
}
