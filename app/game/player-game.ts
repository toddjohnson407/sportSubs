import { Player } from "../roster/player/player";

export interface PlayerGame {
  points: number
	isStarting: boolean;
	player: Player;
}
