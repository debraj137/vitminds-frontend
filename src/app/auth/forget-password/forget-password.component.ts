import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"]
})
export class ForgetPasswordComponent implements OnInit {
  public tkn = false;
  public emailflag = false;
  public pwdFlag = false;
  public tokenFlag = false;
  public email: string;
  public token: string;
  public newPassword: string;
  public cnfPassword: string;
  public showLoading = false;
  public submitted=false;

  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.tkn = false;
    this.emailflag = false;
    this.pwdFlag = false;
    this.tokenFlag = false;
  }

  ngOnInit() {}

  submit() {
    this.authenticationService
      .forgotPassword({ email: this.email })
      .subscribe(r => {
        if (r["message"] === "user exist") {
         this.tkn = true;
          this.toastr.info("Please check your mail for Token");
        } else {
          this.emailflag = true;
        }
        this.showLoading = false;
      });
     
  
}

  Back() {
    this.tkn = false;
  }

  updatePassword=()=> {
    console.log("buttton clicked in update pwd");
    console.log("new password = ", this.newPassword);
    console.log("cnf password = ", this.cnfPassword);

   this.submitted=true;
   if(!this.token || !this.newPassword)
   {
     return;
   }

    if (this.newPassword === this.cnfPassword) {
      if (this.newPassword.length < 6) {
        this.toastr.error("password length should be between 6 to 30 letter");
        this.showLoading = false;
      } else {
        if (this.newPassword.search(/[a-zA-z0-9]/) + 1) {
          this.authenticationService
            .resetPassword({
              adminLoginMaster: {
                token: this.token,
                password: this.newPassword
              }
            })
            .subscribe(r => {
              if (r["message"] === "password reset") {
                this.toastr.success("password reseted successfully");
                this.router.navigate(["/auth/login"]);
              } else {
                this.tokenFlag = true;
              }
              this.showLoading = false;
            });
        } else {
          this.toastr.error("password should contain atleast 1 character");
          this.showLoading = false;
        }
      }
    } else {
      this.pwdFlag = true;
      this.showLoading = false;
    }
  }
}

