import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/shared/services/admin-services/course.service";
import { Exam } from "src/app/shared/models/exam";
import { ExamService } from "src/app/shared/services/admin-services/exam.service";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-exam",
  templateUrl: "./create-exam.component.html",
  styleUrls: ["./create-exam.component.scss"],
  host: { class: "dashboard-content-container" },
})
export class CreateExamComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private examservice: ExamService,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.courselist();
  }
  items = [];
  exam = new Exam();
  courselist() {
    this.courseService.courselist().subscribe((r) => {
      if (r["message"] == "added succesfully") {
        this.items = r["courses"];
        // console.log("response aftter courselist ", r);
      }
    });
  }

  saveExam() {
    // console.log("exam object ", this.exam);
    this.exam.trainer = this.auth.currentUserValue;
    this.exam.startTime = this.exam.startTime + ":00";
    this.examservice.saveExam(this.exam).subscribe((r) => {
      // console.log("response after save exam ", r);
      if (r["message"] == "success") {
        this.router.navigate(["/admin/exam-list"]);
      }
    });
  }
}
