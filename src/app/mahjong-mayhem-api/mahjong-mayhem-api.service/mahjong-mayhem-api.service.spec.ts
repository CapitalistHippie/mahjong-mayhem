import { TestBed, inject } from '@angular/core/testing';

import { MahjongMayhemApiService } from './mahjong-mayhem-api.service';

import { HttpModule } from '@angular/http';

describe('MahjongMayhemApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpModule
      ],
      providers: [MahjongMayhemApiService]
    });
  });

  it('should ...', inject([MahjongMayhemApiService], (service: MahjongMayhemApiService) => {
    expect(service).toBeTruthy();
  }));
});
