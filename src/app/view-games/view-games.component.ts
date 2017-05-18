import { Component, OnInit } from '@angular/core';

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

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService) {
    this.gamesPipeArgs = new GamesPipeArgs();
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

  onRefreshGamesClicked(): void {
    this.getGames();
  }
}