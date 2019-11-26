import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common/common.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { RosterService } from '../../roster/roster.service';
import { Game } from '../game';

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

  constructor(
    private commonService: CommonService,
    private routerExtensions: RouterExtensions,
    private route: ActivatedRoute,
    private rosterService: RosterService
  ) {
    this.gameForm = {
      opponent: '',
      players: [],
      subFrequency: 2
    }
  }

  ngOnInit() {
    this.teamUrlName = this.route.snapshot.paramMap.get('teamurlname');
    !this.teamUrlName && this.routerExtensions.navigateByUrl('/login-register', { clearHistory: true });

    this.rosterService.getRoster(this.commonService.revertUrlFormat(this.teamUrlName)).subscribe((roster: any) => roster && this.roster === roster)
  }

  goBack() { this.routerExtensions.back() }

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
    
  }

}
