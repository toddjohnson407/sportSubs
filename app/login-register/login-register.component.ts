import { Component, OnInit } from '@angular/core';
import { UserService } from 'kinvey-nativescript-sdk/angular';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  /** Login Form */
  loginForm: any;

  /** Register Form */
  registerForm: any;

  /** Boolean to track whether to display login or register */
  isLogin: boolean = true;

  constructor(
    private userService: UserService
  ) {
    this.loginForm = {
      username: '',
      password: ''
    }

    this.registerForm = {
      name: '',
      password: '',
      username: '',
      email: ''
    }
  }

  async ngOnInit() {
    let user = await this.userService.getActiveUser();
    console.log(user);
  }

  /** Logs in user */
  async loginUser() {
    let loggedInUser = await this.userService.login(this.loginForm);
  }

  /** Registers user */
  async registerUser() {
    let newUser = await this.userService.signup(this.registerForm);
  }

  /** Toggles type of form */
  toggleUser = () => this.isLogin = !this.isLogin;

}
