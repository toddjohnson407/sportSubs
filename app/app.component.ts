import { Component, OnInit } from '@angular/core';
import { PingService, UserService } from 'kinvey-nativescript-sdk/angular';
import { Router } from '@angular/router';
import { RouterExtensions } from "nativescript-angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private pingService: PingService,
    private userService: UserService,
    private routerExtensions: RouterExtensions
  ) { }

  ngOnInit() {
    this.verify();
  }

  async verify() {
    try {
      const response = await this.pingService.ping();
      console.log("Kinvey is up! "
                 + "Version: " + response.version
                 + " Response: " + response.kinvey
      );
      this.checkUser();
    } catch (error) {
      console.log(error);
      console.log(`Kinvey Ping Failed. Response: ${error}`);
    }
  }

  async checkUser() {
    let activeUser = await this.userService.getActiveUser();
    !activeUser ? this.routerExtensions.navigateByUrl('/login-register', { clearHistory: true }) : this.routerExtensions.navigateByUrl('/roster', { clearHistory: true });
  }
}
