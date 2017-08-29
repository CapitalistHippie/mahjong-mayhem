import { NgModule } from '@angular/core';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MahjongModule } from '../mahjong/mahjong.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { ThemeModule } from '../theme/theme.module';

import { ThemeService } from '../theme/theme.service/theme.service';

import { SettingsComponent } from './settings.component/settings.component';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    MahjongModule,
    SettingsRoutingModule,
    ThemeModule
  ],
  declarations: [
    SettingsComponent
  ],
  providers: [
    ThemeService
  ]
})
export class SettingsModule { }
