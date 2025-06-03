import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"]
})
export class SideMenuComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public user;

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {}

  logoutEndUser() {
    if (this.auth.logoutEndUser()) {
      this.user = null;
      this.isLoggedIn = false;
      return this.router.navigate(["/"]);
    }
    //location.reload();
  }
}
