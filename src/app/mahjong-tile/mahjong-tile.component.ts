import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

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

  constructor() {
  }

  ngOnInit() {
  }
}
