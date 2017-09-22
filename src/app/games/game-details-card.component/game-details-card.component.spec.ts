import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailsCardComponent } from './game-details-card.component';

import { GameService } from '../game.service/game.service';
import { MahjongService } from '../../mahjong/mahjong.service/mahjong.service';
import { MahjongMayhemApiService } from '../../mahjong-mayhem-api/mahjong-mayhem-api.service/mahjong-mayhem-api.service';
import { AuthService } from '../../auth/auth.service/auth.service';

import { RouterTestingModule } from '@angular/router/testing'

import { Router, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GameDetailsCardComponent', () => {
  let component: GameDetailsCardComponent;
  let fixture: ComponentFixture<GameDetailsCardComponent>;

  class MockRouter {
    navigateByUrl(url: string) { return url; }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        AngularMaterialModule,
        HttpModule,
        BrowserAnimationsModule,
        RouterModule,
        { provide: Router, useClass: MockRouter }
      ],
      providers: [
        GameService,
        MahjongService,
        MahjongMayhemApiService,
        AuthService,
      ],
      declarations: [ 
        GameDetailsCardComponent
      ]
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
