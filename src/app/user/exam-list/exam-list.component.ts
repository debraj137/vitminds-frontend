import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSmartModalService } from "ngx-smart-modal";
import { Exam } from "src/app/shared/models/exam";
import { CommonExamService } from "src/app/shared/services/common-services/common-exam.service";
import { ExamService } from "src/app/shared/services/end-user-services/exam.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-exam-list",
  templateUrl: "./exam-list.component.html",
  styleUrls: ["./exam-list.component.scss"],
  host: { class: "dashboard-content-container" }
})
export class ExamListComponent implements OnInit {
  items = [];
  exam = new Exam();
  public searchText;
  editFlag = false;
  public user;
  public param;
  constructor(
    private examservice: CommonExamService,
    private endUserExamService: ExamService,
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private toastar: ToastrService,
    public ngxSmartModalService: NgxSmartModalService
  ) {
    this.user = this.auth.currentUserValue;
  }

  ngOnInit() {
    //console.log("user in ", this.user);
    this.route.params.subscribe(params => {
      this.param = params["status"];
      if (this.param === "finished") {
        this.finishedExamList();
      } else if (this.param === "practice") {
        this.practiceExamList();
      } else if (this.param === "all") {
        this.student_examList();
      }
    });
  }
  student_examList() {
    this.examservice.student_exam_list(this.user).subscribe(r => {
      if (r["status"] == "success") {
        this.items = r["exams"];
      }
    });
  }
  attended_examList() {
    this.examservice.attended_exam_list(this.user).subscribe(r => {
      // console.log("response after getting examlist ", r);
      if (r["status"] == "success") {
        this.items = r["exams"];
      }
    });
  }
  finishedExamList() {
    this.examservice.finished_exam_list(this.user).subscribe(r => {
      // console.log("response after getting examlist ", r);
      if (r["status"] == "success") {
        this.items = r["exams"];
      }
    });
  }
  practiceExamList() {
    this.examservice.practice_exam_list(this.user).subscribe(r => {
      // console.log("response after getting examlist ", r);
      if (r["status"] == "success") {
        this.items = r["exams"];
      }
    });
  }

  public exId: number;
  public examToken: string;

  getExamIdOnClick(id, token) {
    this.exId = id;
    if (token != null) {
      this.ngxSmartModalService.getModal("myTokenModal").open();
    } else {
      this.router.navigate(["/user/exam_detail/" + `${id}`]);
    }
    //this.router.navigate(["/exam/" + `${id}`]);
  }

  validateExamToken() {
    this.exam.id = this.exId;
    this.exam.examToken = this.examToken;
    this.endUserExamService
      .validateExamToken(this.exam, this.user.userId)
      .subscribe(r => {
        if (r["status"] === "success") {
          if (r["message"] === "Token Used") {
            this.toastar.success(r["message"], "", {
              timeOut: 2000,
              closeButton: true
            });
            this.examToken = "";
          } else {
            this.toastar.success(r["message"], "", {
              timeOut: 1000
            });
            this.examToken = "";
            this.router.navigate(["/user/exam_detail/" + `${this.exam.id}`]);
          }
        } else {
          this.examToken = "";
          this.toastar.error(r["message"], "", {
            timeOut: 2000,
            closeButton: true
          });
        }
        this.ngxSmartModalService.getModal("myTokenModal").close();
      });
  }
}
