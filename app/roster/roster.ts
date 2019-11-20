import { Player } from "./player/player";

export interface Roster {
	title: string;
	minutes: number;
	playersOnField: number;
	players: Array<Player>;
}
