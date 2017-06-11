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
  }

  ngOnInit() {
    this.getGameTemplates();

    this.model = {
      minPlayers: 2,
      maxPlayers: 32,
      templateName: ""
    };

    this.isCreatingGame = false;
  }

  getGameTemplates(): void {
    this.mahjongService.getGameTemplates().subscribe(
      gameTemplates => {
        this.gameTemplates = gameTemplates;
        console.log(gameTemplates);
      },
      error => {
        this.snackBar.open("An error occured while retrieving the game templates.", "Close", {
          duration: 3000
        });
      });
  }

  onSubmit(): void {
    // this.isCreatingGame = true;

    // this.mahjongService.postGame(this.model).subscribe(
    //   createdGame => {
    //     this.snackBar.open("Successfully created a new game!", "Close", {
    //       duration: 3000
    //     });

    //     this.gameCreated.emit(createdGame);

    //     this.isCreatingGame = false;
    //   },
    //   error => {
    //     this.isCreatingGame = false;

    //     this.snackBar.open("An error occured while creating a new game.", "Close", {
    //       duration: 3000
    //     });
    //   }
    // );
  }
}
