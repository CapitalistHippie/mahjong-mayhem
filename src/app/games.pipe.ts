import { Pipe, PipeTransform } from '@angular/core';

// Services.
import { MahjongMayhemApiService } from './mahjong-mayhem-api.service';

// Models.
import { Game, User } from './models';

export class GamesPipeArgs {
  playerGamesOnly: boolean;
}

@Pipe({
  name: 'games',
  pure: false
})
export class GamesPipe implements PipeTransform {

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService) {
  }

  transform(games: Game[], args: GamesPipeArgs): Game[] {
    if (games == null || args == null) {
      return games;
    }

    if (this.mahjongMayhemApiService.isAuthenticated()) {
      let playerUsername = this.mahjongMayhemApiService.getUsername();

      if (args.playerGamesOnly) {
        games = games.filter(function (game: Game): boolean {
          return game.players.some(function (user: User): boolean {
            return user._id == playerUsername;
          });
        });
      }
    }

    return games;
  }
}
