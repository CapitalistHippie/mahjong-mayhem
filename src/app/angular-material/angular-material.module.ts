import { NgModule } from '@angular/core';
import { MdDialogModule, MdSnackBarModule, MdButtonModule, MdCheckboxModule, MdListModule, MdToolbarModule, MdInputModule, MdSelectModule, MdIconModule, MdProgressSpinnerModule, MdCardModule } from '@angular/material';

let modules = [
  MdButtonModule,
  MdCheckboxModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdSelectModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdProgressSpinnerModule,
  MdCardModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class AngularMaterialModule { }
