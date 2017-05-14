import { Directive, ElementRef, Renderer } from '@angular/core';

// Services.
import { ThemeService } from './theme.service';

// Models.
import { Theme } from './models';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective {
  elementReference: ElementRef;
  currentTheme: Theme;

  constructor(private el: ElementRef, private renderer: Renderer, private themeService: ThemeService) {
    this.elementReference = el;
    this.currentTheme = null;

    this.setTheme(this.themeService.getActiveTheme());

    themeService.themeChanged.subscribe(theme => {
      this.setTheme(theme);
    });
  }

  private setTheme(theme: Theme): void {
    if (this.currentTheme !== null) {
      this.renderer.setElementClass(this.elementReference.nativeElement, this.currentTheme.className, false);
    }

    this.renderer.setElementClass(this.elementReference.nativeElement, theme.className, true);

    this.currentTheme = theme;
  }
}
