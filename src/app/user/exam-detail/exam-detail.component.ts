import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ExamService } from "src/app/shared/services/end-user-services/exam.service";

@Component({
  selector: "app-exam-detail",
  templateUrl: "./exam-detail.component.html",
  styleUrls: ["./exam-detail.component.scss"],
  host: { class: "dashboard-content-container" },
})
export class ExamDetailComponent implements OnInit {
  public user;
  public examId: number;
  public examDetail;
  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService
  ) {}

  ngOnInit() {
    this.user = this.auth.currentUser.source["value"];
    this.examId = this.route.params["value"].id;
    this.getExamDetail();
  }

  gotoExamPage() {
    const myStartTime = new Date(
      this.examDetail.date + " " + this.examDetail.startTime
    ).getTime();
    this.examDetail.myStartTime = myStartTime;
    this.examDetail.myEndTime = myStartTime + this.examDetail.duration * 60000;
    console.log("examdetail=======", this.examDetail);

    console.log("..............", this.examDetail);
    console.log("now", Date.now());
    if (
      Date.now() > this.examDetail.myStartTime &&
      Date.now() < this.examDetail.myEndTime
    ) {
      this.router.navigate(["/exam/" + `${this.examId}`]);
    } else if (Date.now() > this.examDetail.myEndTime) {
      alert("Time up");
    } else {
      alert("Please wait for exam time");
    }
  }

  getExamDetail() {
    this.examService.getExamDetail(this.examId).subscribe((r) => {
      if (r["status"] === "success") {
        this.examDetail = r["examDetail"];
        console.log("this.examDetail.startTime", this.examDetail.startTime);
        let s = this.examDetail.startTime;

        let arr = s.split(":");
        let hr = parseInt(arr[0]);
        let min = arr[1];
        let sec = arr[2];

        if (hr > 12) {
          hr -= 12;
          this.examDetail.fixedTime = hr + ":" + min + ":" + sec + " PM";
        } else {
          this.examDetail.fixedTime = hr + ":" + min + ":" + sec + " AM";
        }
      }
    });
  }
}
