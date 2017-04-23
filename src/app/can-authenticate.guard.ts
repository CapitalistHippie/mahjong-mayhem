import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MahjongMayhemApiService } from './mahjong-mayhem-api.service';

@Injectable()
export class CanAuthenticateGuard implements CanActivate {

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.mahjongMayhemApiService.authenticate(route.queryParams.token, route.queryParams.username);
    this.router.navigate(['/']);
    return false;
  }
}
