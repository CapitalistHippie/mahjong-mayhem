import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Services.
import { MahjongService } from './mahjong.service';
import { MahjongMayhemApiService } from '../mahjong-mayhem-api/mahjong-mayhem-api.service';

// Models.
import { Game, GameState, GameTemplate, GameTemplateTile, Player, Tile } from './models';
import { Game as ApiGame } from '../mahjong-mayhem-api/models';
import { GameTemplate as ApiGameTemplate } from '../mahjong-mayhem-api/models';
import { GameTemplateTile as ApiGameTemplateTile } from '../mahjong-mayhem-api/models';
import { User as ApiUser } from '../mahjong-mayhem-api/models';
import { Tile as ApiTile } from '../mahjong-mayhem-api/models';

@Injectable()
export class MahjongMayhemApiToMahjongAdapterService extends MahjongService implements MahjongService {

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService) {
    super();
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
    game.state = this.gameStateEnumFromString(apiGame.state);
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
      gameTemplate.tiles = apiGameTemplate.tiles.map((tile: ApiGameTemplateTile) => {
        return this.mapApiGameTemplateTileToTemplateTile(tile);
      });
    }

    return gameTemplate;
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

  private mapApiGameTemplateTileToTemplateTile(apiGameTemplateTile: ApiGameTemplateTile): GameTemplateTile {
    let tile = new GameTemplateTile();
    tile.x = apiGameTemplateTile.xPos;
    tile.y = apiGameTemplateTile.yPos;
    tile.z = apiGameTemplateTile.zPos;

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

  getGameTemplates(): Observable<GameTemplate[]> {
    let observable = new Observable<GameTemplate[]>(observer => {
      this.mahjongMayhemApiService.getGameTemplates().subscribe((gameTemplates: ApiGameTemplate[]) => {
        console.log(gameTemplates);
        let mappedGameTemplates = gameTemplates.map((gameTemplate: ApiGameTemplate) => {
          return this.mapApiGameTemplateToGameTemplate(gameTemplate);
        });

        observer.next(mappedGameTemplates);
        observer.complete();
      }, error => {

      });
    });

    return observable;
  }
}
