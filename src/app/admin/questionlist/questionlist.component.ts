import { Component, OnInit } from "@angular/core";
import { QuestionService } from "src/app/shared/services/admin-services/question.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SubjectsService } from "src/app/shared/services/admin-services/subjects.service";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { NgxSmartModalService } from "ngx-smart-modal";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ParamServiceService } from "src/app/shared/services/admin-services/param-service.service";
import { IMAGE_BASE_URL } from "src/app/constant";
import Swal from "sweetalert2";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-questionlist",
  templateUrl: "./questionlist.component.html",
  styleUrls: ["./questionlist.component.scss"],
  // host: { class: "dashboard-content-container" }
})
export class QuestionlistComponent implements OnInit {
  uploadForm: FormGroup;
  submitted = false;
  //pagination
  config: any;
  public imageBaseUrl: string;

  constructor(
    private questionservice: QuestionService,
    private auth: AuthenticationService,
    private subject_service: SubjectsService,
    private router: Router,
    public ngxSmartModalService: NgxSmartModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private paramService: ParamServiceService
  ) {}

  public items = [];
  public searchText;
  public qFileFlag = false;
  public subjectlist = [];
  public user: any;
  public filterQuestions = [];
  question_TYPE;
  select_QTYPE = true;
  totalElements: number = 0;
  listOfQuestion = [];

  ngOnInit() {
    this.getQuestionList({ page: "0", size: "10" });
    this.uploadForm = this.formBuilder.group({
      subject: ["", Validators.required],
      file: ["", Validators.required],
    });
    this.imageBaseUrl = IMAGE_BASE_URL;
    this.subject_service.listOfSubjectForQuestion().subscribe((r) => {
      if (r["message"] == "subject list get succesfully") {
        this.subjectlist = r["subjects"];
        // console.log("response after subjectlist  ", r);
      }
    });
    this.AllQuestion();
    // this.pagination();

    this.route.queryParams.subscribe((param) => {
      let queryParam = param;
      if (queryParam != null) {
        this.paramService.setParam(queryParam);
      }
    });
  }

  get formValid() {
    return this.uploadForm.controls;
  }

  AllQuestion() {
    this.questionservice.questionlist().subscribe((r) => {
      // console.log("response after q list ", r);
      if (r["message"] == "list succesfully") {
        this.items = r["questions"];
        this.filterQuestions = this.items;
      }
    });
  }
  editFlag = false;
  edit(q) {
    this.router.navigate(["/admin/edit-question/" + `${q.id}`]);
    // this.questionservice.get_singleQuestion(q).subscribe(r => {
    //   console.log("response after single q ", r);
    //   this.editFlag = true;
    // });
  }
  preview(id) {
    this.router.navigate(["/admin/question/preview/" + `${id}`]);
  }
  delete(id) {
    this.questionservice.deleteQuestion(id).subscribe((r) => {
      if (r["message"] == "deleted succesfully") {
        this.toastr.success("Deleted successfully", "Your record", {
          timeOut: 2000,
        });
        this.AllQuestion();
      } else if (r["message"] == "This question associated with some exam") {
        this.toastr.success(
          "Can not delete this question, as it is  associated with some exam",
          "Your record",
          {
            timeOut: 2000,
          }
        );
      }
    });
  }
  public selectedFiles: FileList;
  selectFile(event) {
    this.selectedFiles = event.target.files;
    // console.log("selected Files ", this.selectedFiles[0]);
  }
  public subjectId;
  uploadQuestionSheet() {
    // Validation

    this.submitted = true;
    if (this.uploadForm.invalid) {
      return;
    }

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
          this.AllQuestion();
        }
      });

    this.toastr.success("Updated successfully !", "Your file", {
      timeOut: 1500,
    });
  }

  Q_TYPE(val) {
    this.select_QTYPE = false;
    this.question_TYPE = val;
    ///admin/question
    this.router.navigate(["admin/question/" + this.question_TYPE]);
  }
  addTestCase(qId) {
    this.router.navigate(["admin/test-case/" + `${qId}`]);
  }
  onSubmit() {}

  sortBySubject(event) {
    if (event.target.value === "All") {
      this.items = this.filterQuestions;
    } else {
      this.items = this.filterQuestions.filter(
        (item) => item.subject.id == event.target.value
      );
    }
  }

  private getQuestionList(request) {
    this.questionservice.getListOfQuestion(request).subscribe((data) => {
      this.listOfQuestion = data["questions"];
      this.totalElements = data["TotalQuestion"];
    });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request["page"] = event.pageIndex.toString();
    request["size"] = event.pageSize.toString();
    this.getQuestionList(request);
  }

  //pagination

  // pagination() {
  //   this.config = {
  //     itemsPerPage: 5,
  //     currentPage: 1,
  //     totalPages: this.items.length
  //   };
  // }
  // pageChanged(event) {
  //   this.config.currentPage = event;
  // }
  backQuestion() {
    this.qFileFlag = false;
  }
  download() {
    window.location.href = this.imageBaseUrl + "vitemindQ.xlsx";
    event.preventDefault();
  }
  confirmModel(id) {
    Swal.fire({
      title: "Are you sure?",
      width: 350,
      padding: ".5em",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        //
        console.log(result.value);

        this.delete(id);
        //
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    });
  }
}
