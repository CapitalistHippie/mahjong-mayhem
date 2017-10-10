import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';

import { MahjongService } from '../../mahjong/mahjong.service/mahjong.service';
import { ThemeService } from '../../theme/theme.service/theme.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SettingsComponent } from './settings.component';
import { MahjongTileComponent } from '../../mahjong/mahjong-tile.component/mahjong-tile.component'


describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        AngularMaterialModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        MahjongService,
        ThemeService
      ],
      declarations: [
        SettingsComponent,
        MahjongTileComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
