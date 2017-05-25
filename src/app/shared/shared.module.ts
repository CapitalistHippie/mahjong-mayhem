import { NgModule } from '@angular/core';

// Components.
import { MahjongBoardComponent } from './mahjong-board/mahjong-board.component';
import { MahjongTileComponent } from './mahjong-tile/mahjong-tile.component';

// Directives.
import { MahjongBoardHostDirective } from './mahjong-board-host/mahjong-board-host.directive';

@NgModule({
  imports: [
    MahjongBoardComponent,
    MahjongTileComponent,
    MahjongBoardHostDirective
  ],
  declarations: []
})
export class SharedModule { }
