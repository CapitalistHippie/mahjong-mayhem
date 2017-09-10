import { Component, OnInit, Input, ViewChild, ComponentFactory, ComponentFactoryResolver, Renderer } from '@angular/core';

import { MahjongTileComponent } from '../mahjong-tile.component/mahjong-tile.component';

import { MahjongBoardHostDirective } from '../mahjong-board-host.directive/mahjong-board-host.directive';

import { Tile } from '../models';

@Component({
  selector: 'app-mahjong-board',
  templateUrl: './mahjong-board.component.html',
  styleUrls: ['./mahjong-board.component.scss'],
  entryComponents: [MahjongTileComponent]
})
export class MahjongBoardComponent implements OnInit {
  @Input() tiles: Tile[];

  @ViewChild(MahjongBoardHostDirective) mahjongBoardHost: MahjongBoardHostDirective;

  private mahjongTilecomponentFactory: ComponentFactory<MahjongTileComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer) {
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

    console.log(this.tiles);

    for (let tile of this.tiles) {
      let elementRef = viewContainerRef.createComponent(this.mahjongTilecomponentFactory);
      let instance = elementRef.instance;
      let nativeElement = instance.elementRef.nativeElement;

      instance.tile = tile;
      instance.update();

      // this.renderer.setElementStyle(nativeElement, 'position', 'absolute');
      // this.renderer.setElementStyle(nativeElement, 'left', gameTile.xPos * 349 / 2 + 'px');
      // this.renderer.setElementStyle(nativeElement, 'top', gameTile.yPos * 480 / 2 + 'px');
      // this.renderer.setElementStyle(nativeElement, 'z-index', gameTile.zPos.toString());
    }
  }
}
