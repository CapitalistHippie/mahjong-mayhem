import { Directive, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ThemeService } from '../theme.service/theme.service';

import { Theme } from '../theme.model';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective implements OnDestroy {
  private theme: Theme;
  private themeSubscription: Subscription;

  constructor(private elementReference: ElementRef, private renderer: Renderer2, private themeService: ThemeService) {
    this.theme = null;

    this.themeSubscription = this.themeService.themeChanged$.subscribe((theme) => {
      this.setTheme(theme);
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  private setTheme(theme: Theme): void {
    // Remove the current theme class if there is one.
    if (this.theme != null) {
      this.renderer.removeClass(this.elementReference.nativeElement, this.theme.cssClassName);
    }

    this.renderer.addClass(this.elementReference.nativeElement, theme.cssClassName);

    this.theme = theme;
  }
}
