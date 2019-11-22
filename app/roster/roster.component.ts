import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Roster } from "./roster";
import { RosterService } from "./roster.service";
import { Player } from "./player/player";
import { FormControl } from "@angular/forms";
import { PingService } from "kinvey-nativescript-sdk/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ViewRosterComponent } from "./view-roster/view-roster.component";
import { combineLatest } from "rxjs";
import { NewRosterComponent } from "./new-roster/new-roster.component";


@Component({
  selector: "app-roster",
  templateUrl: "./roster.component.html",
  styleUrls: ["./roster.component.css"]
})

export class RosterComponent implements OnInit {

  /** Whether or not a user has any Rosters */
  hasRosters: boolean = false;
  /** Array of existing Rosters */
  rosters: Array<any> = [];

  constructor(
    private rosterService: RosterService,
    private routerExtensions: RouterExtensions,
    private viewContainerRef: ViewContainerRef,
    private modalDialogService: ModalDialogService
  ) { }

  async ngOnInit() {
    this.rosterService.allUserRosters().then((rosters: any) => rosters.subscribe((rosters: any) => {
      this.hasRosters = (rosters && rosters.length) ? true : false;
      this.rosters = [];
      let playerObservables = [];
      for (let roster of rosters) {
        this.rosters.push({ roster: roster, players: [] });
        playerObservables.push(this.rosterService.getRosterPlayers(roster._id));
      }

      combineLatest(playerObservables).subscribe((resp) => {
        resp.forEach(([rosterId, players]) => {
          let rosterIndex = this.rosters.findIndex(({roster: {_id}}) => _id === rosterId);
          this.rosters[rosterIndex].players = players;
        });
      })
    })).catch(err => console.log('Error retrieving user Rosters:', err));
  }

  /** Opens modal view of a single Roster */
  openRoster(roster: any) {
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: roster
    }

    this.modalDialogService.showModal(ViewRosterComponent, options);
  }

  /** Opens modal view for creating a new Roster */
  newRoster() {
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false
    }
    this.modalDialogService.showModal(NewRosterComponent, options).then(val => console.log(val)).catch(err => console.log('Error opening NewRoster Modal: ' + err));
  }

}

