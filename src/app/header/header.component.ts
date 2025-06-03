import { Component, OnInit, Input } from "@angular/core";
import * as $ from "jquery";
import { AuthenticationService } from "../shared/services/common-services/authentication.service";
import { Router } from "@angular/router";
import { IMAGE_BASE_URL } from "../constant";
import { User } from "../shared/models/user";
import { UserService } from "../shared/services/end-user-services/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input() customClass: string;
  public userMenuStatue: boolean = false;
  public isLoggedIn: boolean = false;
  public user;
  public imageBaseUrl: string;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) {
    this.isLoggedIn = this.auth.isUserLoggedIn;
    if (this.isLoggedIn) {
      this.user = this.auth.getUserToken;
      this.imageBaseUrl = IMAGE_BASE_URL;
    }
  }

  ngOnInit() {
    let mouse_is_inside = false;
    $(".header-notifications").on("mouseenter", () => {
      mouse_is_inside = true;
    });
    $(".header-notifications").on("mouseleave", () => {
      mouse_is_inside = false;
    });
    $("body").mouseup(() => {
      if (!mouse_is_inside) this.close_user_dropdown();
    });
    $(document).keyup(e => {
      if (e.keyCode == 27) {
        this.close_user_dropdown();
      }
    });
    this.userService.getUser().subscribe(u => {
      if (u != null) {
        this.user = u.text;
      }
    });
    this.user = JSON.parse(localStorage.getItem("frontcurrentUser"));
    // console.log("end user ", this.user);
    if (this.user && this.user.userId) {
      this.isLoggedIn = true;
    }
  }

  handleUserMenuTrigger = event => {
    event.preventDefault();
    this.userMenuStatue = !this.userMenuStatue;
  };

  close_user_dropdown = function() {
    this.userMenuStatue = false;
  };
  logoutEndUser() {
    if (this.auth.logoutEndUser()) {
      this.user = null;
      this.isLoggedIn = false;
      return this.router.navigate(["/"]);
    }
    console.log("logged out," + this.user);
    //location.reload();
  }
  getUrlEncoded(url) {
    return encodeURI(url);
  }
}
