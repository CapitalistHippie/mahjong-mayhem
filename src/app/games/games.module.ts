// Modules.
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AuthModule } from '../auth/auth.module';
import { MahjongModule } from '../mahjong/mahjong.module';
import { SharedModule } from '../shared/shared.module';

// Services.
import { AuthService } from '../auth/auth.service';

// Components.
import { GamesComponent } from './games.component';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameDetailsCardComponent } from './shared/game-details-card/game-details-card.component';

// Decorators.
import { NgModule } from '@angular/core';

// Pipes.
import { GamesPipe } from './games.pipe';

@NgModule({
  imports: [
    AuthModule,
    AngularMaterialModule,
    MahjongModule,
    SharedModule
  ],
  declarations: [
    GamesComponent,
    GameListComponent,
    GameCreateComponent,
    GameDetailsCardComponent,
    GamesPipe
  ],
  providers: [
    AuthService
  ]
})
export class GamesModule { }
