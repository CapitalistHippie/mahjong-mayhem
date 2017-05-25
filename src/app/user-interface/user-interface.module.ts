/////////////////////////////
// Modules.
/////////////////////////////
// Angular modules.
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// App modules.
import { AngularMaterialModule } from '../angular-material/angular-material.module';

/////////////////////////////
// Decorators.
/////////////////////////////
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    // BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule,
    AngularMaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AngularMaterialModule
  ]
})
export class UserInterfaceModule { }
