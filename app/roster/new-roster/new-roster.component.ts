import { Component, OnInit } from "@angular/core";
import { Roster } from "../roster";
import { RosterService } from "../roster.service";
import { Player } from "../player/player";
import { PingService } from "kinvey-nativescript-sdk/angular";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: "app-new-roster",
  templateUrl: "./new-roster.component.html",
  styleUrls: ["./new-roster.component.css"]
})

export class NewRosterComponent implements OnInit {

  /** Array of Players */
  players: Array<Player> = [];
  /** Form for adding Players to a Roster */
  rosterForm: Roster;
  /** Boolean to determine which part of page to display */
  isFirstPage: boolean = true;
  /** Whether or not the form was successfully created in the database */
  dbValid: boolean = true;

  newPlayer: Player;

  constructor(
    private rosterService: RosterService,
    private routerExtensions: RouterExtensions
  ) {

    this.players = []
    this.newPlayer = {
      name: '',
      position: ''
    }
    // for (let i = 0; i < 6; i++) { this.addPlayer() }
    this.rosterForm = {
      title: '',
      sport: '',
      description: '',
      gameDuration: null,
      playersOnField: null,
      players: this.players
    }
  }

  ngOnInit(): void {

  }

  /** Returns a new FormGroup for a new Player */
  createPlayer = (): Player => ({ name: this.newPlayer.name, position: this.newPlayer.position });

  /** Pushes created Player to FormArray */
  addPlayer = (): any => {
    this.players.push(this.createPlayer());
    this.newPlayer.name = '';
    this.newPlayer.position = '';
  }

  /** Submits new Roster data */
  async createRoster() {
    if(this.validateSecondPage()) {
      this.rosterService.createRoster(this.rosterForm).then(status => {
        this.dbValid = status;
        this.dbValid && this.routerExtensions.navigateByUrl('/roster', { clearHistory: true })
      });
    }
  }

  /** Toggles page */
  togglePage = () => {
    if (this.validateFirstPage()) this.isFirstPage = !this.isFirstPage;
  }

  /** Validates first part of the Roster form */
  validateFirstPage(): boolean {
    let isValid = true;
    isValid = !!this.rosterForm.title && !!this.rosterForm.sport && !!this.rosterForm.description && !!this.rosterForm.gameDuration && !!this.rosterForm.playersOnField
    if (isValid) for (let i = 0; i < +this.rosterForm.playersOnField; i++) { this.addPlayer() }
    return isValid;
  }

  /** Validates second part of the Roster form */
  validateSecondPage(): boolean {
    let isValid = true;
    this.players.forEach(({name}) => !name && (isValid = false));
    return isValid;
  }



}

