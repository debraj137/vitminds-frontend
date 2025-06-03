import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ExamService } from "src/app/shared/services/admin-services/exam.service";
import { BatchService } from "src/app/shared/services/admin-services/batch.service";
@Component({
  selector: "app-assign-batch",
  templateUrl: "./assign-batch.component.html",
  styleUrls: ["./assign-batch.component.scss"],
  host: { class: "dashboard-content-container" },
})
export class AssignBatchComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examservice: ExamService,
    private batchservice: BatchService
  ) {}
  public examId;
  public addFlag = false;
  public batchlist = [];
  searchText;
  public examStudentDetails = [];
  ngOnInit() {
    this.examId = this.route.params["value"].id;
    this.assignedStudentList();
    //this.get_allBatch();
  }
  assignedStudentList() {
    this.examservice.assignedStudentList(this.examId).subscribe((r) => {
      this.examStudentDetails = r["examStudentDetails"];
    });
  }
  get_allBatch() {
    this.addFlag = true;
    this.batchservice.getBatchList().subscribe((r) => {
      if (r["message"] == "get batch list succesfully") {
        this.batchlist = r["batchlist"];
      }
    });
  }
  removeStudentFromExam(exam_studentDetail) {
    //studentId = exam_studentDetail.studentId;
    this.examservice
      .removeStudentFromExam(this.examId, exam_studentDetail.studentId)
      .subscribe((r) => {
        if (r["message"] == "removed successfully") {
          this.assignedStudentList();
        }
      });
  }
  addExams() {
    this.addFlag = true;
  }

  public checkMap = new Map<number, boolean>();
  checkMapFun(id) {
    this.checkMap[id] = !this.checkMap[id];
  }
  // public checkMapall=new Map<number,boolean>();
  checkMapFunAll() {
    for (let s of this.batch_student_list) {
      if (!this.checkMap[s.userId]) {
        this.checkMap[s.userId] = true;
      } else {
        this.checkMap[s.userId] = false;
      }
      // console.log("Fun all messages..",this.batch_student_list);
    }
  }
  public studentFlag = false;
  public batch_student_list = [];
  assignFun(batch) {
    this.studentFlag = true;
    this.batchservice.assignedStudents(batch).subscribe((r) => {
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
            student: st,
          })
          .subscribe((r) => {
            if (r["message"] == "successfully assigned") {
              this.addFlag = false;
              this.studentFlag = false;
              this.assignedStudentList();
            }
          });
      }
    }
  }
  back() {
    this.router.navigate(["/admin/exam-list"]);
  }
  backExam() {
    this.addFlag = false;
  }
  backBatch() {
    console.log("Batch Log.....");
    this.studentFlag = false;
    this.addFlag = true;
  }
}
