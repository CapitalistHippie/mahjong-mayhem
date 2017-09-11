import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MahjongMayhemApiService } from '../../mahjong-mayhem-api/mahjong-mayhem-api.service/mahjong-mayhem-api.service';

// Models.
import { Game, GameCreate, GameState, GameTemplate, GameTemplateTile, Player, GameTile } from '../models';
import { Game as ApiGame } from '../../mahjong-mayhem-api/models';
import { GamePost as ApiGamePost } from '../../mahjong-mayhem-api/models';
import { GameTemplate as ApiGameTemplate } from '../../mahjong-mayhem-api/models';
import { GameTemplateTile as ApiGameTemplateTile } from '../../mahjong-mayhem-api/models';
import { User as ApiUser } from '../../mahjong-mayhem-api/models';
import { Tile as ApiTile } from '../../mahjong-mayhem-api/models';

@Injectable()
export class GameService {

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
    game.state = this.mapApiStateToGameState(apiGame.state);
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

  private mapApiStateToGameState(apiState: string): GameState {
    switch (apiState.toLowerCase()) {
      case 'finished': return GameState.Finished;
      case 'open': return GameState.Open;
      case 'playing': return GameState.Playing;
      default: throw Error("Unknown game state: " + apiState + ".");
    }
  }

  private mapApiUserToPlayer(apiUser: ApiUser): Player {
    let player = new Player();
    player.id = apiUser._id;
    player.name = apiUser.name;

    return player;
  }

  private mapApiTileToTile(apiTile: ApiTile): GameTile {
    let tile = new GameTile();
    tile.id = apiTile.id;
    tile.matchesWholeSuit = apiTile.matchesWholeSuit;
    tile.tile.name = apiTile.name;
    // tile.tile.suit = apiTile.suit;

    return tile;
  }

  private mapApiGameTemplateTileToTemplateTile(apiGameTemplateTile: ApiGameTemplateTile): GameTemplateTile {
    let tile = new GameTemplateTile();
    tile.x = apiGameTemplateTile.xPos;
    tile.y = apiGameTemplateTile.yPos;
    tile.z = apiGameTemplateTile.zPos;

    return tile;
  }

  private mapGameCreateToApiGamePost(gameCreate: GameCreate): ApiGamePost {
    let gamePost = new ApiGamePost();
    gamePost.minPlayers = gameCreate.minPlayers;
    gamePost.maxPlayers = gameCreate.maxPlayers;
    gamePost.templateName = gameCreate.templateName;

    return gamePost;
  }

  getGames(pageSize: number = undefined, pageIndex: number = undefined, createdBy: string = undefined, player: string = undefined, gameTemplate: string = undefined, state: GameState = undefined): Observable<Game[]> {
    let observable = new Observable<Game[]>(observer => {
      this.mahjongMayhemApiService.getGames(pageSize, pageIndex, createdBy, player, gameTemplate, state).subscribe((games: ApiGame[]) => {
        let mappedGames = games.map((game: ApiGame) => {
          return this.mapApiGameToGame(game);
        });

        observer.next(mappedGames);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      });
    });

    return observable;
  }

  getGameTemplates(): Observable<GameTemplate[]> {
    let observable = new Observable<GameTemplate[]>(observer => {
      this.mahjongMayhemApiService.getGameTemplates().subscribe((gameTemplates: ApiGameTemplate[]) => {
        let mappedGameTemplates = gameTemplates.map((gameTemplate: ApiGameTemplate) => {
          return this.mapApiGameTemplateToGameTemplate(gameTemplate);
        });

        observer.next(mappedGameTemplates);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      });
    });

    return observable;
  }

  createGame(game: GameCreate): Observable<Game> {
    let gamePost = this.mapGameCreateToApiGamePost(game);

    let observable = new Observable<Game>(observer => {
      this.mahjongMayhemApiService.postGame(gamePost).subscribe((game: ApiGame) => {
        let mappedGame = this.mapApiGameToGame(game);

        observer.next(mappedGame);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      });
    });

    return observable;
  }
}
