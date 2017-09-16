import { Component } from '@angular/core';
import { GameObserver, MatchTile, PlayerId } from '../../mahjong-mayhem-api/game-observer.interface/game-observer.interface'

declare var io: any;

@Component({
  selector: 'app-select-game-list',
  templateUrl: './select-game-list.component.html',
  styleUrls: ['./select-game-list.component.scss']
})
export class SelectGameListComponent extends GameObserver{

  constructor() {
    super('59bbca4d5805970011dd6126')
  }

  // TODO Move this to somewhere appropriate and implement logic for these functions
  start(){
    console.log("START");
  }
  end(){
    console.log("END");
  }
  playerJoined(player: PlayerId){
    console.log("Player " + player._id + " has joined!");
  }
  match(matches: MatchTile[]){
    console.log(matches);
  }
  error(error: any){
    console.log("An error occurred: " + error);
  }

}
