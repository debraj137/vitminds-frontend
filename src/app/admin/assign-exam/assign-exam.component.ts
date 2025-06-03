import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ExamService } from "src/app/shared/services/admin-services/exam.service";
import { BatchService } from "src/app/shared/services/admin-services/batch.service";

@Component({
  selector: "app-assign-exam",
  templateUrl: "./assign-exam.component.html",
  styleUrls: ["./assign-exam.component.scss"]
})
export class AssignExamComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private examservice: ExamService,
    private batchservice: BatchService
  ) {}
  public examId;
  public addFlag = false;
  searchText;
  items;
  editFlag = false;
  ngOnInit() {
    this.examId = this.route.params["value"].id;
    console.log("examId id ", this.examId);
    this.get_allAssignedExams();
  }
  get_allAssignedExams() {}

  public batchlist = [];
  addExams() {
    this.addFlag = true;
    this.batchservice.batchlist().subscribe(r => {
      console.log("response after batch list ", r);
      if (r["message"] == "added succesfully") {
        this.batchlist = r["batch"];
      }
    });
  }
  public checkMap = new Map<number, boolean>();
  checkMapFun(id) {
    this.checkMap[id] = !this.checkMap[id];
  }
  public studentFlag = false;
  public batch_student_list = [];
  assignFun(batch) {
    this.studentFlag = true;
    this.batchservice.assignedStudents(batch).subscribe(r => {
      console.log("response after assigned Students ", r);
      if (r["message"] == "list successfully") {
        this.batch_student_list = r["students"];
        for (let s of this.batch_student_list) {
          this.checkMap[s.userId] = false;
        }
      }
    });
  }

  examAssigntoStudent() {
    for (let st of this.batch_student_list) {
      if (this.checkMap[st.userId]) {
        this.examservice
          .examAssignToStudents({
            exam: { id: this.examId },
            student: st
          })
          .subscribe(r => {
            console.log("response after exam assign to student ", r);
          });
      }
    }
  }
}
