import { Component, OnInit } from "@angular/core";
import { ExamService } from "src/app/shared/services/end-user-services/exam.service";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";

@Component({
  selector: "app-exam-result",
  templateUrl: "./exam-result.component.html",
  styleUrls: ["./exam-result.component.scss"],
  host: { class: "dashboard-content-container" }
})
export class ExamResultComponent implements OnInit {
  public type: string = "summery";
  public user;
  public examId: number;
  public attendedQuesCount: number;
  public totalAssignedQuesCount: number;
  public correctAnsCount: number;
  public totalScore: number;
  public examMarks: number;
  public examQuestionAnswers = [];
  public rightOptions = [];
  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {}
  public editFlag = false;
  ngOnInit() {
    this.examId = this.route.params["value"].id;
    this.authenticationService.currentUser.subscribe(u => {
      if (u != null) {
        this.user = u;
      }
    });
    this.getAnswerSummary();
  }

  public correctans = new Map<number, number>();
  public ans;
  getAnswerSummary() {
    this.examService.getSummary(this.examId, this.user.userId).subscribe(r => {
      if (r["status"] === "success") {
        this.examQuestionAnswers = r["examQustionAnswers"];
        this.rightOptions = r["rightOptions"];
        this.attendedQuesCount = r["attendedQuestions"];
        this.totalAssignedQuesCount = r["totalAssignedQuesCount"];
        this.correctAnsCount = r["correctAnsCount"];
        this.totalScore = r["totalScore"];
        this.examMarks = r["examMarks"];

        for (let j = 0; j < this.examQuestionAnswers.length; j++) {
          for (let i = 0; i < this.rightOptions.length; i++) {
            if (
              this.examQuestionAnswers[j].question.id ===
              this.rightOptions[i].question.id
            ) {
              this.correctans[
                this.examQuestionAnswers[j].question.id
              ] = this.rightOptions[i].option.id;
            }
          }
        }
      }
    });
  }
}
