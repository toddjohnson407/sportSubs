import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { CommonService } from '../../common/common.service';
import { RosterService } from '../roster.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-view-roster',
  templateUrl: './view-roster.component.html',
  styleUrls: ['./view-roster.component.css']
})
export class ViewRosterComponent implements OnInit {

  /** Roster passed through in context */
  roster: any;
  /** Players passed through in context */
  players: any;
  /** Games passed through in context */
  games: any;
  /** Tracks the current tab */
  currentTab: number = 0;
  /** Games categorized by completion status */
  statusGames: any;


  constructor(
    private params: ModalDialogParams,
    private commonService: CommonService,
    private rosterService: RosterService,
    private routerExtensions: RouterExtensions,
  ) { }

  ngOnInit() {
    this.roster = this.params.context.roster;
    this.players = this.params.context.players;
    this.games = this.params.context.games;
    this.statusGames = { completed: this.games.filter(games => games.completed), incompleted: this.games.filter(games => !games.completed) }
  }

  /** Navigates to new game page for the given Roster */
  newGame() {
    this.params.closeCallback({ newGame: true, rosterTitle: this.params.context.roster.title });
    // this.routerExtensions.navigateByUrl(`/game/new/${this.commonService.urlFormat(this.params.context.roster.title)}`, { clearHistory: true })
  }

  tabChange(tab: number) {
    this.currentTab = tab;
  }
}
