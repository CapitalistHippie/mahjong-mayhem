// Decorators.
import { Injectable } from '@angular/core';

// Services.
import { MahjongMayhemApiService } from '../../mahjong-mayhem-api/mahjong-mayhem-api.service';

@Injectable()
export class AuthService {

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService) {
  }

  public getAuthenticationUri(): string {
    return this.mahjongMayhemApiService.getAuthenticationUri();
  }

  public authenticate(token: string, username: string): void {
    this.mahjongMayhemApiService.authenticate(token, username);
  }

  public isAuthenticated(): boolean {
    return this.mahjongMayhemApiService.isAuthenticated();
  }

  public getUsername(): string {
    return this.mahjongMayhemApiService.getUsername();
  }
}
