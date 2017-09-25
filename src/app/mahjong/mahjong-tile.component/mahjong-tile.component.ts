import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ThemeService } from '../../theme/theme.service/theme.service';

import { Tile } from '../models';

@Component({
  selector: 'app-mahjong-tile',
  templateUrl: './mahjong-tile.component.html',
  styleUrls: ['./mahjong-tile.component.scss']
})
export class MahjongTileComponent implements OnInit, OnDestroy {
  @Input() tile: Tile;
  @Input() scaleDirection: string;

  @ViewChild('tile') elementRef: ElementRef;

  private themeSubscription: Subscription;

  constructor(private renderer: Renderer2, private themeService: ThemeService) {
    this.themeSubscription = this.themeService.themeChanged$.subscribe((theme) => {
      this.update();
    });
  }

  ngOnInit() {
    this.update();
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  public update(): void {
    if (this.tile == null) {
      return;
    }

    switch (this.scaleDirection) {
      case 'horizontally': {
        this.renderer.setStyle(this.elementRef.nativeElement, 'height', 'inherit');

        let activeTheme = this.themeService.getActiveTheme();
        let spriteWidth = activeTheme.mahjongSpriteWidth;
        let spriteHeight = activeTheme.mahjongSpriteHeight;
        let spriteRatio = spriteWidth / spriteHeight;

        let height = parseFloat(window.getComputedStyle(this.elementRef.nativeElement).height.match(/[\.\d]+/)[0]);
        let heightType = window.getComputedStyle(this.elementRef.nativeElement).height.match(/[^\.\d]+/)[0];
        let width = Math.round(height * spriteRatio);

        this.renderer.setStyle(this.elementRef.nativeElement, 'width', width + heightType);
        break;
      }
      case 'vertically': {
        this.renderer.setStyle(this.elementRef.nativeElement, 'width', 'inherit');

        let activeTheme = this.themeService.getActiveTheme();
        let spriteWidth = activeTheme.mahjongSpriteWidth;
        let spriteHeight = activeTheme.mahjongSpriteHeight;
        let spriteRatio = spriteHeight / spriteWidth;

        let width = parseFloat(window.getComputedStyle(this.elementRef.nativeElement).width.match(/[\.\d]+/)[0]);
        let widthType = window.getComputedStyle(this.elementRef.nativeElement).width.match(/[^\.\d]+/)[0];
        let height = Math.round(width * spriteRatio);

        this.renderer.setStyle(this.elementRef.nativeElement, 'height', height + widthType);

        break;
      }
      case 'none':
      default: {
        this.renderer.setStyle(this.elementRef.nativeElement, 'width', 'inherit');
        this.renderer.setStyle(this.elementRef.nativeElement, 'height', 'inherit');
        break;
      }
    }

    this.renderer.setAttribute(this.elementRef.nativeElement, 'class', '');
    this.renderer.addClass(this.elementRef.nativeElement, this.tile.suit.toLowerCase() + '-' + this.tile.name.toLowerCase());
  }
}
