import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RosterComponent } from './roster/roster.component';
import { LoginRegisterComponent } from './login-register/login-register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-register', pathMatch: 'full' },
  { path: 'roster', component: RosterComponent },
  { path: 'login-register', component: LoginRegisterComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
