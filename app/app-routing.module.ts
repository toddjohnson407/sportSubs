import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RosterComponent } from './roster/roster.component';

const routes: Routes = [
  { path: '', redirectTo: '/roster', pathMatch: 'full' },
  { path: 'roster', component: RosterComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
