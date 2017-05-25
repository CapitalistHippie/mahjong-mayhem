/////////////////////////////
// Modules.
/////////////////////////////
// Angular modules.
import { NgModule } from '@angular/core';

// App modules.
import { MahjongModule } from '../mahjong/mahjong.module';

/////////////////////////////
// Components.
/////////////////////////////
import { GamesComponent } from './games.component';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameDetailsCardComponent } from './shared/game-details-card/game-details-card.component';

@NgModule({
  imports: [
    MahjongModule
  ],
  declarations: [
    GamesComponent,
    GameListComponent,
    GameCreateComponent,
    GameDetailsCardComponent
  ]
})
export class GamesModule { }
