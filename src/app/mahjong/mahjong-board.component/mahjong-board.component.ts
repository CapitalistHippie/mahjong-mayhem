import { Component, OnInit, Input, ViewChild, ComponentFactory, ComponentFactoryResolver, Renderer } from '@angular/core';

import { ThemeService } from '../../theme/theme.service/theme.service';

import { MahjongTileComponent } from '../mahjong-tile.component/mahjong-tile.component';

import { MahjongBoardHostDirective } from '../mahjong-board-host.directive/mahjong-board-host.directive';

import { BoardTile } from '../models';

@Component({
  selector: 'app-mahjong-board',
  templateUrl: './mahjong-board.component.html',
  styleUrls: ['./mahjong-board.component.scss'],
  entryComponents: [MahjongTileComponent]
})
export class MahjongBoardComponent implements OnInit {
  @Input() boardTiles: BoardTile[];

  @ViewChild(MahjongBoardHostDirective) mahjongBoardHost: MahjongBoardHostDirective;

  private mahjongTilecomponentFactory: ComponentFactory<MahjongTileComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer, private themeService: ThemeService) {
    this.mahjongTilecomponentFactory = this.componentFactoryResolver.resolveComponentFactory(MahjongTileComponent);
  }

  ngOnInit() {
  }

  public update(): void {
    this.drawBoard();
  }

  private drawBoard(): void {
    let viewContainerRef = this.mahjongBoardHost.viewContainerRef;

    viewContainerRef.clear();

    console.log(this.boardTiles);

    for (let boardTile of this.boardTiles) {
      let elementRef = viewContainerRef.createComponent(this.mahjongTilecomponentFactory);
      let instance = elementRef.instance;

      let theme = this.themeService.getActiveTheme();

      instance.tile = boardTile.tile;
      instance.scaleDirection = 'vertically';
      instance.width = theme.mahjongSpriteWidth;

      // this.renderer.setElementStyle(elementRef, 'position', 'absolute');
      // this.renderer.setElementStyle(elementRef, 'width', theme.mahjongSpriteWidth + 'px');
      // this.renderer.setElementStyle(elementRef, 'left', boardTile.x * theme.mahjongSpriteWidth / 2 + 'px');
      // this.renderer.setElementStyle(elementRef, 'top', boardTile.y * theme.mahjongSpriteHeight / 2 + 'px');
      // this.renderer.setElementStyle(elementRef, 'z-index', boardTile.z.toString());

      instance.update();
    }
  }
}
