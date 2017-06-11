// Directives.
import { NgModule } from '@angular/core';

// Modules.
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components.
// import { MahjongBoardComponent } from './mahjong-board/mahjong-board.component';
// import { MahjongTileComponent } from './mahjong-tile/mahjong-tile.component';

// Directives.
// import { MahjongBoardHostDirective } from './mahjong-board-host/mahjong-board-host.directive';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    AngularMaterialModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule,
    AngularMaterialModule
  ]
})
export class SharedModule { }
