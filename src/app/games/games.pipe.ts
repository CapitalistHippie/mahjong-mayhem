import { Pipe, PipeTransform } from '@angular/core';

// Services.
import { AuthService } from '../auth/auth.service';

// Models.
import { Game, GameState, Player } from '../mahjong/models';

export class GamesPipeArgs {
  filterPlayerGamesInverse: boolean;
  filterStatesInverse: boolean;
  filterStates: GameState[];

  constructor() {
    this.filterPlayerGamesInverse = false;
    this.filterStatesInverse = false;
    this.filterStates = [];
  }
}

@Pipe({
  name: 'games',
  pure: false
})
export class GamesPipe implements PipeTransform {

  constructor(private authService: AuthService) {
  }

  transform(games: Game[], args: GamesPipeArgs): Game[] {
    if (games == null || args == null) {
      return games;
    }

    if (this.authService.isAuthenticated()) {
      // TODO: Get user ID instead of username.
      let playerUsername = this.authService.getUsername();

      // Filter out all games which don't include the player.
      if (args.filterPlayerGamesInverse) {
        games = games.filter(function (game: Game): boolean {
          return game.players.some(function (player: Player): boolean {
            return player.id == playerUsername;
          });
        });
      }
    }

    // Filter out all the games which don't have a specific state.
    if (args.filterStates.length > 0) {
      if (args.filterStatesInverse) {
        games = games.filter(function (game: Game): boolean {
          return args.filterStates.includes(game.state);
        });
      }
      else {
        games = games.filter(function (game: Game): boolean {
          return !args.filterStates.includes(game.state);
        });
      }
    }

    return games;
  }
}
