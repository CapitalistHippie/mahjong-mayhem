import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

// Components.
import { GameCreateComponent } from '../game-create/game-create.component';
import { GameDetailsCardComponent } from '../game-details-card/game-details-card.component';

// Services.
import { MahjongMayhemApiService } from '../mahjong-mayhem-api.service';

// Models.
import { Game } from '../models';

import { GamesPipeArgs } from '../games.pipe';

@Component({
  selector: 'app-view-games',
  templateUrl: './view-games.component.html',
  styleUrls: ['./view-games.component.scss']
})
export class ViewGamesComponent implements OnInit {

  private errorMessage: string;
  private isLoadingGames: boolean;
  private games: Game[];

  private gamesPipeArgs: GamesPipeArgs;

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService, private dialog: MdDialog) {
    this.gamesPipeArgs = new GamesPipeArgs();
  }

  ngOnInit(): void {
    this.refreshGames();
  }

  refreshGames(): void {
    this.isLoadingGames = true;
    this.mahjongMayhemApiService.getGames().subscribe(
      games => {
        this.games = games;
        this.isLoadingGames = false;
      },
      error => this.errorMessage = <any>error, );
  }

  private onCreateGameClicked(): void {
    let dialogReference = this.dialog.open(GameCreateComponent);
    dialogReference.componentInstance.gameCreated.subscribe((createdGame) => {
      dialogReference.close();
      this.refreshGames();
    });
  }

  private onRefreshGamesClicked(): void {
    this.refreshGames();
  }

  private onGameJoined(joinedGame: Game): void {
    let gameIndex = this.games.findIndex((game: Game) => {
      if (game.id == joinedGame.id) {
        return true;
      }
    });

    if (gameIndex == -1) {
      return;
    }

    this.games[gameIndex] = joinedGame;
  }
}
