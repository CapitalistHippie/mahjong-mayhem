import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule, MdListModule, MdToolbarModule } from '@angular/material';

import 'hammerjs';

@NgModule({
  imports: [MdButtonModule, MdCheckboxModule, MdListModule, MdToolbarModule],
  exports: [MdButtonModule, MdCheckboxModule, MdListModule, MdToolbarModule],
})
export class AppAngularMaterialModule { }
