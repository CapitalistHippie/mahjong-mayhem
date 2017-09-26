import { NgModule } from '@angular/core';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import { GamesRoutingModule } from './games-routing.module';
import { MahjongModule } from '../mahjong/mahjong.module';
import { MahjongMayhemApiModule } from '../mahjong-mayhem-api/mahjong-mayhem-api.module';
import { ThemeModule } from '../theme/theme.module';

import { AuthService } from '../auth/auth.service/auth.service';
import { GameService } from './game.service/game.service';
import { MahjongService } from '../mahjong/mahjong.service/mahjong.service';
import { MahjongMayhemApiService } from '../mahjong-mayhem-api/mahjong-mayhem-api.service/mahjong-mayhem-api.service';

import { GameCreateComponent } from './game-create.component/game-create.component';
import { GameDetailsCardComponent } from './game-details-card.component/game-details-card.component';
import { GameListComponent } from './game-list.component/game-list.component';
import { GameComponent } from './game.component/game.component';
import { SelectGameListComponent } from './select-game-list.component/select-game-list.component';

import { GamesPipe } from './games.pipe/games.pipe';

@NgModule({
  imports: [
    AngularMaterialModule,
    // AuthModule, // NOTE: Somehow causes a stack overflow.
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    GamesRoutingModule,
    MahjongModule,
    MahjongMayhemApiModule,
    ThemeModule
  ],
  declarations: [
    GameCreateComponent,
    GameDetailsCardComponent,
    GameListComponent,
    GameComponent,
    SelectGameListComponent,
    GamesPipe
  ],
  providers: [
    GameService
  ]
})
export class GamesModule { }
