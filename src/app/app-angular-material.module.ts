import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule, MdListModule, MdToolbarModule, MdSidenavModule, MdCardModule } from '@angular/material';

import 'hammerjs';

@NgModule({
  imports: [MdButtonModule, MdCheckboxModule, MdListModule, MdToolbarModule, MdSidenavModule, MdCardModule],
  exports: [MdButtonModule, MdCheckboxModule, MdListModule, MdToolbarModule, MdSidenavModule, MdCardModule],
})
export class AppAngularMaterialModule { }
