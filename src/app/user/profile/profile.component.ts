import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { UserService } from "src/app/shared/services/end-user-services/user.service";
import { CollegeService } from "src/app/shared/services/admin-services/college.service";
import { ProfileuploadService } from "src/app/shared/services/end-user-services/profileupload.service";
import { IMAGE_BASE_URL } from "src/app/constant";
import { User } from "src/app/shared/models/user";
import { timeout } from "rxjs-compat/operator/timeout";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  host: { class: "dashboard-content-container" },
})
export class ProfileComponent implements OnInit {
  public user = new User();
  public isLoggedIn: boolean;
  constructor(
    private auth: AuthenticationService,
    private userservice: UserService,
    private collegeservice: CollegeService,
    private profileUploadservice: ProfileuploadService,
    private tostr: ToastrService
  ) {
    this.isLoggedIn = this.auth.isUserLoggedIn;
    if (this.isLoggedIn) {
      this.user = this.auth.currentUserValue;
      this.imageBaseUrl = IMAGE_BASE_URL;
      console.log("user====", this.user);
    }
  }

  public college_list = [];
  public imageBaseUrl: string;
  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem("frontcurrentUser"));

    // console.log("user ", this.auth.currentUserValue);

    this.collegeservice.getListOfCollege().subscribe((r) => {
      if (r["status"] == "success") {
        this.college_list = r["college_list"];
        // console.log("response after getting colege list ", this.college_list);
      }
    });
    // console.log("user in ", this.user);
  }

  updateProfile() {
    this.userservice.update_profile(this.user).subscribe((r) => {
      if (r["message"] == "User update succesfully") {
        this.user = r["updated_user"];
        // console.log("updated user ", this.user);
        this.tostr.success("user updated successfully..!!", " ", {
          timeOut: 3000,
          closeButton: true,
        });
        //this.userservice.setUser(this.user);
        localStorage.setItem("frontcurrentUser", JSON.stringify(this.user));
      } else {
        this.tostr.error("something wrong..!!");
      }
    });
  }
  public currentPassword;
  public newPassword;
  public repeatNewPassword;

  changePassword() {
    if (!this.newPassword || !this.repeatNewPassword || !this.currentPassword) {
      this.tostr.error("please fill password field's..!!");
      return;
    }
    if (this.newPassword != this.repeatNewPassword) {
      // console.log("password does not match ");
      this.tostr.error("Password does not match..!!");
      return;
    }
    this.user.adminLoginMaster = { password: this.repeatNewPassword };
    this.userservice.changePassword(this.user).subscribe((r) => {
      // console.log("response after update password ", r);
      if (r["message"] == "password update succesfully") {
        this.user = r["updated_user"];
        localStorage.setItem("frontcurrentUser", JSON.stringify(this.user));
        localStorage.setItem("frontcurrentToken", r["token"]);
      }
      this.tostr.success("Password updated successfully..!!");
    });
  }

  selectedFile: File;
  uploadProfileImage(event) {
    console.log("message..");
    this.selectedFile = null;
    this.selectedFile = event.target.files[0];
    if (this.selectedFile != null) {
      console.log("selected file ", this.selectedFile);
      this.upload();
    }

    // this.profileUploadservice
    //   .pushFileToStorage({
    //     userFile: "",
    //     user: { id: this.user.userId }
    //   })
    //   .subscribe(r => {
    //     console.log("response after upload profile image ", r);
    //   });
  }
  upload() {
    this.profileUploadservice
      .pushFileToStorage({
        userFile: this.selectedFile,
        user: { id: this.user.userId },
      })
      .subscribe((r) => {
        if (r["message"] == "success" && r["uploaded"] == true) {
          this.user = r["updated_user"];
          // console.log("updated user ", this.user);
          this.userservice.setUser(this.user);
          localStorage.setItem("frontcurrentUser", JSON.stringify(this.user));
          // this.tostr.success("Profile updated successfully..!!");
        }
        // console.log("response after upload profile image ", r);
      });
  }
  getUrlEncoded(url) {
    return encodeURI(url);
  }
}
