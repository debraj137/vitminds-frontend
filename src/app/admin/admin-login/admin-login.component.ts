import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { User } from "src/app/shared/models/user";

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.scss"]
})
export class AdminLoginComponent implements OnInit {
  public loginError: string;
  public incorrectId = false;

  constructor(private router: Router, private auth: AuthenticationService) {}

  ngOnInit() {}

  public user = new User();
  Login() {
    let username = this.user.username;
    let password = this.user.password;
    // console.log("username password ", username, " ", password);

    this.auth.login(username, password).subscribe(r => {
      // console.log("response ", r);
      if (r["status"] === "success") {
        this.router.navigate(["/admin/dashboard"]);
      } else {
        this.incorrectId = true;
        this.loginError = r["message"];
        console.log("loginError== ", this.loginError);
      }
    });
  }
}
