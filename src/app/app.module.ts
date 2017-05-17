// Modules.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';

// Components.
import { AppComponent } from './app.component';
import { GameListComponent } from './game-list/game-list.component';
import { GamesComponent } from './games/games.component';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameDetailsCardComponent } from './game-details-card/game-details-card.component';
import { MahjongBoardComponent } from './mahjong-board/mahjong-board.component';
import { MahjongTileComponent } from './mahjong-tile/mahjong-tile.component';

// View components.
import { ViewGamesComponent } from './view-games/view-games.component';

// Services.
import { MahjongMayhemApiService } from './mahjong-mayhem-api.service';
import { ThemeService } from './theme.service';

// Directives
import { ThemeDirective } from './theme.directive';
import { MahjongBoardHostDirective } from './mahjong-board-host.directive';

// Guards.
import { CanAuthenticateGuard } from './can-authenticate.guard';

import 'hammerjs';

const appRoutes: Routes = [
  {
    path: 'authcallback',
    canActivate: [CanAuthenticateGuard],
    component: GamesComponent
  },
  {
    path: 'games',
    component: ViewGamesComponent
  },
  {
    path: 'creategame',
    component: GameCreateComponent
  },
  {
    path: '',
    redirectTo: '/games',
    pathMatch: 'full'
  },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent
  // }
]

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GamesComponent,
    GameCreateComponent,
    GameDetailsCardComponent,
    MahjongBoardComponent,
    MahjongTileComponent,
    ThemeDirective,
    MahjongBoardHostDirective,
    ViewGamesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  providers: [
    MahjongMayhemApiService,
    ThemeService,
    CanAuthenticateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
