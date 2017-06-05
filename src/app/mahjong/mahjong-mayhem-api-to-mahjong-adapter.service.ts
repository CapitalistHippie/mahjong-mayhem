import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Services.
import { MahjongService } from './mahjong.service';
import { MahjongMayhemApiService } from '../mahjong-mayhem-api/mahjong-mayhem-api.service';

// Models.
import { Game, GameState, GameTemplate, Player, Tile } from './models';
import { Game as ApiGame } from '../mahjong-mayhem-api/models';
import { GameTemplate as ApiGameTemplate } from '../mahjong-mayhem-api/models';
import { User as ApiUser } from '../mahjong-mayhem-api/models';
import { Tile as ApiTile } from '../mahjong-mayhem-api/models';

@Injectable()
export class MahjongMayhemApiToMahjongAdapterService implements MahjongService {

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService) {
  }

  private mapApiGameToGame(apiGame: ApiGame): Game {
    let game = new Game();
    game.id = apiGame.id;
    game.gameTemplate = this.mapApiGameTemplateToGameTemplate(apiGame.gameTemplate);
    game.createdOn = apiGame.createdOn;
    game.startedOn = apiGame.startedOn;
    game.endedOn = apiGame.endedOn;
    game.minPlayers = apiGame.minPlayers;
    game.maxPlayers = apiGame.maxPlayers;
    game.state = this.mapApiGameStateToGameState(apiGame.state);
    game.createdBy = this.mapApiUserToPlayer(apiGame.createdBy);
    game.players = apiGame.players.map((user: ApiUser) => {
      return this.mapApiUserToPlayer(user);
    });

    return game;
  }

  private mapApiGameTemplateToGameTemplate(apiGameTemplate: ApiGameTemplate): GameTemplate {
    let gameTemplate = new GameTemplate();
    gameTemplate.id = apiGameTemplate.id;
    if (apiGameTemplate.tiles != null) {
      gameTemplate.tiles = apiGameTemplate.tiles.map((tile: ApiTile) => {
        return this.mapApiTileToTile(tile);
      });
    }

    return gameTemplate;
  }

  private mapApiGameStateToGameState(apiState: string): GameState {
    switch (apiState) {
      case 'finished':
        return GameState.Finished;
      case 'open':
        return GameState.Open;
      case 'playing':
        return GameState.Playing;
      default:
        throw new Error('Unknown game state: \'' + apiState + '\'');
    }
  }

  private mapApiUserToPlayer(apiUser: ApiUser): Player {
    let player = new Player();
    player.id = apiUser._id;
    player.name = apiUser.name;

    return player;
  }

  private mapApiTileToTile(apiTile: ApiTile): Tile {
    let tile = new Tile();
    tile.id = apiTile.id;
    tile.matchesWholeSuit = apiTile.matchesWholeSuit;
    tile.name = apiTile.name;
    tile.suit = apiTile.suit;

    return tile;
  }

  getGames(pageSize: number = undefined, pageIndex: number = undefined, createdBy: string = undefined, player: string = undefined, gameTemplate: string = undefined, state: string = undefined): Observable<Game[]> {
    let observable = new Observable<Game[]>(observer => {
      this.mahjongMayhemApiService.getGames(pageSize, pageIndex, createdBy, player, gameTemplate, state).subscribe((games: ApiGame[]) => {
        let mappedGames = games.map((game: ApiGame) => {
          return this.mapApiGameToGame(game);
        });

        observer.next(mappedGames);
        observer.complete();
      }, error => {

      });
    });

    return observable;
  }
}
