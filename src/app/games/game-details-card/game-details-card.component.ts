import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdSnackBar } from '@angular/material';

/////////////////////////////
// Services.
/////////////////////////////
import { MahjongService } from '../../mahjong/mahjong.service';

// Models.
import { Game } from '../../mahjong/models';

@Component({
  selector: 'app-game-details-card',
  templateUrl: './game-details-card.component.html',
  styleUrls: ['./game-details-card.component.scss']
})
export class GameDetailsCardComponent implements OnInit {

  @Output() gameJoined: EventEmitter<Game> = new EventEmitter<Game>();

  @Input() game: Game;

  isJoiningGame: boolean;

  constructor(private mahjongService: MahjongService, private snackBar: MdSnackBar) {
    this.isJoiningGame = false;
  }

  ngOnInit() {
  }

  private onGameOpenClicked(): void {
  }

  private onGameJoinClicked(): void {
    this.isJoiningGame = true;

    // this.mahjongMayhemApiService.postGamesByGameIdPlayers(this.game.id).subscribe(
    //   () => {
    //     this.snackBar.open("Successfully joined the game!", "Close", {
    //       duration: 3000
    //     });

    //     this.update(() => {
    //       this.gameJoined.emit(this.game);
    //     });
    //   },
    //   error => {
    //     this.snackBar.open("Something went wrong while trying to join the game.", "Close", {
    //       duration: 3000
    //     });

    //     this.isJoiningGame = false;
    //   }
    // );
  }

  private update(callback: () => void): void {
    // this.mahjongMayhemApiService.getGameByGameId(this.game.id).subscribe(
    //   game => {
    //     this.game = game;

    //     callback();
    //   },
    //   error => {
    //     this.snackBar.open("Something went wrong while trying to update the game.", "Close", {
    //       duration: 3000
    //     });
    //   }
    // );
  }

  private gameHasPlayer(): boolean {
    // let playerUsername = this.mahjongMayhemApiService.getUsername();

    // return this.game.players.some(function (user: User): boolean {
    //   return user._id == playerUsername;
    // });
    return true;
  }
}
