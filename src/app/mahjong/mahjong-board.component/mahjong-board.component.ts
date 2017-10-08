import { Component, OnInit, OnDestroy, Input, ViewChild, ComponentFactory, ComponentFactoryResolver, Renderer2, ElementRef, ComponentRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

import { ThemeService } from '../../theme/theme.service/theme.service';

import { MahjongTileComponent } from '../mahjong-tile.component/mahjong-tile.component';

import { MahjongBoardHostDirective } from '../mahjong-board-host.directive/mahjong-board-host.directive';

import { BoardTile, Tile } from '../models';

import { MatchEvent } from '../../mahjong-mayhem-api/models'

declare var io: any;

@Component({
  selector: 'app-mahjong-board',
  templateUrl: './mahjong-board.component.html',
  styleUrls: ['./mahjong-board.component.scss'],
  entryComponents: [MahjongTileComponent]
})
export class MahjongBoardComponent implements OnInit, OnDestroy {

  @Input() boardTiles: BoardTile[];

  private selectedTile: MahjongTileComponent;

  @ViewChild(MahjongBoardHostDirective) mahjongBoardHost: MahjongBoardHostDirective;

  private mahjongTilecomponentFactory: ComponentFactory<MahjongTileComponent>;

  private tileComponentRefs: [ComponentRef<MahjongTileComponent>, BoardTile][];

  private resizeSubscription: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2, private elementRef: ElementRef, private themeService: ThemeService) {
    console.log(elementRef);
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

  public handleSocketMatch(matches: MatchEvent[]) {
    console.log(matches);
    if (matches.length == 2) {
      console.log(this);
      let tiles = this.tileComponentRefs.filter(t => {
        let tile = t[1];
        return (tile.x == matches[0].xPos && tile.y == matches[0].yPos && tile.z == matches[0].zPos) ||
          (tile.x == matches[1].xPos && tile.y == matches[1].yPos && tile.z == matches[1].zPos)
      });
      if (tiles.length >= 2) {
        this.handleTileMatch(tiles[0][1].tile, tiles[1][1].tile);
      }
    }
    else {
      alert("An error occured, sorry :(");
    }
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

  private isTileClickValid(ref: MahjongTileComponent): Boolean {

    let tileComp = this.tileComponentRefs.find(r => {
      return r[0].instance == ref
    });

    let clickedTile = tileComp[1];

    // Find the nearest tiles, so we don't have to do multiple searches over the entire board.
    let vicinityTiles = this.tileComponentRefs.filter(r => {
      let distY = (r[1].y > clickedTile.y) ? r[1].y - clickedTile.y : clickedTile.y - r[1].y
      let distX = (r[1].x > clickedTile.x) ? r[1].x - clickedTile.x : clickedTile.x - r[1].x

      let nearY = Math.abs(distY) <= 2
      let nearX = Math.abs(distX) <= 2

      return nearY && nearX;
    })

    let overLapTile = vicinityTiles.find(r => {
      let onTop = false;
      let intersectX = false;
      let intersectY = false;
      intersectX = Math.abs(r[1].x - clickedTile.x) <= 1
      intersectY = Math.abs(r[1].y - clickedTile.y) <= 1
      onTop = r[1].z > clickedTile.z

      return onTop && intersectX && intersectY;;
    })
    if (overLapTile) {
      // This tile is below another one
      return false;
    }

    let leftOfTile = vicinityTiles.find(r => {
      return clickedTile.x + 2 == r[1].x && r[1].y == clickedTile.y && r[1].z == clickedTile.z
    })
    let rightOfTile = vicinityTiles.find(r => {
      return clickedTile.x - 2 == r[1].x && r[1].y == clickedTile.y && r[1].z == clickedTile.z
    })
    if (leftOfTile && rightOfTile) {
      // This tile is inbetween 2 tiles (on the x-axis)
      return false;
    }

    let aboveTile = vicinityTiles.find(r => {
      return clickedTile.y + 2 == r[1].y && r[1].x == clickedTile.x && r[1].z == clickedTile.z
    })
    let belowTile = vicinityTiles.find(r => {
      return clickedTile.y - 2 == r[1].y && r[1].x == clickedTile.x && r[1].z == clickedTile.z
    })
    if (aboveTile && belowTile) {
      // This tile is inbetween 2 tiles (on the y-axis)
      return false;
    }

    return true;
  }

  public onTileClick(componentRef: MahjongTileComponent): void {
    if (!this.isTileClickValid(componentRef)) {
      return;
    }
    if (this.selectedTile == componentRef) { // Clicked on the same thing -> deselect
      this.selectedTile.isSelected = false;
      this.selectedTile = null;
    }
    else if (this.selectedTile) { // We have a selected tile: compare!
      console.log(this.selectedTile.tile.name + " vs " + componentRef.tile.name + " and " + this.selectedTile.tile.suit + " vs " + componentRef.tile.suit)
      if (this.selectedTile.tile.name == componentRef.tile.name && this.selectedTile.tile.suit == componentRef.tile.suit) {
        this.handleTileMatch(this.selectedTile.tile, componentRef.tile);
      }
      this.selectedTile.isSelected = false;
      this.selectedTile = null;
    }
    else { // No tiles selected yet, mark as selected
      this.selectedTile = componentRef;
      componentRef.isSelected = !componentRef.isSelected
    }
  }

  private handleTileMatch(tile1: Tile, tile2: Tile): void {
    let tilesToRemove = this.tileComponentRefs.filter(ref => {
      return ref[0].instance.tile == tile1 || ref[0].instance.tile == tile2
    })
    if (tilesToRemove.length > 2) {
      alert("I will not remove more than 2 tiles at a time!");
      return
    }

    this.boardTiles = this.boardTiles.filter(t => {
      return !tilesToRemove.find(f => f[1].tile == t.tile)
    })

    this.tileComponentRefs = this.tileComponentRefs.filter(ref => {
      return ref[0].instance.tile != tile1 && ref[0].instance.tile != tile2;
    })
    this.update();
  }

  private drawBoard(): void {
    let viewContainerRef = this.mahjongBoardHost.viewContainerRef;

    viewContainerRef.clear();
    this.tileComponentRefs = [];

    for (let boardTile of this.boardTiles) {
      // For every update recreate all components? =/
      let componentRef = viewContainerRef.createComponent(this.mahjongTilecomponentFactory);
      let elementRef = componentRef.location;
      let nativeElement = elementRef.nativeElement;
      let instance = componentRef.instance;

      componentRef.instance.onSelected.subscribe(tile => this.onTileClick(tile))

      instance.tile = boardTile.tile;
      instance.scaleDirection = 'vertically';

      this.renderer.setStyle(nativeElement, 'position', 'absolute');
      this.renderer.setStyle(nativeElement, 'z-index', boardTile.z);

      this.tileComponentRefs.push([componentRef, boardTile]);
    }

    this.resize();
  }
}
