import { NgModule } from '@angular/core';

// Modules.
import { MahjongMayhemApiModule } from '../mahjong-mayhem-api/mahjong-mayhem-api.module';

// Services.
import { MahjongMayhemApiService } from '../mahjong-mayhem-api/mahjong-mayhem-api.service';

@NgModule({
  imports: [
    MahjongMayhemApiModule
  ],
  providers: [
    MahjongMayhemApiService
  ]
})
export class MahjongModule { }
