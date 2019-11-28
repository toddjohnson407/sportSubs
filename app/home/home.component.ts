import { Component, OnInit } from '@angular/core';
import { UserService } from 'kinvey-nativescript-sdk/angular';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private routerExtensions: RouterExtensions
  ) { }

  async ngOnInit() {
    let reroute = await this.userService.getActiveUser() ? '/roster' : '/login-register';
    this.routerExtensions.navigateByUrl(reroute, { clearHistory: true });
  }

}
