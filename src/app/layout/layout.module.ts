import { NgModule } from '@angular/core';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LayoutRoutingModule } from './layout-routing.module';
import { ThemeModule } from '../theme/theme.module';

import { HeaderComponent } from './header.component/header.component';
import { LayoutComponent } from './layout.component/layout.component';

@NgModule({
  imports: [
    AngularMaterialModule,
    AuthModule,
    CommonModule,
    FlexLayoutModule,
    LayoutRoutingModule,
    ThemeModule
  ],
  declarations: [
    HeaderComponent,
    LayoutComponent
  ]
})
export class LayoutModule { }
