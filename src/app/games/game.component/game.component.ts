import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameService } from '../game.service/game.service';

import { MahjongBoardComponent } from '../../mahjong/mahjong-board.component/mahjong-board.component';

import { Game, GameTile } from '../models';

import { GameObserver, MatchTile, PlayerId } from '../../mahjong-mayhem-api/game-observer.interface/game-observer.interface'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent extends GameObserver implements OnInit {

  @ViewChild(MahjongBoardComponent) mahjongBoard: MahjongBoardComponent;

  private gameId: string;
  private game: Game;
  private gameTiles: GameTile[];

  constructor(private route: ActivatedRoute, private gameService: GameService) {
    super()
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      this.connectToSocket(this.gameId)

      // Get the game.
      this.gameService.getGameByGameId(this.gameId).subscribe(game => {
        this.game = game;
      });

      // Get the game tiles.
      this.gameService.getGameTiles(this.gameId).subscribe(gameTiles => {
        this.gameTiles = gameTiles;

        let boardTiles = gameTiles.map(gameTile => gameTile.boardTile);

        this.mahjongBoard.boardTiles = boardTiles;
        this.mahjongBoard.update();
      });
    });

    this.subscribeToMatch( matches => {
      this.mahjongBoard.handleSocketMatch(matches);
    })
  }

  error(error: any){
    console.log("An error occurred: " + error);
  }
}
