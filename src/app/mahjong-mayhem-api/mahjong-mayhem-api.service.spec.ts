import { TestBed, inject } from '@angular/core/testing';

import { MahjongMayhemApiService } from './mahjong-mayhem-api.service';

describe('MahjongMayhemApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MahjongMayhemApiService]
    });
  });

  it('should ...', inject([MahjongMayhemApiService], (service: MahjongMayhemApiService) => {
    expect(service).toBeTruthy();
  }));
});
