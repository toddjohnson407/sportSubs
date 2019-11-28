import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.css']
})
export class CurrentGameComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let teamUrlName = this.route.snapshot.paramMap.get('teamurlname');
    let gameId = this.route.snapshot.paramMap.get('gameid');
    console.log('CURRENT GAME');
    console.log(teamUrlName);
    console.log(gameId)
  }

}
