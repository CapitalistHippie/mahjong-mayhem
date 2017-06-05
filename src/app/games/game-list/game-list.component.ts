import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router'

// Components.
import { GameCreateComponent } from '../game-create/game-create.component';
import { GameDetailsCardComponent } from '../game-details-card/game-details-card.component';

// Services.
import { MahjongService } from '../../mahjong/mahjong.service';

// Models.
import { Game } from '../../mahjong/models';

// Pipes.
import { GamesPipeArgs } from '../games.pipe';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  private errorMessage: string;
  private isLoadingGames: boolean;
  private games: Game[];

  private gamesPipeArgs: GamesPipeArgs;

  constructor(private mahjongService: MahjongService, private route: ActivatedRoute, private dialog: MdDialog) {
    this.gamesPipeArgs = new GamesPipeArgs();
  }

  ngOnInit(): void {
    this.refreshGames();
  }

  refreshGames(): void {
    this.isLoadingGames = true;
    this.mahjongService.getGames().subscribe(
      (games: Game[]) => {
        this.games = games;
        this.isLoadingGames = false;
      }, error => {
        this.errorMessage = <any>error
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
