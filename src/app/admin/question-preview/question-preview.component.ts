import { QuestionService } from "./../../shared/services/admin-services/question.service";
import { Component, OnInit } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { Router, ActivatedRoute } from "@angular/router";
import { SubjectsService } from "src/app/shared/services/admin-services/subjects.service";
import { TopicCategoryService } from "src/app/shared/services/admin-services/topic-category.service";

@Component({
  selector: "app-question-preview",
  templateUrl: "./question-preview.component.html",
  styleUrls: ["./question-preview.component.scss"]
})
export class QuestionPreviewComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: "5rem",
    maxHeight: "15rem",
    placeholder: "Enter text here...",
    translate: "no",
    sanitize: false,
    toolbarPosition: "top"
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
  questionId;
  optionArr = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subject_service: SubjectsService,
    private topic_categoryservice: TopicCategoryService,
    private questionservice: QuestionService
  ) {
    this.questionId = this.route.params["value"].id;
    // console.log("questionId ", this.questionId);
  }
  question;
  currentSort = "Question";
  question_TYPE;
  subjectId;
  subjectlist = [];
  topic_category = [];
  ngOnInit() {
    this.questionservice.get_singleQuestion(this.questionId).subscribe(r => {
      // console.log("rsponse after getting single q ", r);
      if (r["message"] == "get question succesfully") {
        this.question = r["question"];
        this.subjectId = this.question.subjectId;
        this.question_TYPE = this.question.questonType;
        this.optionArr = r["option_list"].length > 0 ? r["option_list"] : [];
      }
    });
    this.subject_service.subjetcList().subscribe(r => {
      if (r["message"] == "subject list get succesfully") {
        this.subjectlist = r["subjects"];
        // console.log("response after subjectlist  ", r);
      }
    });
    this.topic_categoryservice.listCategory().subscribe(r => {
      // console.log("response after get topic category list ", r);
      if (r["message"] == "category list getting successfully") {
        this.topic_category = r["topicCategories"];
      }
    });
  }

  // goBack() {
  //   this.router.navigate(["/admin/question-list"]);
  // }

  edit() {
    this.router.navigate(["/admin/edit-question/" + `${this.questionId}`]);
  }
  confirm() {
    this.router.navigate(["/admin/question-list"]);
  }
}
