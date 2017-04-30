import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class ThemeService {
  public readonly defaultTheme: string;

  private theme: string;

  @Output() themeChanged: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.defaultTheme = 'app-theme1';

    this.setTheme(this.defaultTheme);
  }

  setTheme(theme: string): void {
    this.theme = theme;

    this.themeChanged.emit(theme);
  }

  getTheme(): string {
    return this.theme;
  }
}
