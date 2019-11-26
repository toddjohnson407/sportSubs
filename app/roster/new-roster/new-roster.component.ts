import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Roster } from "../roster";
import { RosterService } from "../roster.service";
import { Player } from "../player/player";
import { PingService } from "kinvey-nativescript-sdk/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

import { screen } from "tns-core-modules/platform";
import { CommonService } from "../../common/common.service";


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
  /** Empty Player object for creating additional Players */
  newPlayer: Player;
  /** Tracks the current tab */
  currentTab: number = 0;

  constructor(
    private commonService: CommonService,
    private rosterService: RosterService,
    private routerExtensions: RouterExtensions,
    private params: ModalDialogParams
  ) {

    this.players = []
    this.newPlayer = {
      name: '',
      position: ''
    }
    
    this.rosterForm = {
      title: '',
      sport: '',
      description: '',
      gameDuration: null,
      playersOnField: 2,
      players: this.players
    }
    for (let i = 0; i < +this.rosterForm.playersOnField; i++) { this.addPlayer() }
  }

  ngOnInit() {

  }

  /** Returns a new FormGroup for a new Player */
  createPlayer = (): Player => ({ name: this.newPlayer.name, position: this.newPlayer.position });

  /** Pushes created Player to FormArray */
  addPlayer = (): any => {
    this.players.push(this.createPlayer());
    this.newPlayer.name = '';
    this.newPlayer.position = '';
  }
  /** Removes latest created Player from players */
  removePlayer = (ind?: number): any => {
    (ind || ind === 0) ? this.players.splice(ind, 1) : this.players.pop();
    if (this.players.length < 1) this.addPlayer(); 
    this.newPlayer.name = '';
    this.newPlayer.position = '';
  }

  /** Submits new Roster data */
  async createRoster() {
    if(this.validateSecondPage() && this.validateFirstPage()) {
      this.rosterService.createRoster(this.rosterForm).then(status => {
        this.dbValid = status;
        this.dbValid && this.params.closeCallback({ success: true });
        // this.dbValid && this.routerExtensions.navigateByUrl('/roster', { clearHistory: true })
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
    return isValid;
  }

  /** Validates second part of the Roster form */
  validateSecondPage(): boolean {
    let isValid = true;
    this.players.forEach(({name}) => !name && (isValid = false));
    return isValid;
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

  /** Modifies the playersOnField amount */
  modifyOnFieldCount(adding: boolean): void {
    if (adding) {
      this.rosterForm.playersOnField++;
      this.addPlayer();
    }
    else {
      this.rosterForm.playersOnField--;
      this.removePlayer();
    }
  }

  tabChange(tab: number) {
    this.currentTab = tab;
  }

  /** Changes styling of focused TextField */
  focusField(field: any) {
    field.borderBottomColor = 'gray';
  }

  /** Changes styling when TextField is blurred */
  blurField(field: any) {
    field.borderBottomColor = 'white';
  }
}

