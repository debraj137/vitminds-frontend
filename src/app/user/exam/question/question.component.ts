import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ExamService } from "src/app/shared/services/end-user-services/exam.service";
import { analyze } from "tern";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.scss"],
})
export class QuestionComponent implements OnInit {
  @Input() questionDetail: any;
  @Input() index: number;
  @Input() examId: number;
  @Input() type: string = "";
  @Input() totalQuestionCount: number;
  @Output() checkedoption = new EventEmitter<any>();
  public attendedQuestionCount: number;
  public leftQuestionCount: number;
  public optionMap = new Map<number, number>();
  public checkedOption = new Map<number, boolean>();
  public finishedStatus: boolean;
  public user;
  constructor(
    private examService: ExamService,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe((u) => {
      if (u != null) {
        this.user = u;
      }
    });
    this.examService.getExamSubmitFlag().subscribe((flag) => {
      if (flag) {
        this.finishedStatus = flag.text;
        this.saveAnswerOnSubmit(this.examId);
      }
    });
  }

  public queId: number;
  public opId: number;
  public examQuestionAnswer = [];

  onClickOption(questionId, optionId) {
    this.optionMap[questionId] = optionId;
    this.checkedoption.emit(this.optionMap);
    console.log("send option to parent=", this.optionMap);
  }

  confirmBrforeSubmit(examId) {
    this.attendedQuestionCount = Object.keys(this.optionMap).length;
    this.leftQuestionCount =
      this.totalQuestionCount - this.attendedQuestionCount;
    if (this.leftQuestionCount > 0) {
      Swal.fire({
        title: "Are you sure to proceed?",
        text: this.leftQuestionCount + " Unattended questions are left.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value) {
          this.saveAnswerOnSubmit(examId);
        }
      });
    } else {
      this.saveAnswerOnSubmit(examId);
    }
  }

  saveAnswerOnSubmit(examId) {
    this.examQuestionAnswer.length = 0;
    for (let key in this.optionMap) {
      let ansValue = this.optionMap[key];

      let quesAns = {
        examQustionAnswerId: {
          exam: {
            id: parseInt(examId),
          },
          user: {
            userId: this.user.userId,
          },
          question: {
            id: parseInt(key),
          },
        },
        answer: ansValue,
      };
      this.examQuestionAnswer.push(quesAns);
    }

    this.examService
      .saveAnswerOnSubmit(this.examQuestionAnswer)
      .subscribe((r) => {
        if (r["status"] === "success") {
          this.toastr.success("Answer Submitted Successfully");
          this.router.navigate(["/user/exam_result/" + `${examId}`]);
        }
      });
  }

  // getAssignedExamSingleQuestionById(){
  //   this.examService.getAssignedExamSinggleQuestion()
  // }
}
