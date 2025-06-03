import { QuestionService } from "src/app/shared/services/admin-services/question.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ExamService } from "src/app/shared/services/admin-services/exam.service";
import { SubjectsService } from "src/app/shared/services/admin-services/subjects.service";

@Component({
  selector: "app-assign-question",
  templateUrl: "./assign-question.component.html",
  styleUrls: ["./assign-question.component.scss"],
  host: { class: "dashboard-content-container" },
})
export class AssignQuestionComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examservice: ExamService,
    private subject_service: SubjectsService,
    private questionservice: QuestionService
  ) {}
  public items = [];
  public allQuestionlist = [];
  public addFlag = false;
  public qFileFlag = false;
  public searchText;
  public subjectlist = [];
  editFlag = false;
  public examId;
  ngOnInit() {
    // console.log("exam id ", this.route.params["value"].id);
    this.examId = this.route.params["value"].id;
    this.get_allAssignedQ();
    this.subject_service.listOfSubjectForQuestion().subscribe((r) => {
      if (r["message"] == "subject list get succesfully") {
        this.subjectlist = r["subjects"];
        // console.log("response after subjectlist  ", r);
      }
    });
  }

  get_allAssignedQ() {
    this.examservice
      .getQuestinlistByExamId(this.route.params["value"].id)
      .subscribe((r) => {
        // console.log("response after get q list by exam id ", r);
        if (r["status"] == "success") {
          this.items = r["examQuestionDetails"];
          // console.log("this.items ", this.items);
        }
      });
  }

  public checkMap = new Map<number, boolean>();
  checkMapFun(id) {
    this.checkMap[id] = !this.checkMap[id];
  }
  assignQ_Array = [];
  assignedQuestions() {
    // console.log("map ", this.checkMap);
    this.assignQ_Array.length = 0;
    for (let key in this.checkMap) {
      if (this.checkMap[key]) {
        for (let q of this.allQuestionlist) {
          if (q.id == key) {
            let q_f = {
              examQuestionId: {
                question: {
                  id: q.id,
                },
                exam: {
                  id: this.examId,
                },
              },
            };
            this.assignQ_Array.push(q_f);
          }
        }
      }
    }
    console.log("assignQ_Array  ", this.assignQ_Array);
    this.examservice
      .assignQuestions({ examQuestionDetails: this.assignQ_Array })
      .subscribe((r) => {
        // console.log("response after assign question ", r);
        if (r["message"] == "question assigned successfully") {
          this.addFlag = false;
          this.get_allAssignedQ();
        }
      });
  }

  addQuestion() {
    this.addFlag = true;
    let subjectId = this.route.params["value"].subId;
    this.questionservice.getQuestionsBySubject(subjectId).subscribe((r) => {
      // console.log("response after q list ", r);
      if (r["message"] == "list succesfully") {
        this.allQuestionlist = r["questions"];
        for (let q of this.allQuestionlist) {
          this.checkMap[q.id] = false;
        }
      }
    });
  }

  remove(id) {
    this.examservice.deleteExamQuestion(id, this.examId).subscribe((r) => {
      console.log("response after deleteExamQuestion ", r);
      this.get_allAssignedQ();
    });
  }

  public selectedFiles: FileList;
  selectFile(event) {
    this.selectedFiles = event.target.files;
    // console.log("selected Files ", this.selectedFiles[0]);
  }

  public user;
  public subjectId;
  uploadQuestionSheet() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    console.log("user ", this.user);

    // console.log("user ", user, localStorage.getItem("currentUser"));

    this.questionservice
      .pushFileToStorage({
        file: this.selectedFiles.item(0),
        subjectId: this.subjectId,
        submittedBy: this.user.userId,
      })
      .subscribe((r) => {
        // console.log("response after save q sheet ", r);
        if (r["message"] == "success") {
          this.qFileFlag = false;
          // this.AllQuestion();
          this.addQuestion();
        }
      });
  }

  goToQuestionDetail(questionId) {
    this.router.navigate(["/admin/question/preview/" + `${questionId}`]);
  }

  back() {
    this.router.navigate(["/admin/exam-list"]);
  }

  backTo() {
    this.addFlag = false;
  }

  backToQuestion() {
    this.qFileFlag = false;
  }
}
