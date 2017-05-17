import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGamesComponent } from './view-games.component';

describe('ViewGamesComponent', () => {
  let component: ViewGamesComponent;
  let fixture: ComponentFixture<ViewGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
