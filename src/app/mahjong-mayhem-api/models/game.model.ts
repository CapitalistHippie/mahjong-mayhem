import { GameTemplate } from './game-template.model'
import { User } from "./user.model"

export class Game {
	_id: string;
	id: string;
	gameTemplate: GameTemplate;
	createdOn: string;
	startedOn: string;
	endedOn: string;
	minPlayers: number;
	maxPlayers: number;
	state: string;
	createdBy: User;
	players: User[];
}
