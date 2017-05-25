/////////////////////////////
// Modules.
/////////////////////////////
// Angular modules.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';

// App modules.
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { GamesModule } from './games/games.module';

/////////////////////////////
// Components.
/////////////////////////////
import { AppComponent } from './app.component';

// Services.
import { MahjongMayhemApiService } from './mahjong-mayhem-api/mahjong-mayhem-api.service';

import 'hammerjs';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    SharedModule,
    GamesModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    MahjongMayhemApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
