import { GameState } from './game-state.enum'
import { GameTemplate } from './game-template.model'
import { Player } from './player.model';

export class Game {
  id: string;
  gameTemplate: GameTemplate;
  createdOn: string;
  startedOn: string;
  endedOn: string;
  minPlayers: number;
  maxPlayers: number;
  state: GameState;
  createdBy: Player;
  players: Player[];
}
