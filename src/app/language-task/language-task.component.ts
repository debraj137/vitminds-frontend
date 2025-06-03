import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { QuestionsService } from "../shared/services/end-user-services/questions.service";
import * as CodeMirror from "codemirror";
import { Compiler } from "../shared/models/compiler";
import { Submission } from "../shared/models/submission";
import { SubjectsService } from "../shared/services/admin-services/subjects.service";
import { TemplateService } from "../shared/services/template.service";
import { AuthenticationService } from "../shared/services/common-services/authentication.service";
import { BindingFlags } from "@angular/compiler/src/core";
// import 'codemirror/mode/python';

@Component({
  selector: "app-language-task",
  templateUrl: "./language-task.component.html",
  styleUrls: ["./language-task.component.scss"]
})
export class LanguageTaskComponent implements OnInit {
  currentSort;
  public compiler: Compiler = new Compiler();
  public submission: Submission = new Submission();
  public code: string;
  public language: string;
  public codeError: string;
  public codeOutput: string;
  public subjectList;
  public testCaseList = [];
  public options;
  public input: string;
  public customFlag = false;
  public user;
  public max_score: number;
  public cutoff_score: number;
  public submitFlag = false;
  public yourOutput = new Map<number, string>();
  public submissionData;

  constructor(
    private questionservice: QuestionsService,
    private route: ActivatedRoute,
    private subjectService: SubjectsService,
    private template: TemplateService,
    private authenticationService: AuthenticationService
  ) {
    this.currentSort = "home";
  }
  question;

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(u => {
      if (u != null) {
        this.user = u;
      }
    });

    let id = this.route.params["value"].id;
    this.questionservice.getSingleQuestion(id).subscribe(r => {
      // console.log("response after getting single question ", r);
      if (r["message"] == "get question succesfully") {
        this.question = r["question"];
        this.max_score = r["max_score"];
        this.cutoff_score = r["cutoff_score"];

        this.language = this.question.subject.name;
        console.log("language is == " + this.language);
        // this.code = this.question.template;
        this.initiliazeTemplate(this.language);
      }
    });
    this.getSubjectList();
  }
  initiliazeTemplate(language) {
    this.code = this.template.initiliazeTemplate(language);
  }
  navigateTo(val) {
    this.currentSort = val;
  }

  onChange(code) {
    console.log("new Code", code);
  }

  customInput() {
    this.customFlag = true;
  }

  getSubjectList() {
    this.subjectService.subjetcList().subscribe(r => {
      if (r["status"] === "success") {
        this.subjectList = r["subjects"];
        console.log("subject list == ", this.subjectList);
      }
    });
  }

  doCompile(questionId) {
    //this.code = this.question.template;
    this.compiler.input = this.input;
    this.compiler.language = this.language;
    this.compiler.question.template = this.code;
    this.compiler.question.id = questionId;
    this.compiler.user.userId = this.user.userId;
    this.questionservice.doCompilation(this.compiler).subscribe(r => {
      if (r["status"] === "success") {
        //this.codeError = r["error"];
        this.codeOutput = r["output"];
        console.log("output== ", this.codeOutput);
        this.codeError = r["runtimeError"];
        console.log("codeError is== ", this.codeError);
      } else {
        //this.codeError = r["error"];
        //console.log("codeError is== ", this.codeError);
      }
    });
  }

  submitCodeTestCases(questionId) {
    this.submission.codeTemplate = this.code;
    this.submission.language = this.language;
    this.submission.submittedBy.userId = this.user.userId;
    this.submission.question.id = questionId;
    this.submission.resultStatus = "Compilation Error";
    this.submission.question.max_score = this.max_score;
    this.submission.question.cutoff_score = this.cutoff_score;

    this.questionservice.submissionCode(this.submission).subscribe(r => {
      if (r["status"] === "success") {
        this.testCaseList = r["testcaseList"];
        this.yourOutput = r["output"];
        this.submitFlag = true;
        this.getSubmissionByUserAndQuestion(questionId);
      }
    });
  }

  getSubmissionByUserAndQuestion(questionId) {
    this.questionservice
      .getSubmissionByUser(this.user.userId, questionId)
      .subscribe(r => {
        if (r["status"] === "success") {
          this.submissionData = r["submission"];
        }
      });
  }
}
