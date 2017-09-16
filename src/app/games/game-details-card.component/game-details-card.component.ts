import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { GameService } from '../game.service/game.service'
import { AuthService } from '../../auth/auth.service/auth.service';

import { Game, Player } from '../models';

@Component({
  selector: 'app-game-details-card',
  templateUrl: './game-details-card.component.html',
  styleUrls: ['./game-details-card.component.scss']
})
export class GameDetailsCardComponent implements OnInit {

  @Output() gameJoined: EventEmitter<Game> = new EventEmitter<Game>();

  @Input() game: Game;

  isJoiningGame: boolean;

  constructor(private gameService: GameService, private authService: AuthService, private snackBar: MdSnackBar) {
    this.isJoiningGame = false;
  }

  ngOnInit() {
  }

  private onGameOpenClicked(): void {
  }

  private onGameJoinClicked(): void {
    this.isJoiningGame = true;

    this.gameService.addPlayerToGame(this.game.id).subscribe(
      () => {
        this.snackBar.open("Successfully joined the game!", "Close", {
          duration: 3000
        });

        this.update(() => {
          this.gameJoined.emit(this.game);
        });
      },
      error => {
        this.snackBar.open("Something went wrong while trying to join the game.", "Close", {
          duration: 3000
        });

        this.isJoiningGame = false;
      }
    );
  }

  private update(callback: () => void): void {
    this.gameService.getGameByGameId(this.game.id).subscribe(
      game => {
        this.game = game;
        callback();
      },
      error => {
        this.snackBar.open("Something went wrong while trying to update the game.", "Close", {
          duration: 3000
        });
      }
    );
  }

  private gameHasPlayer(): boolean {
    let playerUsername = this.authService.getUserId();

    return this.game.players.some(function (player: Player): boolean {
      return player.id == playerUsername;
    });
  }
}
