import { Component, OnInit, Input } from "@angular/core";
import * as $ from "jquery";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { Router } from "@angular/router";

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
  constructor(private auth: AuthenticationService, private router: Router) {
    this.isLoggedIn = this.auth.isLoggedIn;
    if (!this.isLoggedIn) {
      this.router.navigate(["/admin/login"]);
    } else {
      this.user = this.auth.currentAdminUserValue;
      if (this.user && this.user.userId) {
        this.isLoggedIn = true;
      }
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

    // console.log("end user ", this.user);
  }
  handleUserMenuTrigger = event => {
    event.preventDefault();
    this.userMenuStatue = !this.userMenuStatue;
  };

  close_user_dropdown = function() {
    this.userMenuStatue = false;
  };
  logout() {
    this.auth.logout();
    this.isLoggedIn = false;
    this.user = null;
    return this.router.navigate(["/"]);
  }
  getUrlEncoded(url) {
    return encodeURI(url);
  }
}
