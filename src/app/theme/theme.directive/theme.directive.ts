import { Directive, ElementRef, Renderer } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ThemeService } from '../theme.service/theme.service';

import { Theme } from '../theme.model';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective {
  private theme: Theme;
  private themeSubscription: Subscription;

  constructor(private elementReference: ElementRef, private renderer: Renderer, private themeService: ThemeService) {
    this.theme = null;

    this.themeSubscription = this.themeService.themeChanged$.subscribe((theme) => {
      this.setTheme(theme);
    });
  }

  private setTheme(theme: Theme): void {
    // Remove the current theme class if there is one.
    if (this.theme != null) {
      this.renderer.setElementClass(this.elementReference.nativeElement, this.theme.cssClassName, false);
    }

    this.renderer.setElementClass(this.elementReference.nativeElement, theme.cssClassName, true);

    this.theme = theme;
  }
}
