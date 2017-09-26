import { Component, OnInit, Input, ViewChild, ComponentFactory, ComponentFactoryResolver, Renderer2, ElementRef } from '@angular/core';

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

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2, private elementRef: ElementRef, private themeService: ThemeService) {
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

    // Get element location so we can offset the tile elements their locations.
    let elementRect = this.elementRef.nativeElement.getBoundingClientRect();
    let x = elementRect.left;
    let y = elementRect.top;

    for (let boardTile of this.boardTiles) {
      let componentRef = viewContainerRef.createComponent(this.mahjongTilecomponentFactory);
      let elementRef = componentRef.location;
      let nativeElement = elementRef.nativeElement;
      let instance = componentRef.instance;

      instance.tile = boardTile.tile;
      instance.scaleDirection = 'vertically';

      let theme = this.themeService.getActiveTheme();

      this.renderer.setStyle(nativeElement, 'position', 'absolute');
      this.renderer.setStyle(nativeElement, 'width', theme.mahjongSpriteWidth + 'px');

      // Board tile x and y indexes start at 1 so to not offset too much we reduce that by one.
      this.renderer.setStyle(nativeElement, 'left', x + (boardTile.x - 1) * theme.mahjongSpriteWidth / 2 + 'px');
      this.renderer.setStyle(nativeElement, 'top', y + (boardTile.y - 1) * theme.mahjongSpriteHeight / 2 + 'px');
      this.renderer.setStyle(nativeElement, 'z-index', boardTile.z.toString());

      instance.update();
    }
  }
}
