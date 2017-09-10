import { NgModule } from '@angular/core';

import { ThemeModule } from '../theme/theme.module';

import { ThemeService } from '../theme/theme.service/theme.service';

import { MahjongBoardComponent } from './mahjong-board.component/mahjong-board.component';
import { MahjongTileComponent } from './mahjong-tile.component/mahjong-tile.component';

import { MahjongBoardHostDirective } from './mahjong-board-host.directive/mahjong-board-host.directive';

@NgModule({
  imports: [
    ThemeModule
  ],
  providers: [
    ThemeService
  ],
  declarations: [
    MahjongBoardComponent,
    MahjongTileComponent,
    MahjongBoardHostDirective
  ],
  exports: [
    MahjongTileComponent,
    MahjongBoardHostDirective
  ]
})
export class MahjongModule { }
