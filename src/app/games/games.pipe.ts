import { Pipe, PipeTransform } from '@angular/core';

// Services.
import { AuthService } from '../auth/auth.service';

// Models.
import { Game, Player } from '../mahjong/models';

export class GamesPipeArgs {
  playerGamesOnly: boolean;
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

      if (args.playerGamesOnly) {
        games = games.filter(function (game: Game): boolean {
          return game.players.some(function (player: Player): boolean {
            return player.id == playerUsername;
          });
        });
      }
    }

    return games;
  }
}
