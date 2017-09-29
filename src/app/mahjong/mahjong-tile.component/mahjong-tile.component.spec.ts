import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MahjongTileComponent } from './mahjong-tile.component';

import { ThemeService } from '../../theme/theme.service/theme.service';

describe('MahjongTileComponent', () => {
  let component: MahjongTileComponent;
  let fixture: ComponentFixture<MahjongTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[
        ThemeService
      ],
      declarations: [ 
        MahjongTileComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MahjongTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
