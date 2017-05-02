import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MahjongTileComponent } from './mahjong-tile.component';

describe('MahjongTileComponent', () => {
  let component: MahjongTileComponent;
  let fixture: ComponentFixture<MahjongTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MahjongTileComponent ]
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
