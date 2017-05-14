import { Injectable, Output, EventEmitter } from '@angular/core';

// Models.
import { Theme } from './models';

@Injectable()
export class ThemeService {
  private theme: Theme;

  @Output() themeChanged: EventEmitter<Theme> = new EventEmitter();

  constructor() {
    this.setTheme(this.getDefaultTheme());
  }

  setTheme(theme: Theme): void {
    this.theme = theme;

    this.themeChanged.emit(theme);
  }

  getThemes(): Theme[] {
    let themes: Theme[] = [];

    let theme1 = new Theme();
    theme1.name = 'Theme 1';
    theme1.className = 'app-theme-1';
    themes.push(theme1);

    let theme2 = new Theme();
    theme2.name = 'Theme 2';
    theme2.className = 'app-theme-2';
    themes.push(theme2);

    return themes;
  }

  getTheme(): Theme {
    return this.theme;
  }

  getDefaultTheme(): Theme {
    return this.getThemes()[0];
  }
}
