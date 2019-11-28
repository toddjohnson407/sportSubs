import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app-routing.module';


import { HomeComponent } from './home/home.component';
import { RosterComponent } from './roster/roster.component';

import { KinveyModule } from 'kinvey-nativescript-sdk/angular';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NewRosterComponent } from './roster/new-roster/new-roster.component';
import { ViewRosterComponent } from './roster/view-roster/view-roster.component';
import { NewRosterBarComponent } from './roster/new-roster/new-roster-bar/new-roster-bar.component';
import { NewGameComponent } from './game/new-game/new-game.component';
import { CurrentGameComponent } from './game/current-game/current-game.component';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { StartersComponent } from './game/new-game/starters/starters.component';
import { BottomBarComponent } from './roster/view-roster/bottom-bar/bottom-bar.component';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RosterComponent,
    LoginRegisterComponent,
    NewRosterComponent,
    ViewRosterComponent,
    NewRosterBarComponent,
    NewGameComponent,
    CurrentGameComponent,
    StartersComponent,
    BottomBarComponent
  ],
  imports: [
    NativeScriptFormsModule,
    NativeScriptModule,
    AppRoutingModule,
    KinveyModule.init({
      appKey: 'kid_rkAS63nsS',
      appSecret: '33df2cb32c1b45fdbde41a69b5bd16e2'
    })
  ],
  providers: [ModalDialogService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}

