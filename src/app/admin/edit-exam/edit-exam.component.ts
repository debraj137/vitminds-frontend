import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { ExamService } from "src/app/shared/services/admin-services/exam.service";
import { CourseService } from "src/app/shared/services/admin-services/course.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Exam } from "src/app/shared/models/exam";
import { NgxSmartModalService } from "ngx-smart-modal";
import * as moment from "moment";
import { BatchService } from "src/app/shared/services/admin-services/batch.service";

@Component({
  selector: "app-edit-exam",
  templateUrl: "./edit-exam.component.html",
  styleUrls: ["./edit-exam.component.scss"],
  host: { class: "dashboard-content-container" },
})
export class EditExamComponent implements OnInit {
  public batchList = [];
  constructor(
    private courseService: CourseService,
    private examservice: ExamService,
    private batchService: BatchService,
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    public ngxSmartModalService: NgxSmartModalService
  ) {}

  ngOnInit() {
    let examId = this.route.params["value"].id;
    // console.log("exam id ", examId);

    this.examservice.edit({ id: examId }).subscribe((r) => {
      // console.log("response after getting exam by id", r);
      if (r["message"] == "success") {
        this.exam = r["exam"];
        this.exam.startTime = moment(
          `${moment().format("YYYY-MM-DD")}T${this.exam.startTime}`
        ).format("YYYY-MM-DDThh:mm:ss");
      }
    });
    this.courselist();
    this.findBatchList();
  }

  items = [];
  public exam;
  courselist() {
    this.courseService.getCourseListForExam().subscribe((r) => {
      if (r["message"] == "added succesfully") {
        this.items = r["selectcourseforexam"];
        // console.log("response aftter courselist ", r);
      }
    });
  }

  findBatchList() {
    this.batchService.getBatchList().subscribe((r) => {
      if (r["status"] === "success") {
        this.batchList = r["batchlist"];
      }
    });
  }

  saveExam() {
    // console.log("exam object ", this.exam, " ", this.exam.startTime.length);
    /*  this.exam.trainer = this.auth.c_user;
    if (this.exam.startTime.length < 8) {
      this.exam.startTime = this.exam.startTime + ":00";
    }
    this.examservice.saveExam(this.exam).subscribe(r => {
      // console.log("response after save exam ", r);
      if (r["message"] == "exam saved successfully") {
        // this.ngxSmartModalService.getModal("myModal").close();
        this.router.navigate(["/admin/exam-list"]);
      }  */
    //======================================================
    this.exam.trainer = this.auth.c_user;
    // this.exam.startTime = this.exam.startTime + ":00";

    //this.exam.startTime = moment(this.exam.startTime).format("hh:mm:ss");
    let t = new Date(this.exam.startTime);
    let myVar = "";
    myVar += t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
    this.exam.startTime = myVar;
    console.log("i m outside if condition ", this.exam.startTime);

    this.examservice.saveExam(this.exam).subscribe((r) => {
      // console.log("response after save exam ", r);
      if (r["message"] == "exam saved successfully") {
        // this.router.navigate(["/admin/exam-list"]);
        this.router.navigate(["/admin/exam-list"]);
      }
    });
  }
}
