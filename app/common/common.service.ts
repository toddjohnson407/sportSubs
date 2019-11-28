import { Injectable, ViewContainerRef } from "@angular/core";
import { DataStoreService, UserService, Query } from "kinvey-nativescript-sdk/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Observable, combineLatest, of, BehaviorSubject } from "rxjs";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { tap, switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CommonService {

  /** The active user */
  user: any;

  /** Database collection of Rosters */
  rosters: any;
  /** Database collection of Players */
  players: any;
  /** Database collection of Games */
  games: any;
  /** Database collection of PlayerGame */
  playerGames: any;

  /** Stores all user's Rosters in a BehaviorSubject */
  allRosters: BehaviorSubject<any>;
  /** Stores all user's Rosters in a BehaviorSubject */
  allPlayers: BehaviorSubject<any>;
  /** Stores all user's Rosters in a BehaviorSubject */
  allGames: BehaviorSubject<any>;
  /** Stores all user's Rosters in a BehaviorSubject */
  allPlayerGames: BehaviorSubject<any>;

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private dataStoreService: DataStoreService,

    private modalDialogService: ModalDialogService
  ) {
    this.rosters = this.dataStoreService.collection('rosters');
    this.players = this.dataStoreService.collection('players');
    this.games = this.dataStoreService.collection('games');
    this.playerGames = this.dataStoreService.collection('playerGame');


    this.allRosters = new BehaviorSubject(null);
    this.allPlayers = new BehaviorSubject(null);
    this.allGames = new BehaviorSubject(null);
    this.allPlayerGames = new BehaviorSubject(null);
  }

  /** Converts string to url safe format */
  urlFormat = (name: string): string => name.trim().replace(' ', '-');
  /** Converts url string back to original format */
  revertUrlFormat = (name: string): string => name.trim().replace('-', ' ');
  
  /** Opens modal view of a given component */
  openModal(component: any, viewCtnRef: any, context: any = {}) {
    const options: ModalDialogOptions = { viewContainerRef: viewCtnRef, fullscreen: false, context }
    return this.modalDialogService.showModal(component, options)
  }





  // /** Retrieves all data pertinent to the user from the database */
  // retrieveAllData(): Observable<any> {
  //   // Assign user
  //   this.user = this.userService.getActiveUser();
  //   // Create query to get all Rosters related to the user
  //   const rosterQuery = new Query();
  //   rosterQuery.equalTo('user_id', this.user._id);
  //   return this.rosters.find(rosterQuery).pipe(map((rosters: any) => {
  //     // Assign allRosters
  //     this.allRosters.next(rosters);

  //     // Create query to get all Games related to the Rosters
  //     const gameQuery = new Query();
  //     rosters.forEach(({_id}) => gameQuery.equalTo('roster_id', _id))
  //     // Create query to get all Players related to the Rosters
  //     const playerQuery = new Query();
  //     rosters.forEach(({_id}) => playerQuery.equalTo('roster_id', _id))

  //     return combineLatest(
  //       // Find all Players using the query and assign the results to allPlayers
  //       this.players.find(playerQuery).pipe(switchMap((players: any) => {
  //         players && this.allPlayers.next(players);
  //         return players;
  //       })),
  //       // Find all Games using the query and assign the results to allGames
  //       this.games.find(gameQuery).pipe(switchMap((games: any) => {
  //         // Assign allGames
  //         this.allGames.next(games);
  //         // Create query to get all PlayerGames related to the Games
  //         const playerGameQuery = new Query();
  //         games.forEach(({_id}) => playerGameQuery.equalTo('roster_id', _id))
  //         // Find all playerGames using the query and assign the results to allPlayerGames
  //         return this.playerGames.find(playerGameQuery).pipe(map((playerGames: any) => {
  //           playerGames && this.allPlayerGames.next(playerGames);
  //           return playerGames
  //         }));
  
  //         console.log(this.allRosters.value);
  //         console.log(this.allPlayers.value);
  //         console.log(this.allGames.value);
  //         console.log(this.allPlayerGames.value);
  //       }))
  //     );
      
  //   }));
  // }

}

