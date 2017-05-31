// Modules.
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AuthModule } from '../auth/auth.module';
import { GamesRoutingModule } from './games-routing.module';
import { MahjongModule } from '../mahjong/mahjong.module';
import { SharedModule } from '../shared/shared.module';

// Services.
import { AuthService } from '../auth/auth.service';
import { MahjongService } from '../mahjong/mahjong.service';

// Components.
import { GameCreateComponent } from './game-create/game-create.component';
import { GameDetailsCardComponent } from './game-details-card/game-details-card.component';
import { GameListComponent } from './game-list/game-list.component';
import { GamesComponent } from './games/games.component';

// Decorators.
import { NgModule } from '@angular/core';

// Pipes.
import { GamesPipe } from './games.pipe';

@NgModule({
  imports: [
    AuthModule,
    AngularMaterialModule,
    GamesRoutingModule,
    MahjongModule,
    SharedModule
  ],
  declarations: [
    GameCreateComponent,
    GameDetailsCardComponent,
    GameListComponent,
    GamesComponent,
    GamesPipe
  ],
  providers: [
    AuthService,
    MahjongService
  ]
})
export class GamesModule { }
