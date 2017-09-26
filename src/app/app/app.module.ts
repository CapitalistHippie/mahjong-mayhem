import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { AuthService } from '../auth/auth.service/auth.service';
import { MahjongMayhemApiService } from '../mahjong-mayhem-api/mahjong-mayhem-api.service/mahjong-mayhem-api.service';
import { MahjongService } from '../mahjong/mahjong.service/mahjong.service';
import { ThemeService } from '../theme/theme.service/theme.service';

import { AppComponent } from './app.component/app.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AuthService,
    MahjongMayhemApiService,
    MahjongService,
    ThemeService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
