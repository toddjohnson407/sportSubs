import { Component, OnInit } from "@angular/core";
import { Roster } from "./roster";
import { RosterService } from "./roster.service";
import { Player } from "./player/player";
import { FormControl } from "@angular/forms";
// import { PingService } from "kinvey-nativescript-sdk/angular";

@Component({
  selector: "app-roster",
  templateUrl: "./roster.component.html",
  styleUrls: ["./roster.component.css"]
})

export class RosterComponent implements OnInit {

  /** Array of Players */
  players: Array<Player> = [];
  /** Form for adding Players to a Roster */
  rosterForm: Roster;

  constructor(
    private RosterService: RosterService,
    // private pingService: PingService
  ) {
    this.addPlayer();
    this.rosterForm = {
      title: '',
      minutes: 0,
      playersOnField: 0,
      players: this.players
    }
  }

  ngOnInit(): void {
    console.log('rosterForm', this.rosterForm);
    // this.verify();
  }

  /** Returns a new FormGroup for a new Player */
  createPlayer = (): Player => ({ name: '', position: '' });

  /** Pushes created Player to FormArray */
  addPlayer = (): any => {
    this.players.push(this.createPlayer());
    console.log('-----------------');
    console.log(this.players);
    console.log(this.rosterForm);

  }

  /** Submits new Roster data */
  createRoster(): void {
    console.log(this.players);
    console.log(this.rosterForm);
  }

  async verify() {
    // try {
    //   const response = await this.pingService.ping();
    //   console.log("Kinvey is up! "
    //              + "Version: " + response.version
    //              + " Response: " + response.kinvey
    //   );
    // } catch (error) {
    //   console.log(error);
    //   console.log(`Kinvey Ping Failed. Response: ${error}`);
    // }
  }

}

