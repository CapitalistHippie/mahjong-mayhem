import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router'
import { MdSnackBar } from '@angular/material';

import { GameService } from '../game.service/game.service'

import { GameCreateComponent } from '../game-create.component/game-create.component';
import { GameDetailsCardComponent } from '../game-details-card.component/game-details-card.component';

import { Game } from '../models';

import { GamesPipeArgs } from '../games.pipe/games.pipe';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  private isLoadingGames: boolean;
  private games: Game[];

  private gamesPipeArgs: GamesPipeArgs;

  constructor(private gameService: GameService, private route: ActivatedRoute, private dialog: MdDialog, private snackBar: MdSnackBar) {
    this.gamesPipeArgs = new GamesPipeArgs();

    let stateFilter = route.snapshot.params['state'];
    if (stateFilter != null) {
      // let state = this.gameService.gameStateEnumFromString(stateFilter);

      this.gamesPipeArgs.filterStatesInverse = true;
      this.gamesPipeArgs.filterStates.push(stateFilter);
    }
  }

  ngOnInit(): void {
    this.refreshGames();
  }

  refreshGames(): void {
    this.isLoadingGames = true;
    this.gameService.getGames().subscribe(
      (games: Game[]) => {
        this.games = games;
        this.isLoadingGames = false;
      }, error => {
        this.snackBar.open("Something went wrong while trying to get the games.", null, {
          duration: 3000
        });
      });
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
