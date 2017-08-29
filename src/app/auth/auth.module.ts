import { NgModule } from '@angular/core';

import { MahjongMayhemApiModule } from '../mahjong-mayhem-api/mahjong-mayhem-api.module';

import { MahjongMayhemApiService } from '../mahjong-mayhem-api/mahjong-mayhem-api.service';

import { CanAuthenticateGuard } from './can-authenticate.guard/can-authenticate.guard';

@NgModule({
  imports: [
    MahjongMayhemApiModule
  ],
  providers: [
    MahjongMayhemApiService,
    CanAuthenticateGuard
  ]
})
export class AuthModule { }
