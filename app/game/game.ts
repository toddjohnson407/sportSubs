
import { PlayerGame } from "./player-game";

interface Score {
  home: number;
  opponent: number;
}

export interface Game {
  opponent: string;
  subFrequency: number;
  players: Array<PlayerGame>
  score?: Score;
}

