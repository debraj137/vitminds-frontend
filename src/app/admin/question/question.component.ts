import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { Question } from "src/app/shared/models/question";
import { QuestionService } from "src/app/shared/services/admin-services/question.service";
import { SubjectsService } from "src/app/shared/services/admin-services/subjects.service";
import { TopicCategoryService } from "src/app/shared/services/admin-services/topic-category.service";
import { Option } from "src/app/shared/models/option";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.scss"],
  // host: { class: "dashboard-content-container" }
})
export class QuestionComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: "5rem",
    maxHeight: "15rem",
    placeholder: "Enter text here...",
    translate: "no",
    sanitize: false,
    toolbarPosition: "top",
    // uploadUrl: environment.baseUrl + "/blog/upload_image"
    // customClasses: [
    //   {
    //     name: "redText",
    //     class: "redText"
    //   },
    //   {
    //     name: "quote",
    //     class: "{'font-size':'10rem'}"
    //   },
    //   {
    //     name: "titleText",
    //     class: "titleText",
    //     tag: "h1"
    //   }
    // ]
  };

  question = new Question();
  optionArr = [];
  optionFlag = false;
  question_TYPE;

  constructor(
    private questionservice: QuestionService,
    private subject_service: SubjectsService,
    public fb: FormBuilder,
    private topic_categoryservice: TopicCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createFormOne();
    this.route.params.subscribe(
      (params) => (this.question_TYPE = params.questionType)
    );
    for (let i = 0; i < 4; i++) {
      let op = new Option();
      this.optionArr.push(op);
    }
  }
  public exam_form: FormGroup;

  get step1Form() {
    return this.exam_form.controls;
  }
  createFormOne() {
    const req = [Validators.compose([Validators.required])];
    this.exam_form = this.fb.group({
      categoryId: ["", Validators.compose([...req])],
      name: ["", Validators.compose([...req])],
      questionMarks: ["", Validators.compose([...req])],
      subjectId: ["", Validators.compose([...req])],
      //description: ["", Validators.compose([...req])]
    });
  }
  subjectlist = [];
  topiccategory = [];
  ngOnInit() {
    this.subject_service.listOfSubjectForQuestion().subscribe((r) => {
      if (r["message"] == "subject list get succesfully") {
        this.subjectlist = r["subjects"];
        // console.log("response after subjectlist  ", r);
      }
    });
    this.topic_categoryservice.listCategoryForQuestion().subscribe((r) => {
      //   console.log("response after get topic category list ", r);
      if (r["message"] == "category list getting successfully") {
        this.topiccategory = r["topicCategories"];
      }
    });
  }
  checkPractice() {
    this.question.practice = !this.question.practice;
  }
  ques_status = false;
  submitted = false;
  save_question() {
    this.submitted = true;
    if (this.exam_form.invalid) {
      console.log("q form invalid ");
      return;
    }
    this.ques_status = true;
  }
  questionId;
  public showOption = false;
  confirm() {
    //console.log('Invalidmessage');
    this.submitted = true;
    this.showOption = true;
    if (this.exam_form.invalid) {
      console.log("Invalid");
      return;
    }

    this.question.questionType = this.question_TYPE;
    this.questionservice.saveQuestion(this.question).subscribe((r) => {
      // console.log("response after save question ", r);
      if (r["message"] == "Question added/updated succesfully") {
        if (this.question_TYPE != "objective") {
          this.question = new Question();
          this.router.navigate(["/admin/question-list"]);
        }
        this.questionId = r["questionId"];
        this.ques_status = false;
        this.submitted = false;
        if (this.question_TYPE == "objective") {
          this.navigateTo("Options");
        }
      }
    });
  }
  back() {
    this.ques_status = false;
  }
  public currentSort = "Question";
  navigateTo(val) {
    this.currentSort = val;
  }

  public showChooseOption = false;
  saveOptions() {
    this.submitted = true;
    this.showChooseOption = true;
    for (let i = 0; i < this.optionArr.length; i++) {
      this.optionArr[i].question.id = this.questionId;
      // console.log("**  ", this.optionArr[i]);
      if (!this.optionArr[i].name) {
        return;
      }
    }
    // this.optionFlag = true;
    // this.confirmOptions();

    this.questionOptionPreview = true;
  }

  optionsaveConfirm() {
    this.confirmOptions();
  }
  public questionOptionPreview = false;
  confirmOptions() {
    this.questionservice.saveOptionlist(this.optionArr).subscribe((r) => {
      if (r["message"] == "Options added succesfully") {
        this.navigateTo("Choose");
        this.optionArr = r["options"];
        this.questionOptionPreview = false;
        this.submitted = false;
        for (let op of this.optionArr) {
          this.mapRightOption[op.id] = false;
        }
      }
    });
  }
  gotoOption() {
    this.questionOptionPreview = false;
    this.navigateTo("Options");
  }
  checkSign(id) {
    this.mapRightOption[id] = !this.mapRightOption[id];
  }
  rightOption = [];
  mapRightOption = new Map<number, boolean>();
  saveRightOptions() {
    for (let mr in this.mapRightOption) {
      if (this.mapRightOption[mr]) {
        for (let op of this.optionArr) {
          if (op.id == mr) {
            let p = {
              questionRightOptionId: {
                option: {
                  id: op.id,
                },
              },
            };
            this.rightOption.push(p);
            // console.log("this.rightOption ", this.rightOption);
          }
        }
      }
    }
    this.questionservice
      .saveRightOption({
        id: this.questionId,
        questionRightOptionDetails: this.rightOption,
      })
      .subscribe((r) => {
        // console.log("response after save right option ", r);
        if (r["message"] == "Right option added succesfully") {
          this.navigateTo("Question");
          this.question = new Question();
          this.optionArr.length = 0;
          this.router.navigate(["/admin/question-list"]);
        }
      });
  }
  backList() {
    this.router.navigate(["/admin/question-list"]);
  }
}
