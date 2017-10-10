import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameService } from '../game.service/game.service';
import { MahjongService } from '../../mahjong/mahjong.service/mahjong.service';
import { MahjongMayhemApiService } from '../../mahjong-mayhem-api/mahjong-mayhem-api.service/mahjong-mayhem-api.service';

import { GameCreateComponent } from './game-create.component';
import { AuthService } from '../../auth/auth.service/auth.service';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GameCreateComponent', () => {
  let component: GameCreateComponent;
  let fixture: ComponentFixture<GameCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        AngularMaterialModule,
        HttpModule,
        BrowserAnimationsModule,
      ],
      declarations: [ 
        GameCreateComponent,
      ],
      providers: [
        AuthService,
        GameService,
        MahjongService,
        MahjongMayhemApiService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
