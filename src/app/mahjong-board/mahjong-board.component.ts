import { Component, OnInit, Input, ViewChild, ComponentFactory, ComponentFactoryResolver, Renderer } from '@angular/core';

// Components.
import { MahjongTileComponent } from '../mahjong-tile/mahjong-tile.component';

// Directives.
import { MahjongBoardHostDirective } from '../mahjong-board-host.directive';

// Models.
import { GameTile } from '../models';

@Component({
  selector: 'app-mahjong-board',
  templateUrl: './mahjong-board.component.html',
  styleUrls: ['./mahjong-board.component.scss'],
  entryComponents: [MahjongTileComponent]
})
export class MahjongBoardComponent implements OnInit {
  @Input() gameTiles: GameTile[];

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

    console.log(this.gameTiles);

    for (let gameTile of this.gameTiles) {
      let elementRef = viewContainerRef.createComponent(this.mahjongTilecomponentFactory);
      elementRef.instance.tile = gameTile.tile;
      elementRef.instance.update();
      // this.renderer.setElementStyle(elementRef.instance.elementRef.nativeElement, 'background-color', 'green');
      // this.renderer.setElementStyle(elementRef.instance.elementRef.nativeElement, 'position', 'relative');
    }
  }
}
