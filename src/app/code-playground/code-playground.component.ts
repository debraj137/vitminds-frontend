import { Component, OnInit, Input } from "@angular/core";
import { SubjectsService } from "../shared/services/admin-services/subjects.service";
import { Compiler } from "../shared/models/compiler";
import { QuestionsService } from "../shared/services/end-user-services/questions.service";
import { ActivatedRoute } from "@angular/router";
import { Question } from "../shared/models/question";
import { AuthenticationService } from "../shared/services/common-services/authentication.service";
import { TemplateService } from "../shared/services/template.service";

@Component({
  selector: "app-code-playground",
  templateUrl: "./code-playground.component.html",
  styleUrls: ["./code-playground.component.scss"],
  host: { class: "dashboard-content-container" }
})
export class CodePlaygroundComponent implements OnInit {
  @Input() question;
  public compiler: Compiler = new Compiler();
  public code: string;
  public language: string;
  public codeError: string;
  public codeOutput: string;
  public subjectList;
  public options;
  public input: string;
  public user;
  // public question;

  constructor(
    private subjectService: SubjectsService,
    private questionservice: QuestionsService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private template: TemplateService
  ) {}

  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
    if (!this.question) {
      this.question = new Question();
    }
    // this.getSubjectList();
    this.subjectList = ["Java", "Python", "C#", "Java Script", "PHP"];
    this.language = "Java";
    this.initiliazeTemplate(this.language);
  }

  onChangeLangauge(event) {
    this.initiliazeTemplate(event);
    console.log("lang== " + event);
  }

  onChange(code) {
    console.log("new Code", code);
  }

  getSubjectList() {
    this.subjectService.subjetcList().subscribe(r => {
      if (r["status"] === "success") {
        this.subjectList = r["subjects"];
        console.log("subject list == ", this.subjectList);
      }
    });
  }

  initiliazeTemplate(language) {
    this.code = this.template.initiliazeTemplate(language);
  }

  doCompile(questionId) {
    //this.code = this.question.template;
    if (questionId != 0 && questionId > 0) {
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
    } else {
      this.compiler.input = this.input;
      console.log("language is== " + this.language);

      this.compiler.language = this.language;
      this.compiler.question.template = this.code;
      //this.compiler.question.id = questionId;
      this.compiler.user.userId = this.user.userId;
      this.questionservice.doCompilation(this.compiler).subscribe(r => {
        if (r["status"] === "success") {
          //this.codeError = r["error"];
          this.codeOutput = r["output"];
          console.log("output== ", this.codeOutput);
          this.codeError = r["runtimeError"];
          console.log("codeError is== ", this.codeError);
        }
      });
    }
  }
}
