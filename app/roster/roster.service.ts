import { Injectable } from "@angular/core";
import { Roster } from "./roster";
import { DataStoreService, UserService, Query } from "kinvey-nativescript-sdk/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Observable, combineLatest, of } from "rxjs";
import { Player } from "./player/player";


@Injectable({
  providedIn: "root"
})
export class RosterService {

  /** Database collection of Rosters */
  rosters: any;
  /** Database collection of Players */
  players: any;

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private dataStoreService: DataStoreService
  ) {
    this.rosters = this.dataStoreService.collection('rosters');
    this.players = this.dataStoreService.collection('players');
  }



  /** Returns a User's Rosters */
  async allUserRosters() {
    let user = await this.userService.getActiveUser();
    if (!user) this.routerExtensions.navigateByUrl('/login-register', { clearHistory: true });
    let rosterQuery = new Query();
    rosterQuery.equalTo('user_id', user._id);

    return this.rosters.find(rosterQuery);
  }

  /** Creates a new Roster */
  async createRoster({title, sport, description, players, gameDuration, playersOnField}: Roster) {
    let user = await this.userService.getActiveUser();
    if (!user) this.routerExtensions.navigateByUrl('/login-register', { clearHistory: true });
    let status = false;
    try {
      let newRoster = { title, sport, description, gameDuration, playersOnField, user_id: user._id }
      let storedRoster = await this.rosters.save(newRoster);
      if (storedRoster) await this.addPlayers(storedRoster._id, players);
      status = true;
    } catch (error) { console.log('Error Creating New Roster:', error) }
    return status
  }

  /** Creates new Players for a Roster */
  async addPlayers(rosterId: any, players: Array<Player>) {
    for (let player of players) {
      try {
        let newPlayer = await this.players.save({ name: player.name, roster_id: rosterId });
      } catch (error) { console.log('Error adding Player to Roster:', error) }
    }
  }

  /** Gets all players from a given Roster */
  getRosterPlayers(rosterId: any): Observable<any> {
    let playersQuery = new Query();
    playersQuery.equalTo('roster_id', rosterId);
    return combineLatest(of(rosterId), this.players.find(playersQuery));
  }

}

