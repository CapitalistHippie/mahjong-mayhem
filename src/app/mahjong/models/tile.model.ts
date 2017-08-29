import { Suit } from './suit.enum';

export class Tile {
	id: string;
	suit: Suit;
	name: string;
	matchesWholeSuit: boolean;
}
