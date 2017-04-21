import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';

import { MahjongMayhemApiService } from './mahjong-mayhem-api.service';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GameDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'games',
        component: GameListComponent
      }
    ]),
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [MahjongMayhemApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
