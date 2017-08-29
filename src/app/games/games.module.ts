import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AuthModule } from '../auth/auth.module';
import { GamesRoutingModule } from './games-routing.module';
import { MahjongModule } from '../mahjong/mahjong.module';

import { AuthService } from '../auth/auth.service/auth.service';
import { MahjongService } from '../mahjong/mahjong.service';
import { MahjongMayhemApiToMahjongAdapterService } from '../mahjong/mahjong-mayhem-api-to-mahjong-adapter.service';

import { GameCreateComponent } from './game-create/game-create.component';
import { GameDetailsCardComponent } from './game-details-card/game-details-card.component';
import { GameListComponent } from './game-list/game-list.component';
import { GamesComponent } from './games/games.component';

import { NgModule } from '@angular/core';

import { GamesPipe } from './games.pipe';

@NgModule({
  imports: [
    AuthModule,
    AngularMaterialModule,
    GamesRoutingModule,
    MahjongModule
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
    {
      provide: MahjongService,
      useClass: MahjongMayhemApiToMahjongAdapterService
    }
  ]
})
export class GamesModule { }
