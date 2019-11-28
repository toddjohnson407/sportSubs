import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CommonService } from '../../common/common.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { RosterService } from '../../roster/roster.service';
import { Game } from '../game';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { StartersComponent } from './starters/starters.component';
import { GameService } from '../game.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  /** Url Name of Roster/Team */
  teamUrlName: string;

  /** The current Roster/Team */
  roster: any;
  /** Form for a new Game */
  gameForm: Game

  /** Boolean to determine database status */
  apiInvalid: boolean = false;

  constructor(
    private commonService: CommonService,
    private routerExtensions: RouterExtensions,
    private route: ActivatedRoute,
    private rosterService: RosterService,
    private modalDialogService: ModalDialogService,
    private viewContainerRef: ViewContainerRef,
    private gameService: GameService
  ) {
    this.gameForm = {
      opponent: '',
      players: [],
      subFrequency: null
    }
  }

  ngOnInit() {
    this.teamUrlName = this.route.snapshot.paramMap.get('teamurlname');
    !this.teamUrlName && this.routerExtensions.navigateByUrl('/home', { clearHistory: true });
    this.rosterService.getRoster(this.commonService.revertUrlFormat(this.teamUrlName)).subscribe((roster: any) => roster && this.setupRoster(roster))
  }

  /** Sets up Roster for a new Game */
  setupRoster(roster: any) {
    roster.players.forEach((player: any) => {
      player['selected'] = false
      player['isStarting'] = false
    });
    this.roster = roster;
    console.log(this.roster);
  }

  /** Navigates back to all Rosters view */
  goBack() { this.routerExtensions.navigateByUrl('/roster', { clearHistory: true }) }

  /** Changes styling of focused TextField */
  focusField(field: any) {
    field.borderBottomColor = 'gray';
  }

  /** Changes styling when TextField is blurred */
  blurField(field: any) {
    field.borderBottomColor = 'white';
  }

  /** Toggles Player in game status */
  togglePlayer(player: any) {
    player.selected = !player.selected;
  }

  /** Submits new Game */
  submitNewGame() {
    this.gameService.createGame(this.roster.roster._id, this.gameForm).then(([status, gameId]) => status ? this.routerExtensions.navigateByUrl(`/game/current/${this.commonService.urlFormat(this.roster.roster.title)}/${gameId}`) : this.apiInvalid = true )
  }

  /** Validates new Game form */
  isValid(): boolean {
    return (!this.gameForm.opponent || !this.gameForm.subFrequency || isNaN(this.gameForm.subFrequency) || !this.gameForm.players.length) ? false : true;
  }

  /** Opens modal view for selecting the Game starters */
  selectStarters() {
    this.gameForm.players = this.roster.players.filter(({selected}) => selected);
    if (this.isValid()) {
      this.commonService.openModal(StartersComponent, this.viewContainerRef, this.gameForm.players).then(players => {
        this.gameForm.players = players;
        this.gameForm.players.length && this.submitNewGame()
      })
    }
  }

}
