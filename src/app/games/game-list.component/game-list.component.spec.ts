import { async, ComponentFixture, TestBed } from '@angular/core/testing';
	
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of';

import { GameListComponent } from './game-list.component';
import { SelectGameListComponent } from '../select-game-list.component/select-game-list.component';

import { GameService } from '../game.service/game.service';
import { MahjongService } from '../../mahjong/mahjong.service/mahjong.service';
import { MahjongMayhemApiService } from '../../mahjong-mayhem-api/mahjong-mayhem-api.service/mahjong-mayhem-api.service';
import { AuthService } from '../../auth/auth.service/auth.service';

import { RouterTestingModule } from '@angular/router/testing'
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { GamesPipe } from '../games.pipe/games.pipe';
import { GameDetailsCardComponent } from '../game-details-card.component/game-details-card.component';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        AngularMaterialModule,
        HttpModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        GameService,
        MahjongService,
        MahjongMayhemApiService,
        AuthService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: [Observable.of({path: "state/open"})]
            }
          }
        }
      ],
      declarations: [
        GameListComponent, 
        GamesPipe,
        GameDetailsCardComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});