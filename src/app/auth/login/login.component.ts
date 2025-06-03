import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/models/user";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthenticationService, private router: Router) {
    // this.createFormLogin();
  }
  public loginError: string;
  public incorrectId = false;
  public user = new User();
  loginForm: FormGroup;
  submitted = false;
  isLoggedIn = false;
  ngOnInit() {}

  // createFormLogin() {
  //   this.loginForm = this.fb.group({
  //     emailaddress: [
  //       "",
  //       Validators.compose([Validators.required, Validators.email])
  //     ],
  //     password: ["", Validators.compose([Validators.required])]
  //   });
  // }
  // get login() {
  //   return this.loginForm.controls;
  // }

  Login() {
    this.auth.loginEndUser(this.user).subscribe(r => {
      // console.log("response after end user login ", r);
      if (r["message"] == "Login successfuly") {
        localStorage.setItem(
          "frontcurrentUser",
          JSON.stringify(r["adminInfo"])
        );
        this.router.navigate(["/user/dashboard"]);
      } else {
        this.incorrectId = true;
        this.loginError = r["message"];
      }
    });
  }
}
