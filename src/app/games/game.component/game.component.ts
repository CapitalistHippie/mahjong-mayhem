import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';


import { GameService } from '../game.service/game.service';
import { AuthService } from '../../auth/auth.service/auth.service';

import { MahjongBoardComponent } from '../../mahjong/mahjong-board.component/mahjong-board.component';
import { MahjongTileComponent } from '../../mahjong/mahjong-tile.component/mahjong-tile.component';

import { Game, GameTile, GameState } from '../models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @ViewChild(MahjongBoardComponent) mahjongBoard: MahjongBoardComponent;

  private gameId: string;
  private game: Game;
  private gameTiles: GameTile[];

  constructor(private route: ActivatedRoute, private gameService: GameService, private authService: AuthService, private snackBar: MdSnackBar) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params['id'];

      Observable.forkJoin(
        this.gameService.getGameByGameId(this.gameId),
        this.gameService.getGameTiles(this.gameId, false)
      )
      .subscribe(result =>{
        // Get the game.
        this.game = result[0];

        // Get the game tiles.
        this.gameTiles = result[1];

        this.mahjongBoard.boardTiles = this.gameTiles.map(gameTile => gameTile.boardTile);;
        this.mahjongBoard.update();

        if(this.game.state != GameState.Finished){
          this.subscribeToWebsocket()
        }
        else{
          this.mahjongBoard.isPlaying = false;
        }
      })

      this.mahjongBoard.onTwoTilesClicked.subscribe(tileComponents => this.onTwoTilesClicked(tileComponents))      
    });
  }

  private subscribeToWebsocket(){
    let gameObservable = this.gameService.observeGame(this.gameId);
    
    gameObservable.subscribeMatchEvent(matches => {
      if (matches.length == 2) {
        let tiles = this.mahjongBoard.tileComponentRefs.filter(t => {
          let tile = t[1];
          return (tile.x == matches[0].xPos && tile.y == matches[0].yPos && tile.z == matches[0].zPos) ||
            (tile.x == matches[1].xPos && tile.y == matches[1].yPos && tile.z == matches[1].zPos)
        });
        if (tiles.length >= 2) {
          this.mahjongBoard.removeTilesFromBoard(tiles[0][1].tile, tiles[1][1].tile);
        }
      }
      else {
        console.error("Matches has a length of "  + matches.length + "! Expected: 2");
      }
    });
    gameObservable.subscribeEndEvent(result => {
      this.snackBar.open("The game has ended, you can not make any more moves. Thank you for playing!", "Close", {
        duration: 5000
      });
      this.mahjongBoard.isPlaying = false;
    })
    gameObservable.subscribeStartEvent(result => {
      if(!this.mahjongBoard.isPlaying){
        this.snackBar.open("The game has started!", "Close", {
          duration: 5000
        });
        this.mahjongBoard.isPlaying = true;
      }
    })
  }

  public onTwoTilesClicked(componentRefs: [MahjongTileComponent]): void {
    if(componentRefs.length != 2){
      return;
    }
    let userId = this.authService.getUserId();
    let playerIndex = this.game.players.findIndex(player => player.id == userId)
    if(playerIndex == -1){
      this.snackBar.open("You have not joined this game, so you are not allowed to make moves!", "Close", {
        duration: 5000
      });
      return;
    }
    let tile1 = componentRefs[0]
    let tile2 = componentRefs[1];
    if (tile1.tile.name == tile2.tile.name && tile1.tile.suit == tile2.tile.suit) {
      this.mahjongBoard.isLoading = true;
      let boardTile1 = this.mahjongBoard.tileComponentRefs.find(tuple => tuple[0].instance == tile1)[1]
      let boardTile2 = this.mahjongBoard.tileComponentRefs.find(tuple => tuple[0].instance == tile2)[1]

      let gameTileId1 = this.gameTiles.find(tile => tile.boardTile == boardTile1).id
      let gameTileId2 = this.gameTiles.find(tile => tile.boardTile == boardTile2).id

      this.gameService.submitMatch(this.gameId, gameTileId1, gameTileId2).subscribe(
        result => {
          console.log(result);
          this.mahjongBoard.removeTilesFromBoard(tile1.tile, tile2.tile);
          this.mahjongBoard.isLoading = false;
        },
        error => {
          this.snackBar.open("An error occured, sorry!", "Close", {
            duration: 5000
          });
          this.mahjongBoard.isLoading = false;
        }
      )
    }
  }
}
