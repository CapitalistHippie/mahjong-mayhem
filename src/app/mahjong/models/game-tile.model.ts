import { Tile } from "./tile.model"

export class GameTile {
	xPos: number;
	yPos: number;
	zPos: number;
	tile: Tile;
	_id: string;
	match: {
		foundBy: string;
		otherTyleId: string;
		foundOn: string;
	}
}
