import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { MahjongMayhemApiModule } from '../mahjong-mayhem-api/mahjong-mayhem-api.module';

import { MahjongMayhemApiService } from '../mahjong-mayhem-api/mahjong-mayhem-api.service/mahjong-mayhem-api.service';

import { CanAuthenticateGuard } from './can-authenticate.guard/can-authenticate.guard';

@NgModule({
  imports: [
    AuthRoutingModule,
    MahjongMayhemApiModule
  ],
  providers: [
    CanAuthenticateGuard,
    MahjongMayhemApiService
  ]
})
export class AuthModule { }
