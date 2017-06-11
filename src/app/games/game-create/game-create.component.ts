import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MdSnackBar } from '@angular/material';

// Services.
import { MahjongService } from '../../mahjong/mahjong.service';

// Models.
import { Game, GameCreate, GameTemplate } from '../../mahjong/models';

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

  constructor(private mahjongService: MahjongService, private snackBar: MdSnackBar) {
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
    this.mahjongService.getGameTemplates().subscribe(
      gameTemplates => {
        this.gameTemplates = gameTemplates;
      },
      error => {
        this.snackBar.open('Something went wrong while trying to get the game templates.', null, {
          duration: 3000
        });
      });
  }

  onSubmit(): void {
    this.isCreatingGame = true;

    this.mahjongService.createGame(this.model).subscribe(
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
