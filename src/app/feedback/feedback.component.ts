import { Feedback } from "./../shared/models/feedback";
import { Component, OnInit } from "@angular/core";
import { FeedbackService } from "../shared/services/end-user-services/feedback.service";
import { AuthenticationService } from "../shared/services/common-services/authentication.service";
import { Router } from "@angular/router";

import { TrainerService } from "../shared/services/admin-services/trainer.service";
import { ToastrService } from "ngx-toastr";
//import Swal from "sweetalert2";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.scss"]
})
export class FeedbackComponent implements OnInit {
  constructor(
    private feedbackservice: FeedbackService,
    private auth: AuthenticationService,
    private trainerservice: TrainerService,
    private router: Router,
    private tostr: ToastrService
  ) {}

  public user;
  public feedback = new Feedback();
  public attributes: string[];
  public aptitude;
  ngOnInit() {
    this.user = this.auth.currentUserValue;
    console.log("user ", this.user);
    if (!this.user) {
      this.router.navigate(["/auth/login"]);
    }
    this.attributes = ["Poor", "Average", "Good", "Very Good"];
    this.getTrainerList();
  }
  public trainerlist = [];
  getTrainerList = () => {
    this.trainerservice.trainerList().subscribe(r => {
      if (r["status"] == "success") {
        this.trainerlist = r["trainers"];
      }
    });
  };

  public msg;
  saveFeedback = () => {
    this.feedback.submittedBy = this.user;
    // console.log("trainer ", this.feedback.trainer);

    // console.log("aptitude====", this.feedback);
    //let feedback = { submittedBy: this.user, message: this.msg };
    this.feedbackservice.saveFeedback(this.feedback).subscribe(r => {
      // console.log("response after save feedback ", r);
      if (r["message"] == "Feedback submitted") {
        this.msg = undefined;
        this.tostr.success(r["message"]);
        this.feedback = new Feedback();
      }
    });
  };
 
}
