import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailsCardComponent } from './game-details-card.component';

import { GameService } from '../game.service/game.service';
import { MahjongService } from '../../mahjong/mahjong.service/mahjong.service';
import { MahjongMayhemApiService } from '../../mahjong-mayhem-api/mahjong-mayhem-api.service/mahjong-mayhem-api.service';
import { AuthService } from '../../auth/auth.service/auth.service';

import { RouterTestingModule } from '@angular/router/testing'

import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Game, Player } from '../models';
import { GameTemplate } from '../models/game-template.model'

describe('GameDetailsCardComponent', () => {
  let component: GameDetailsCardComponent;
  let fixture: ComponentFixture<GameDetailsCardComponent>;

  class RouterStub {
    navigateByUrl(url: string) { return url; }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        AngularMaterialModule,
        HttpModule,
        BrowserAnimationsModule,
        RouterTestingModule,
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
    let mockPlayer = new Player();
    mockPlayer.name = "testUser";
    mockPlayer.id = "test";
    let mockTemplate = new GameTemplate();
    mockTemplate.id = "test";
    let mockGame = new Game();
    mockGame.gameTemplate = mockTemplate;
    mockGame.createdBy = mockPlayer;
    mockGame.players = [mockPlayer];
    component.game = mockGame;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
