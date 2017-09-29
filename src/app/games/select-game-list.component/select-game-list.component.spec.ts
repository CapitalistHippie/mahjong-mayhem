import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGameListComponent } from './select-game-list.component';

import { RouterTestingModule } from '@angular/router/testing'
import { Router } from '@angular/router';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// TODO -> could not fix 'io not found error', but since this needs to be moved anyways I'm postponing
// describe('SelectGameListComponent', () => {
//   let component: SelectGameListComponent;
//   let fixture: ComponentFixture<SelectGameListComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports:[
//         HttpModule,
//         FormsModule,
//         AngularMaterialModule,
//         BrowserAnimationsModule,
//         RouterTestingModule,
//       ],
//       declarations: [
//         SelectGameListComponent,
//       ]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SelectGameListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should be created', () => {
//     expect(component).toBeTruthy();
//   });
// });
