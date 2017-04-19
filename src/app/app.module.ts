import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppAngularMaterialModule } from './app-angular-material.module';

import { AppComponent } from './app.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';

import { MahjongMayhemApiService } from './mahjong-mayhem-api.service';

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
    AppAngularMaterialModule,
    FlexLayoutModule
  ],
  providers: [MahjongMayhemApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
