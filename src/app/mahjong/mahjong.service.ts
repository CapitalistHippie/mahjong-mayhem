import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/////////////////////////////
// Services.
/////////////////////////////
import { MahjongMayhemApiService } from '../mahjong-mayhem-api/mahjong-mayhem-api.service';

/////////////////////////////
// Models.
/////////////////////////////
import { GamePost, Game } from './models';

@Injectable()
export class MahjongService {

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService) {
  }

  getGames(pageSize: number = undefined, pageIndex: number = undefined, createdBy: string = undefined, player: string = undefined, gameTemplate: string = undefined, state: string = undefined): Observable<Game[]> {
    return this.mahjongMayhemApiService.getGames(pageSize, pageIndex, createdBy, player, gameTemplate, state);
  }
}
