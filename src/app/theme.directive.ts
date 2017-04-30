import { Directive, ElementRef, Renderer } from '@angular/core';

// Services.
import { ThemeService } from './theme.service';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective {
  elementReference: ElementRef;
  currentTheme: string;

  constructor(private el: ElementRef, private renderer: Renderer, private themeService: ThemeService) {
    this.elementReference = el;
    this.currentTheme = null;

    this.setTheme(this.themeService.getTheme());

    themeService.themeChanged.subscribe(theme => {
      this.setTheme(theme);
    });
  }

  private setTheme(theme: string): void {
    if (this.currentTheme !== null) {
      this.renderer.setElementClass(this.elementReference.nativeElement, this.currentTheme, false);
    }

    this.renderer.setElementClass(this.elementReference.nativeElement, theme, true);

    this.currentTheme = theme;
  }
}
