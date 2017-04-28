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
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GamesComponent } from './games/games.component';
import { GameCreateComponent } from './game-create/game-create.component';

// Services.
import { MahjongMayhemApiService } from './mahjong-mayhem-api.service';

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
    component: GamesComponent
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
    GameDetailComponent,
    GamesComponent,
    GameCreateComponent
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
    CanAuthenticateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
