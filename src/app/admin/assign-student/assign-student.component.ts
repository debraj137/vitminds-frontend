import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from "src/app/shared/services/admin-services/student.service";
import { BatchService } from "src/app/shared/services/admin-services/batch.service";

@Component({
  selector: "app-assign-student",
  templateUrl: "./assign-student.component.html",
  styleUrls: ["./assign-student.component.scss"],
})
export class AssignStudentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentservice: StudentService,
    private batchservice: BatchService
  ) {}

  public batchId;
  searchText;
  editFlag = false;
  public assigned_student_list = [];
  ngOnInit() {
    this.batchId = this.route.params["value"].id;
    this.get_AllStudentBybatchId();
  }
  get_AllStudentBybatchId() {
    this.batchservice.assignedStudents({ id: this.batchId }).subscribe((r) => {
      console.log("response after getting assigned student in batch ", r);
      if (r["message"] == "list successfully") {
        this.assigned_student_list = r["students"];
      }
    });
  }
  public addFlag = false;

  public studentlist = [];
  public checkMap = new Map<number, boolean>();
  checkMapFun(id) {
    this.checkMap[id] = !this.checkMap[id];
  }
  removeStudentFromBatch(student) {
    this.batchservice
      .removeStudentFromBatch(this.batchId, student.userId)
      .subscribe((r) => {
        if (r["message"] == "removed successfully") {
          this.studentlist = r["students"];
          this.get_AllStudentBybatchId();
        }
      });
  }
  addStudent() {
    this.addFlag = true;
    this.studentservice.getAllStudentlist().subscribe((r) => {
      console.log("getAllStudentlist ", r);
      if (r["message"] == "list succesfully") {
        this.studentlist = r["students"];
        for (let q of this.studentlist) {
          this.checkMap[q.id] = false;
        }
      }
    });
  }

  public assignS_Array = [];
  assignedStudent() {
    this.assignS_Array.length = 0;
    for (let key in this.checkMap) {
      if (this.checkMap[key]) {
        for (let q of this.studentlist) {
          if (q.userId == key) {
            let q_f = {
              batchStudentId: {
                student: {
                  userId: q.userId,
                },
              },
            };
            this.assignS_Array.push(q_f);
            console.log("ready for assign student ", this.assignS_Array);
          }
        }
      }
    }
    this.batchservice
      .assignStudentList({
        id: this.batchId,
        batchStudentDetails: this.assignS_Array,
      })
      .subscribe((r) => {
        console.log("response after assign student list ", r);
        if (r["message"] == "student assigned successfully") {
          this.addFlag = false;
          this.get_AllStudentBybatchId();
        }
      });
  }

  back() {
    this.router.navigate(["/admin/batch_list"]);
  }

  backTo() {
    this.addFlag = false;
  }
}
