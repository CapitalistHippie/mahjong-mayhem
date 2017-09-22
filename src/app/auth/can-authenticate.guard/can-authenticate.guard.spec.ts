import { TestBed, async, inject } from '@angular/core/testing';

import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from "../auth.service/auth.service";
import { CanAuthenticateGuard } from './can-authenticate.guard';
import { MahjongMayhemApiService } from '../../mahjong-mayhem-api/mahjong-mayhem-api.service/mahjong-mayhem-api.service';

describe('CanAuthenticateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpModule,
        RouterTestingModule 
      ],
      providers: [
        CanAuthenticateGuard,
        AuthService,
        MahjongMayhemApiService
      ]
    });
  });

  it('should ...', inject([CanAuthenticateGuard], (guard: CanAuthenticateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
