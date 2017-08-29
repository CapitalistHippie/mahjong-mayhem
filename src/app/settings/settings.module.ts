import { NgModule } from '@angular/core';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MahjongModule } from '../mahjong/mahjong.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { ThemeModule } from '../theme/theme.module';

import { MahjongService } from '../mahjong/mahjong.service/mahjong.service';
import { ThemeService } from '../theme/theme.service/theme.service';

import { SettingsComponent } from './settings.component/settings.component';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MahjongModule,
    SettingsRoutingModule,
    ThemeModule
  ],
  declarations: [
    SettingsComponent
  ],
  providers: [
    MahjongService,
    ThemeService
  ]
})
export class SettingsModule { }
