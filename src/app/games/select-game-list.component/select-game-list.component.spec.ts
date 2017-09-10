import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGameListComponent } from './select-game-list.component';

describe('SelectGameListComponent', () => {
  let component: SelectGameListComponent;
  let fixture: ComponentFixture<SelectGameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectGameListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
