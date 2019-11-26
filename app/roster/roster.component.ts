import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { RosterService } from "./roster.service";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ViewRosterComponent } from "./view-roster/view-roster.component";
import { NewRosterComponent } from "./new-roster/new-roster.component";
import { CommonService } from "../common/common.service";
import { ActivatedRoute } from "@angular/router";


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
    private modalDialogService: ModalDialogService,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.rosterService.allRosterData().subscribe((rosters: any) => {
      if (rosters && rosters.length) {
        this.rosters = rosters;
        this.hasRosters = true;
      } else this.hasRosters = false;
    });
  }

  /** Opens modal view of a single Roster */
  openRoster(roster: any) {
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: roster
    }

    this.modalDialogService.showModal(ViewRosterComponent, options)
      .then(val => {
        if (val && val.newGame && val.rosterTitle) this.newGame(val.rosterTitle) 
      }).catch(err => console.log('Error with ViewRoster Modal: ' + err));
  }

  /** Opens modal view for creating a new Roster */
  newRoster() {
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false
    }
    this.modalDialogService.showModal(NewRosterComponent, options)
  }

  /** Navigates to new game page for the given Roster */
  newGame(rosterTitle: any) {
    console.log('ROSTER TITLE');
    console.log(rosterTitle);
    console.log(this.route.snapshot.params)
    this.routerExtensions.navigateByUrl(`/game/new/${this.commonService.urlFormat(rosterTitle)}`, { clearHistory: false })
  }

}

