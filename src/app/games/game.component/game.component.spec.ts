import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MahjongBoardComponent } from '../../mahjong/mahjong-board.component/mahjong-board.component';
import { MahjongTileComponent } from '../../mahjong/mahjong-tile.component/mahjong-tile.component';

import { GameComponent } from './game.component';
import { GameService } from '../game.service/game.service';
import { MahjongService } from '../../mahjong/mahjong.service/mahjong.service';
import { MahjongMayhemApiService } from '../../mahjong-mayhem-api/mahjong-mayhem-api.service/mahjong-mayhem-api.service';
import { ThemeService } from '../../theme/theme.service/theme.service';
import { AuthService } from '../../auth/auth.service/auth.service';

import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing'
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule,
        AngularMaterialModule,
      ],
      providers: [
        GameService,
        MahjongService,
        MahjongMayhemApiService,
        ThemeService,
        AuthService
      ],
      declarations: [
        GameComponent,
        MahjongBoardComponent,
        MahjongTileComponent 
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
