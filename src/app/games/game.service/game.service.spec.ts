import { TestBed, inject } from '@angular/core/testing';

import { HttpModule } from '@angular/http';

import { GameService } from './game.service';
import { MahjongService } from '../../mahjong/mahjong.service/mahjong.service';
import { MahjongMayhemApiService } from '../../mahjong-mayhem-api/mahjong-mayhem-api.service/mahjong-mayhem-api.service';

describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpModule
      ],
      providers: [
        GameService,
        MahjongMayhemApiService,
        MahjongService
      ]
    });
  });

  it('should be created', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));
});
