import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../shared/services/common-services/authentication.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private tostr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}
  myAccount() {
    if (
      this.auth.currentUser.source["value"] &&
      this.auth.currentUser.source["value"].userId
    ) {
      this.router.navigate(["/user/dashboard"]);
    } else {
      this.tostr.error("please login first...!!");
    }
  }
}
