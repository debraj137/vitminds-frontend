import { Component, OnInit } from "@angular/core";
import { SubjectsService } from "src/app/shared/services/admin-services/subjects.service";
import { QuestionService } from "src/app/shared/services/admin-services/question.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Question } from "src/app/shared/models/question";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { TopicCategoryService } from "src/app/shared/services/admin-services/topic-category.service";

@Component({
  selector: "app-edit-question",
  templateUrl: "./edit-question.component.html",
  styleUrls: ["./edit-question.component.scss"],
  host: { class: "dashboard-content-container" },
})
export class EditQuestionComponent implements OnInit {
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
  constructor(
    private questionservice: QuestionService,
    private subject_service: SubjectsService,
    private topic_categoryservice: TopicCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  question;
  subjectlist = [];
  topic_category = [];
  optionArr = [];
  question_TYPE;
  ngOnInit() {
    let QID = this.route.params["value"].id;
    this.questionservice.get_singleQuestion(QID).subscribe((r) => {
      // console.log("response after single q ", r);
      if (r["message"] == "get question succesfully") {
        this.question = r["question"];
        this.question_TYPE = this.question.questionType;
        if (r["option_list"].length > 0) {
          this.optionArr = r["option_list"];
        } else {
          for (let i = 0; i < 4; i++) {
            let op = new Option();
            this.optionArr.push(op);
          }
        }
        // console.log("questio and option ", this.question, " ", this.optionArr);
      }
    });
    // this.questionservice.getOptionList(QID).subscribe(r => {
    //   // console.log("option list by q id ", r);
    // });
    this.subject_service.listOfSubjectForQuestion().subscribe((r) => {
      if (r["message"] == "subject list get succesfully") {
        this.subjectlist = r["subjects"];
        // console.log("response after subjectlist  ", r);
      }
    });
    this.topic_categoryservice.listCategoryForQuestion().subscribe((r) => {
      // console.log("response after get topic category list ", r);
      if (r["message"] == "category list getting successfully") {
        this.topic_category = r["topicCategories"];
      }
    });
  }

  checkPractice() {
    this.question.practice = !this.question.practice;
  }
  ques_status = false;
  save_question() {
    this.submitted = true;
    // console.log("question ", this.question);
    this.ques_status = true;
  }
  submitted = false;
  confirm() {
    // this.questionservice.saveQuestion(this.question).subscribe(r => {
    //   // console.log("response after save question ", r);
    //   if (r["message"] == "Question added/updated succesfully") {
    //     this.router.navigate(["/admin/question-list"]);
    //     this.ques_status = false;
    //   }
    // });

    this.questionservice.saveQuestion(this.question).subscribe((r) => {
      // console.log("response after save question ", r);
      if (r["message"] == "Question added/updated succesfully") {
        if (this.question.questionType != "objective") {
          this.question = new Question();
          this.router.navigate(["/admin/question-list"]);
        }
        this.ques_status = false;
        this.submitted = false;
        // console.log("q type ", this.question.questionType);
        if (this.question.questionType == "objective") {
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
  questionOptionPreview = false;
  optionarrayWithQid = [];
  saveOptions() {
    this.optionarrayWithQid.length = 0;
    // console.log("this.optionArray[i]", this.optionArr[i]);

    for (let i = 0; i < this.optionArr.length; i++) {
      // this.optionArr[i].question.id = this.question.id;
      console.log("this.optionArray[i]", this.optionArr[i]);
      this.optionarrayWithQid.push({
        ...this.optionArr[i],
        question: { id: this.question.id },
      });

      if (!this.optionArr[i].name) {
        return;
      }
      // console.log("**  ", this.optionArr[i]);
    }
    console.log("Optionarray==", this.optionarrayWithQid);

    this.questionOptionPreview = true;
  }
  optionsaveConfirm() {
    this.confirmOptions();
  }

  confirmOptions() {
    this.questionservice
      .saveOptionlist(this.optionarrayWithQid)
      .subscribe((r) => {
        // console.log("response after save options list ", r);
        if (r["message"] == "Options added succesfully") {
          this.navigateTo("Choose");
          this.optionArr = r["options"];
          this.questionOptionPreview = false;
          for (let op of this.optionArr) {
            this.mapRightOption[op.id] = false;
          }
        }
      });
  }

  rightOption = [];
  mapRightOption = new Map<number, boolean>();

  gotoOption() {
    this.questionOptionPreview = false;
    this.navigateTo("Options");
  }
  checkSign(id) {
    this.mapRightOption[id] = !this.mapRightOption[id];
  }

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
        id: this.question.id,
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
}
