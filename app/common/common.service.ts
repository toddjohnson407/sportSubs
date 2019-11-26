import { Injectable } from "@angular/core";
import { DataStoreService, UserService, Query } from "kinvey-nativescript-sdk/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Observable, combineLatest, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CommonService {

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private dataStoreService: DataStoreService
  ) {

  }

  /** Converts string to url safe format */
  urlFormat = (name: string): string => name.trim().replace(' ', '-');
  /** Converts url string back to original format */
  revertUrlFormat = (name: string): string => name.trim().replace('-', ' ');
  
}

