import { Injectable } from "@angular/core";
import { DataStoreService, UserService, Query } from "kinvey-nativescript-sdk/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Observable, combineLatest, of, BehaviorSubject, pipe } from "rxjs";

import { switchMap, map, tap, filter } from "rxjs/operators";
import { Game } from "./game";


@Injectable({
  providedIn: "root"
})
export class GameService {

  /** Database collection of Games */
  games: any
  /** Database collection of PlayerGames */
  playerGames: any;
  /** Stores all user's Rosters in a BehaviorSubject */
  allGames: BehaviorSubject<any>;


  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private dataStoreService: DataStoreService
  ) {
    this.games = this.dataStoreService.collection('games');
    this.playerGames = this.dataStoreService.collection('playerGame');
    this.allGames = new BehaviorSubject([]);
  }

  /** Submits a new Game to the database */
  createNewGame(game: any, players: any[]) {

  }

  /** Creates a new Roster */
  async createGame(rosterId: any, {subFrequency, opponent, players}: any) {
    let status = [false, null];
    let gamePlayers = players.map(({_id, isStarting}) => ({ player_id: _id, isStarting, timeIn: 0, points: 0 }))

    try {
      // Create Game object to be stored in database
      let newGame = { score: { home: 0, away: 0 }, opponent, completed: false, subFrequency, roster_id: rosterId, gamePlayers }
      let storedGame = await this.games.save(newGame);
      status = [true, storedGame._id];
    } catch (error) { console.log('Error Creating New Game:', error) }
    return status
  }

  /** Gets all Game data with related GamePlayerss */
  allGameData(rosterIds?: any[]): Observable<any> {
    if (!this.allGames.value && rosterIds && rosterIds.length) this._getAllGameData(rosterIds);
    return this.allGames.asObservable()
  }

  /** Retrives all Game data with related GamePlayers */
  _getAllGameData(rosterIds: any[]): void {
    this._getAllGames(rosterIds).pipe(switchMap((games: any) => {
      return combineLatest(games.map(({_id}) => this.getGamePlayers(_id))).pipe(tap((resp: any) => {
        let gameData = [];
        resp.forEach(([gameId, gamePlayers]) => {
          let gameIndex = games.findIndex(({_id}) => _id === gameId);
          gameData.push({ game: games[gameIndex], gamePlayers })
        })
        this.allGames.next(gameData);
      }))
    }))
  }

  /** Retrives all Game data */
  _getAllGames(rosterIds: any[]): Observable<any> {
    let gameQuery = new Query();
    rosterIds.forEach((id: any) => gameQuery.equalTo('roster_id', id));
    return this.games.find(gameQuery);
  }

  /** Gets all games for a Roster */
  getRosterGames(rosterId: any): Observable<any> {
    let gameQuery = new Query();
    gameQuery.equalTo('roster_id', rosterId);
    return this.games.find(gameQuery)
    // .pipe(switchMap((games: any) => {
    //   return combineLatest(games.map(({_id}) => this.getGamePlayers(_id))).pipe(map((resp: any) => {
    //     let gameData = [];
    //     resp.forEach(([gameId, gamePlayers]) => {
    //       let gameIndex = games.findIndex(({_id}) => _id === gameId);
    //       gameData.push({ game: games[gameIndex], gamePlayers })
    //     });
    //     if (!this.allGames.value.find(({game: {roster_id}}) => roster_id === rosterId)) this.allGames.next([...this.allGames.value, gameData])
    //     return gameData;
    //   }));
    // }));
  }

  /** Gets a game by its id */
  getGame(gameId: any) {
    return combineLatest(of(gameId), this.allGameData().pipe(map(games => games.find((game: any) => game._id === gameId))));
  }

  /** Gets all players from a given Roster as well as Games */
  getGamePlayers(gameId: any): Observable<any> {
    let playersQuery = new Query();
    playersQuery.equalTo('game_id', gameId);
    return combineLatest(of(gameId), this.playerGames.find(playersQuery))
  }
}

