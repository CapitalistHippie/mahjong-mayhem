import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

// Services.
import { MahjongMayhemApiService } from '../mahjong-mayhem-api.service';

// Models.
import { PostGame } from '../models';
import { GameTemplate } from '../models';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {
  private errorMessage: string;
  private gameTemplates: GameTemplate[];
  private newGame: PostGame;

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService, private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.getGameTemplates();

    this.newGame = {
      minPlayers: 2,
      maxPlayers: 32,
      templateName: ""
    };
  }

  getGameTemplates(): void {
    this.mahjongMayhemApiService.getGameTemplates().subscribe(
      gameTemplates => {
        this.gameTemplates = gameTemplates;
      },
      error => this.errorMessage = <any>error, );
  }

  onSubmit(): void {
    this.mahjongMayhemApiService.postGame(this.newGame).subscribe(
      newGame => {
        this.snackBar.open("Successfully created a new game!", "Close", {
          duration: 3000
        });
      },
      error => this.errorMessage = <any>error, );
  }
}
