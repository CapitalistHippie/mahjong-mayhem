import { NgModule } from '@angular/core';

import { ThemeDirective } from './theme.directive/theme.directive';

@NgModule({
  declarations: [
    ThemeDirective
  ],
  exports: [
    ThemeDirective
  ]
})
export class ThemeModule { }
