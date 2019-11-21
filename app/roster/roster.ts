import { Player } from "./player/player";

export interface Roster {
	title: string;
	description?: string;
	sport?: string;
	gameDuration: number;
	playersOnField: number;
	players: Array<Player>;
}
