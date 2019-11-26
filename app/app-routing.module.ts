import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RosterComponent } from './roster/roster.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { NewGameComponent } from './game/new-game/new-game.component';
import { CurrentGameComponent } from './game/current-game/current-game.component';
import { ViewRosterComponent } from './roster/view-roster/view-roster.component';
import { NewRosterComponent } from './roster/new-roster/new-roster.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-register', pathMatch: 'full' },
  { path: 'roster', component: RosterComponent,
    children: [
      { path: 'view', component: ViewRosterComponent },
      { path: 'new', component: NewRosterComponent }
    ]
  },
  { path: 'login-register', component: LoginRegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'game',
	  children: [
      { path: 'new/:teamurlname', component: NewGameComponent },
      { path: 'current/:teamurlname', component: CurrentGameComponent }
    ] 
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
