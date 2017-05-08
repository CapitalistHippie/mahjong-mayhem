import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';

// Models.
import { Tile } from '../models';

@Component({
  selector: 'app-mahjong-tile',
  templateUrl: './mahjong-tile.component.html',
  styleUrls: ['./mahjong-tile.component.scss']
})
export class MahjongTileComponent implements OnInit {
  @Input() tile: Tile;

  @ViewChild('tile') elementRef: ElementRef;

  constructor(private renderer: Renderer) {
  }

  ngOnInit() {
  }

  public update(): void {
    this.renderer.setElementClass(this.elementRef.nativeElement, this.tile.suit.toLowerCase() + '-' + this.tile.name, true);
  }
}
