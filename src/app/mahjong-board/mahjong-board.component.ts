import { Component, OnInit, Input, ViewChild, ComponentFactory, ComponentFactoryResolver } from '@angular/core';

// Components.
import { MahjongTileComponent } from '../mahjong-tile/mahjong-tile.component';

// Directives.
import { MahjongBoardHostDirective } from '../mahjong-board-host.directive';

// Models.
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

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
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

    for (let tile in this.tiles) {
      viewContainerRef.createComponent(this.mahjongTilecomponentFactory);
    }
  }
}
