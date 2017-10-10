import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { MahjongBoardComponent } from '../../mahjong/mahjong-board.component/mahjong-board.component';

import { GameService } from '../game.service/game.service';

import { Game, GameCreate, GameTemplate } from '../models';
import { BoardTile, Tile, TileSuit } from '../../mahjong/models';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss']
})
export class GameCreateComponent implements OnInit {
  private gameTemplates: GameTemplate[];
  private model: GameCreate;
  private isCreatingGame: boolean;

  @Output() gameCreated: EventEmitter<Game> = new EventEmitter();

  @ViewChild(MahjongBoardComponent) mahjongBoard: MahjongBoardComponent;

  constructor(private gameService: GameService, private snackBar: MdSnackBar) {
    this.model = new GameCreate();
    this.model.minPlayers = 2;
    this.model.maxPlayers = 32;
    this.model.templateName = '';

    this.isCreatingGame = false;
  }

  ngOnInit() {
    this.getGameTemplates();
  }

  getGameTemplates(): void {
    this.gameService.getGameTemplates().subscribe(
      gameTemplates => {
        this.gameTemplates = gameTemplates;
      },
      error => {
        this.snackBar.open('Something went wrong while trying to get the game templates.', null, {
          duration: 3000
        });
      });
  }

  updateBoardPreview(): void {
    let gameTemplate = this.gameTemplates.find(x => x.id == this.model.templateName);

    if (gameTemplate == null) {
      return;
    }

    let previewTile = new Tile();
    previewTile.name = "1";
    previewTile.suit = TileSuit.Bamboo;

    let previewBoardTiles = gameTemplate.tiles.map((gameTemplateTile: BoardTile) => {
      let previewBoardTile = new BoardTile();
      previewBoardTile.tile = previewTile;
      previewBoardTile.x = gameTemplateTile.x;
      previewBoardTile.y = gameTemplateTile.y;
      previewBoardTile.z = gameTemplateTile.z;

      return previewBoardTile;
    });

    console.log(previewBoardTiles);

    this.mahjongBoard.boardTiles = previewBoardTiles;
    this.mahjongBoard.update();
  }

  onTemplateSelected(): void {
    this.updateBoardPreview();
  }

  onSubmit(): void {
    this.isCreatingGame = true;

    this.gameService.createGame(this.model).subscribe(
      createdGame => {
        this.snackBar.open('Successfully created a new game!', null, {
          duration: 3000
        });

        this.gameCreated.emit(createdGame);

        this.isCreatingGame = false;
      },
      error => {
        this.isCreatingGame = false;

        this.snackBar.open('Something went wrong while trying to create the game.', null, {
          duration: 3000
        });
      }
    );
  }
}
