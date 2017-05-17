import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailsCardComponent } from './game-details-card.component';

describe('GameDetailsCardComponent', () => {
  let component: GameDetailsCardComponent;
  let fixture: ComponentFixture<GameDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameDetailsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
