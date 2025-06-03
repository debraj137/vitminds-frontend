import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"],
})
export class AdminLayoutComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}
  public isTrainer: boolean;
  ngOnInit() {
    this.isTrainer = this.authenticationService.isTrainer();
  }
}
