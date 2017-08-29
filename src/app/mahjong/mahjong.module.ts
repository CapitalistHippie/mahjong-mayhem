import { NgModule } from '@angular/core';

import { MahjongMayhemApiModule } from '../mahjong-mayhem-api/mahjong-mayhem-api.module';
import { ThemeModule } from '../theme/theme.module';

import { MahjongMayhemApiService } from '../mahjong-mayhem-api/mahjong-mayhem-api.service';
import { ThemeService } from '../theme/theme.service/theme.service';

import { MahjongBoardComponent } from './mahjong-board.component/mahjong-board.component';
import { MahjongTileComponent } from './mahjong-tile.component/mahjong-tile.component';

import { MahjongBoardHostDirective } from './mahjong-board-host.directive/mahjong-board-host.directive';

@NgModule({
  imports: [
    MahjongMayhemApiModule,
    ThemeModule
  ],
  providers: [
    MahjongMayhemApiService,
    ThemeService
  ],
  declarations: [
    MahjongBoardComponent,
    MahjongTileComponent,
    MahjongBoardHostDirective
  ],
  exports: [
    MahjongBoardComponent,
    MahjongTileComponent,
    MahjongBoardHostDirective
  ]
})
export class MahjongModule { }
