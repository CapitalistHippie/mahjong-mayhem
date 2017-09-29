import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MahjongBoardComponent } from './mahjong-board.component';
import { MahjongTileComponent } from '../mahjong-tile.component/mahjong-tile.component';

import { ThemeService } from '../../theme/theme.service/theme.service';

describe('MahjongBoardComponent', () => {
  let component: MahjongBoardComponent;
  let fixture: ComponentFixture<MahjongBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[
        ThemeService
      ],
      declarations: [ 
        MahjongBoardComponent,
        MahjongTileComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MahjongBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
