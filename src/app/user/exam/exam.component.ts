import { Component, OnInit, ViewChild } from "@angular/core";
import { ExamService } from "src/app/shared/services/end-user-services/exam.service";
import { ActivatedRoute } from "@angular/router";
import { CountdownComponent } from "ngx-countdown";

@Component({
  selector: "app-exam",
  templateUrl: "./exam.component.html",
  styleUrls: ["./exam.component.scss"],
})
export class ExamComponent implements OnInit {
  public examQuestionDetails = [];
  public totalQuestionCount: number;
  public examId: number;
  public examTitle: string;
  public examMarks: number;
  public examQuestionDetail;
  public questionId: number;
  public examDuration: number;
  public examStartTime: Date = new Date();
  public optionMap = new Map<number, number>();

  @ViewChild("countdown", { static: true }) counter: CountdownComponent;

  constructor(private examService: ExamService, private route: ActivatedRoute) {
    // this.examService.getExamId().subscribe(id =>{
    //   this.examId = id.text;
    //   console.log("get exam Id in exam component == ", this.examId);
    //   //this.getExamQuestionDetail(this.examId);
    // });
  }

  ngOnInit() {
    this.examId = this.route.params["value"].id;
    this.getExamQuestionDetail(this.examId);
  }

  getExamQuestionDetail(examId) {
    this.examService.questionsByExamId({ id: examId }).subscribe((r) => {
      if (r["status"] === "success") {
        this.examQuestionDetails = r["examQuestionDetails"];
        this.totalQuestionCount = r["total_question_count"];
        this.examTitle = this.examQuestionDetails[0].exam;
        this.examMarks = this.examQuestionDetails[0].marks;
        this.questionId = this.examQuestionDetails[0].id;
        this.examDuration = this.examQuestionDetails[0].duration;
        this.examStartTime = this.examQuestionDetails[0].startTime;
        //console.log("start time is ", this.examStartTime);
        this.getQuestionDetail(1, this.questionId);
      }
    });
  }
  index: number;
  getQuestionDetail(indx, quesId) {
    this.index = indx;
    this.examService
      .getAssignedExamSingleQuestion(quesId, this.examId)
      .subscribe((r) => {
        if (r["status"] === "success") {
          this.examQuestionDetail = r["examQuestionDetail"];
          // console.log("examQuestionDetail == ", this.examQuestionDetail);
        }
      });
  }
  nextQuestion() {
    console.log("index==", this.index);
    this.index;
    let obj = this.examQuestionDetails[this.index];
    if (obj != undefined) {
      this.getQuestionDetail(this.index, obj.id);
    }
    this.index++;
  }

  public now: number;
  onStart() {
    this.now = Date.now();
    this.counter.start;
    //console.log("start time is", this.counter.start);
  }

  public finishedStatus = false;
  onFinished() {
    this.finishedStatus = true;
    this.examService.setExamSubmitFlag(this.finishedStatus);
    //console.log("finished==", this.finishedStatus)
    this.nextQuestion();
  }
  onNotify(event) {
    console.log("left time==", event);
  }

  getOptionDetail(optionMap) {
    this.optionMap = optionMap;
    console.log("Option Map in Parent ==", optionMap);
  }
}
