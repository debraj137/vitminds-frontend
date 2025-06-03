import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/models/user";
import { SignuploginService } from "src/app/shared/services/end-user-services/signuplogin.service";
import { CollegeComponent } from "src/app/admin/college/college.component";
import { CollegeService } from "src/app/shared/services/admin-services/college.service";
import { NgxSmartModalService } from "ngx-smart-modal";
import { College } from "src/app/shared/models/college";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  public submitted = false;

  showLoading = false;
  public otpflag = false;
  public token: string;

  constructor(
    private signupservice: SignuploginService,
    private collegeService: CollegeService,
    private tostr: ToastrService,
    public ngxSmartModalService: NgxSmartModalService
  ) {}
  public user = new User();

  collegelist = [];

  public isLoggedIn = false;
  ngOnInit() {
    this.getCollegeList();
    //  this.register();
  }

  register = () => {
    // signup validation
    this.submitted = true;
    if (
      !this.user.firstName ||
      !this.user.college.id ||
      !this.user.mobileNumber ||
      !this.user.email ||
      !this.user.adminLoginMaster.password
    ) {
      return;
    }
    // validation end
    console.log("Reegistration Part..");
    this.user.organization = { id: 1 };
    this.user.description = "dsgdh";
    if (this.user && this.user.mobileNumber) {
      // this.tostr.info("Please wait for OTP generation!");
      this.signupservice
        .sendEmailforOTP({
          mobileNumber: this.user.mobileNumber,
          email: this.user.email,
        })
        .subscribe((r) => {
          console.log("response after sendEmailforOTP ", r);

          if (r["status"] == "success") {
            this.otpflag = true;
            this.showLoading = false;
            this.tostr.info("Please check your sms/emailId for OTP");
          }
        });
    }
  };

  public verifyOTP: any;
  public otpwrongflag = false;
  public msg;
  sendOtp() {
    // sendOtp validation
    this.submitted = true;
    if (!this.verifyOTP) {
      return;
    }
    this.signupservice
      .sendOTPforVarification({
        mobileNumber: this.user.mobileNumber,
        otp: this.verifyOTP,
      })
      .subscribe((r) => {
        console.log("response after sendOTPforVarification ", r);
        this.signupservice.save(this.user).subscribe((r) => {
          if (r["message"] == "User added succesfully") {
            this.isLoggedIn = true;
            this.msg = "You have registered successfully";
          } else if (r["message"] == "User Already Exist") {
            this.msg =
              "User exist with provided email id, Please use different email id ";
          }
          this.tostr.info(this.msg);
        });
      });
  }

  getCollegeList() {
    this.collegeService.getListOfCollege().subscribe((data) => {
      if (data["status"] == "success") this.collegelist = data["college_list"];
    });
  }
}
