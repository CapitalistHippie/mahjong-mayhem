import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Theme } from '../theme.model';

@Injectable()
export class ThemeService {
  private themeChanged = new BehaviorSubject<Theme>(this.getDefaultTheme());

  themeChanged$ = this.themeChanged.asObservable();

  constructor() {
  }

  setActiveTheme(theme: Theme): void {
    this.themeChanged.next(theme);
  }

  getThemes(): Theme[] {
    let themes: Theme[] = [];

    let theme1 = new Theme();
    theme1.name = 'Theme 1';
    theme1.cssClassName = 'app-theme-1';
    theme1.mahjongSpriteWidth = 349;
    theme1.mahjongSpriteHeight = 480;
    themes.push(theme1);

    let theme2 = new Theme();
    theme2.name = 'Theme 2';
    theme2.cssClassName = 'app-theme-2';
    theme2.mahjongSpriteWidth = 73.14285714285714;
    theme2.mahjongSpriteHeight = 90.33333333333333;
    themes.push(theme2);

    return themes;
  }

  getActiveTheme(): Theme {
    return this.themeChanged.getValue();
  }

  getDefaultTheme(): Theme {
    return this.getThemes()[0];
  }
}
