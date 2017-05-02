import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MahjongBoardComponent } from './mahjong-board.component';

describe('MahjongBoardComponent', () => {
  let component: MahjongBoardComponent;
  let fixture: ComponentFixture<MahjongBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MahjongBoardComponent ]
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
