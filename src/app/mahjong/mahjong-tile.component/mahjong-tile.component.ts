import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef, Renderer } from '@angular/core';

import { ThemeService } from '../../theme/theme.service/theme.service';

import { Tile } from '../models';

@Component({
  selector: 'app-mahjong-tile',
  templateUrl: './mahjong-tile.component.html',
  styleUrls: ['./mahjong-tile.component.scss']
})
export class MahjongTileComponent implements OnInit, OnChanges {
  @Input() tile: Tile;
  @Input() scaleDirection: string;

  @ViewChild('tile') elementRef: ElementRef;

  constructor(private renderer: Renderer, private themeService: ThemeService) {
  }

  ngOnInit() {
    this.update();
  }

  ngOnChanges() {
    this.update();
  }

  public update(): void {
    if (this.tile == null) {
      return;
    }

    switch (this.scaleDirection) {
      case 'horizontally': {
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'height', 'inherit');

        let activeTheme = this.themeService.getActiveTheme();
        let spriteWidth = activeTheme.mahjongSpriteWidth;
        let spriteHeight = activeTheme.mahjongSpriteHeight;
        let spriteRatio = spriteWidth / spriteHeight;

        let height = parseInt(window.getComputedStyle(this.elementRef.nativeElement).height.match(/\d+/)[0]);
        let heightType = window.getComputedStyle(this.elementRef.nativeElement).height.match(/\D+/)[0];
        let width = Math.round(height * spriteRatio);

        this.renderer.setElementStyle(this.elementRef.nativeElement, 'width', width + heightType);
        break;
      }
      case 'vertically': {
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'width', 'inherit');

        let activeTheme = this.themeService.getActiveTheme();
        let spriteWidth = activeTheme.mahjongSpriteWidth;
        let spriteHeight = activeTheme.mahjongSpriteHeight;
        let spriteRatio = spriteHeight / spriteWidth;

        let width = parseInt(window.getComputedStyle(this.elementRef.nativeElement).width.match(/\d+/)[0]);
        let widthType = window.getComputedStyle(this.elementRef.nativeElement).width.match(/\D+/)[0];
        let height = Math.round(width * spriteRatio);

        this.renderer.setElementStyle(this.elementRef.nativeElement, 'height', height + widthType);

        break;
      }
      default:
      case 'none': {
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'width', 'inherit');
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'height', 'inherit');
        break;
      }
    }

    this.renderer.setElementAttribute(this.elementRef.nativeElement, 'class', '');
    this.renderer.setElementClass(this.elementRef.nativeElement, this.tile.suit.toLowerCase() + '-' + this.tile.name.toLowerCase(), true);
  }
}
