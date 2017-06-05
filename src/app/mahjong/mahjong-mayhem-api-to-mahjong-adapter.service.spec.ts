import { TestBed, inject } from '@angular/core/testing';

import { MahjongMayhemApiToMahjongAdapterService } from './mahjong-mayhem-api-to-mahjong-adapter.service';

describe('MahjongMayhemApiToMahjongAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MahjongMayhemApiToMahjongAdapterService]
    });
  });

  it('should be created', inject([MahjongMayhemApiToMahjongAdapterService], (service: MahjongMayhemApiToMahjongAdapterService) => {
    expect(service).toBeTruthy();
  }));
});
