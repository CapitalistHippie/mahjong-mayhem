import { Injectable, Output, EventEmitter } from '@angular/core';

// Models.
import { Theme } from './theme.model';

@Injectable()
export class ThemeService {
  private activeTheme: Theme;

  @Output() themeChanged: EventEmitter<Theme> = new EventEmitter();

  constructor() {
    this.setActiveTheme(this.getDefaultTheme());
  }

  setActiveTheme(theme: Theme): void {
    this.activeTheme = theme;

    this.themeChanged.emit(theme);
  }

  getThemes(): Theme[] {
    let themes: Theme[] = [];

    let theme1 = new Theme();
    theme1.name = 'Theme 1';
    theme1.className = 'app-theme-1';
    theme1.mahjongSpriteWidth = 349;
    theme1.mahjongSpriteHeight = 480;
    themes.push(theme1);

    let theme2 = new Theme();
    theme2.name = 'Theme 2';
    theme2.className = 'app-theme-2';
    theme1.mahjongSpriteWidth = 73.14285714285714;
    theme1.mahjongSpriteHeight = 90.33333333333333;
    themes.push(theme2);

    return themes;
  }

  getActiveTheme(): Theme {
    return this.activeTheme;
  }

  getDefaultTheme(): Theme {
    return this.getThemes()[0];
  }
}
