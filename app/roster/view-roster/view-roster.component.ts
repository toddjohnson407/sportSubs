import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

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

  constructor(
    private params: ModalDialogParams
  ) { }

  ngOnInit() {
    console.log(this.params);
    console.log(this.params.context);
    this.roster = this.params.context.roster;
    this.players = this.params.context.players;
  }

  /** Starts a New Game */
  newGame() {
    console.log('Starting new game');
  }

}
