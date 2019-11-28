import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'app-starters',
  templateUrl: './starters.component.html',
  styleUrls: ['./starters.component.css']
})
export class StartersComponent implements OnInit {

  /** Players participating in the new Game */
  players: any;

  constructor(
    private params: ModalDialogParams
  ) { }

  ngOnInit() {
    this.players = this.params.context
  }

  /** Toggles Player in game status */
  togglePlayer(player: any) {
    player.isStarting = !player.isStarting;
  }

  /** Closes modal with an Array of starters */
  submitStarters() {
    this.params.closeCallback(this.players)
  }

}
