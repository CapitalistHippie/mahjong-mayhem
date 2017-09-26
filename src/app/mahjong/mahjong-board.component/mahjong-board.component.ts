import { Component, OnInit, OnDestroy, Input, ViewChild, ComponentFactory, ComponentFactoryResolver, Renderer2, ElementRef, ComponentRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

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
export class MahjongBoardComponent implements OnInit, OnDestroy {

  @Input() boardTiles: BoardTile[];

  @ViewChild(MahjongBoardHostDirective) mahjongBoardHost: MahjongBoardHostDirective;

  private mahjongTilecomponentFactory: ComponentFactory<MahjongTileComponent>;

  private tileComponentRefs: [ComponentRef<MahjongTileComponent>, BoardTile][];

  private resizeSubscription: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2, private elementRef: ElementRef, private themeService: ThemeService) {
    this.mahjongTilecomponentFactory = this.componentFactoryResolver.resolveComponentFactory(MahjongTileComponent);
    this.tileComponentRefs = [];

    let $resizeEvent = Observable.fromEvent(window, 'resize').debounceTime(10);

    this.resizeSubscription = $resizeEvent.subscribe(() => {
      this.resize();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }

  public update(): void {
    this.drawBoard();
  }

  public resize(): void {
    // Get element location so we can offset the tile elements their locations. TODO: Add extra in case the offset + depth illusion offset goes beyond the border.
    let elementRect = this.elementRef.nativeElement.getBoundingClientRect();
    let elementX = elementRect.left;
    let elementY = elementRect.top;
    let elementWidth = this.elementRef.nativeElement.offsetWidth;

    let theme = this.themeService.getActiveTheme();
    let spriteRatio = theme.mahjongSpriteHeight / theme.mahjongSpriteWidth;

    // Get the amount of sprites over the width.
    let amountOfSpritesOverWidth = Math.max.apply(null, this.tileComponentRefs.map(item => {
      return item[1].x;
    }));

    // Calculate the width and height the sprites should be based on the space we got and the amount of tiles over the width.
    let spriteWidth = elementWidth / ((amountOfSpritesOverWidth + 1) / 2);
    let spriteHeight = spriteWidth * spriteRatio;

    // Calculate extra x and y offset for depth illusion.
    let depthIllusionOffsetX = spriteWidth * theme.mahjongSpriteDepthIllusionOffsetX;
    let depthIllusionOffsetY = spriteHeight * theme.mahjongSpriteDepthIllusionOffsetY;

    for (let tileComponentRefsTuple of this.tileComponentRefs) {
      let tileComponentRef = tileComponentRefsTuple[0];
      let boardTile = tileComponentRefsTuple[1];

      let tileElementRef = tileComponentRef.location;
      let tileNativeElement = tileElementRef.nativeElement as MahjongTileComponent;
      let tileInstance = tileComponentRef.instance;

      // Board tile x and y indexes start at 1 so to not offset too much we reduce the indexes by 1.
      this.renderer.setStyle(tileNativeElement, 'left', elementX + (boardTile.x - 1) * spriteWidth / 2 + boardTile.z * depthIllusionOffsetX + 'px');
      this.renderer.setStyle(tileNativeElement, 'top', elementY + (boardTile.y - 1) * spriteHeight / 2 + boardTile.z * depthIllusionOffsetY + 'px');
      this.renderer.setStyle(tileNativeElement, 'width', spriteWidth + 'px');

      tileInstance.update();
    }
  }

  private drawBoard(): void {
    let viewContainerRef = this.mahjongBoardHost.viewContainerRef;

    viewContainerRef.clear();

    for (let boardTile of this.boardTiles) {
      let componentRef = viewContainerRef.createComponent(this.mahjongTilecomponentFactory);
      let elementRef = componentRef.location;
      let nativeElement = elementRef.nativeElement;
      let instance = componentRef.instance;

      instance.tile = boardTile.tile;
      instance.scaleDirection = 'vertically';

      this.renderer.setStyle(nativeElement, 'position', 'absolute');
      this.renderer.setStyle(nativeElement, 'z-index', boardTile.z);

      this.tileComponentRefs.push([componentRef, boardTile]);
    }

    this.resize();
  }
}
