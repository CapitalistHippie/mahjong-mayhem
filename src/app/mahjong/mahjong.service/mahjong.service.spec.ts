import { TestBed, inject } from '@angular/core/testing';

import { MahjongService } from './mahjong.service';

describe('MahjongService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MahjongService]
    });
  });

  it('should be created', inject([MahjongService], (service: MahjongService) => {
    expect(service).toBeTruthy();
  }));
});
