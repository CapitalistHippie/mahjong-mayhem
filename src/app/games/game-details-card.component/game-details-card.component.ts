import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { GameService } from '../game.service/game.service'
import { AuthService } from '../../auth/auth.service/auth.service';

import { Game, GameState, Player } from '../models';

@Component({
  selector: 'app-game-details-card',
  templateUrl: './game-details-card.component.html',
  styleUrls: ['./game-details-card.component.scss']
})
export class GameDetailsCardComponent implements OnInit {

  @Output() gameJoined: EventEmitter<Game> = new EventEmitter<Game>();
  @Output() gameDeleted: EventEmitter<Game> = new EventEmitter<Game>();
  @Output() gameStarted: EventEmitter<Game> = new EventEmitter<Game>();

  @Input() game: Game;

  private isJoiningGame: boolean;
  private isStartingGame: boolean;

  constructor(private gameService: GameService, private authService: AuthService, private snackBar: MdSnackBar) {
    this.isJoiningGame = false;
    this.isStartingGame = false;
  }

  ngOnInit() {
  }

  private showWarningMessage(warningMessage: string): void {
    this.snackBar.open(warningMessage, "Close", {
      duration: 3000
    });
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
        this.showWarningMessage("Something went wrong while trying to join the game.");

        this.isJoiningGame = false;
      }
    );
  }

  private onDeleteGameClicked(): void {
    if (this.authService.getUserId() != this.game.createdBy.id) {
      alert("You can not delete this game!")
    }

    this.gameService.deleteGame(this.game.id).subscribe(
      () => {
        this.snackBar.open("Successfully deleted the game!", "Close", {
          duration: 3000
        });
        this.gameDeleted.emit(this.game);
      },
      error => {
        this.showWarningMessage("Something went wrong while trying to delete the game.");
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
        this.showWarningMessage("Something went wrong while trying to update the game.");
      }
    );
  }

  private getCurrentPlayerId(): String {
    return this.authService.getUserId();
  }

  private gameHasPlayer(): boolean {
    let playerUsername = this.authService.getUserId();

    return this.game.players.some(function (player: Player): boolean {
      return player.id == playerUsername;
    });
  }

  private canOpenGame(): boolean {
    if (this.game.state == GameState.Open) {
      return false;
    }

    return true;
  }

  private canStartGame(): boolean {
    return this.gameService.canStartGame(this.game);
  }

  private onStartGameClicked(): void {
    this.startGame();
  }

  private startGame(): void {
    if (this.isStartingGame) {
      return;
    }

    if (!this.canStartGame()) {
      this.showWarningMessage("This game can not be started.");
    }

    this.isStartingGame = true;

    this.gameService.startGame(this.game.id).subscribe(result => {
      this.update(() => {
        this.gameStarted.emit(this.game);

        this.isStartingGame = false;
      });
    }, error => {
      this.showWarningMessage("Something went wrong while starting the game.");

      this.isStartingGame = false;
    });
  }
}
