import { Component, OnInit } from "@angular/core";
import { CommonExamService } from "src/app/shared/services/common-services/common-exam.service";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSmartModalService } from "ngx-smart-modal";
import { Exam } from "src/app/shared/models/exam";
import { CourseService } from "src/app/shared/services/admin-services/course.service";
import { AmazingTimePickerService } from "amazing-time-picker";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { ExamService } from "src/app/shared/services/admin-services/exam.service";
import { BatchService } from "src/app/shared/services/admin-services/batch.service";
import { ToastrService } from "ngx-toastr";
import { SubjectsService } from "src/app/shared/services/admin-services/subjects.service";
import { ParamServiceService } from "src/app/shared/services/admin-services/param-service.service";
import Swal from "sweetalert2";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-exam-list",
  templateUrl: "./exam-list.component.html",
  styleUrls: ["./exam-list.component.scss"],
  //host: { class: "dashboard-content-container" }
})
export class ExamListComponent implements OnInit {
  public exam_form: FormGroup;
  public exam_token_form: FormGroup;
  coursesList = [];
  public batchList = [];
  public subjectlist = [];
  //pagination
  config: any;

  constructor(
    private commonexamservice: CommonExamService,
    private examservice: ExamService,
    private atp: AmazingTimePickerService,
    private courseService: CourseService,
    private auth: AuthenticationService,
    private batchService: BatchService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private subject_service: SubjectsService,
    public ngxSmartModalService: NgxSmartModalService,
    private route: ActivatedRoute,
    private paramService: ParamServiceService
  ) {
    this.createFormOne();
  }
  items = [];
  exam = new Exam();
  public submitted = false;
  public searchText;
  editFlag = false;
  totalElements: number = 0;
  listOfExam = [];

  ngOnInit() {
    this.getExams({ page: "0", size: "10" });
    this.route.queryParams.subscribe((param) => {
      let queryParam = param;
      if (queryParam != null) {
        this.paramService.setParam(queryParam);
      }
    });
    this.examlist();
    // this.pagination();
    this.courselist();
    this.findBatchList();
    this.subjectList();
  }

  get step1Form() {
    return this.exam_form.controls;
  }

  // get tokenForm() {
  //   return this.exam_token_form.controls;
  // }

  createFormOne() {
    const req = [Validators.compose([Validators.required])];
    this.exam_form = this.fb.group({
      name: ["", Validators.compose([...req])],
      course: ["", Validators.compose([...req])],
      examDate: ["", Validators.compose([...req])],
      examTime: ["", Validators.compose([...req])],
      duration: ["", Validators.compose([...req])],
      max_marks: ["", Validators.compose([...req])],
      passing_marks: ["", Validators.compose([...req])],
    });
  }

  public filteredExamList = [];
  examlist() {
    this.commonexamservice.all_exam_list().subscribe((r) => {
      // console.log("response after getting examlist ", r);
      if (r["status"] == "success") {
        this.items = r["exams"];
        this.filteredExamList = this.items;
      }
    });
  }

  subjectList() {
    this.subject_service.subjetcList().subscribe((r) => {
      if (r["message"] == "subject list get succesfully") {
        this.subjectlist = r["subjects"];
        // console.log("response after subjectlist  ", r);
      }
    });
  }

  sortBySubject(event) {
    if (event.target.value === "All") {
      this.items = this.filteredExamList;
    } else {
      this.items = this.filteredExamList.filter(
        (exam) => exam.course.subject.id == event.target.value
      );
    }
  }

  public examData;
  examClone(examId) {
    this.examservice.getExamById({ id: examId }).subscribe((r) => {
      if (r["status"] === "success") {
        this.examData = r["exam"];
        this.exam.batch.id = this.examData.batch.id;
        this.exam.course.id = this.examData.course.id;
        this.exam.trainer.userId = this.examData.trainerId;
        this.exam.date = this.examData.date;
        this.exam.duration = this.examData.duration;
        this.exam.startTime = this.examData.startTime;
        this.exam.maxmarks = this.examData.maxmarks;
        this.exam.passmarks = this.examData.passmarks;
        this.exam.name = this.examData.name;
        this.examservice.cloneExam(this.exam, examId).subscribe((r) => {
          if (r["status"] === "success") {
            this.toastr.success(r["message"]);
            this.examlist();
          }
        });
      }
    });
  }

  edit(exam) {
    this.router.navigate(["/admin/edit-exam/" + `${exam.id}`]);
    // exam.trainer = { userId: this.auth.c_user.userId };
    // this.examservice.edit(exam).subscribe(r => {
    //   console.log("response after getting exam by id", r);
    // });
  }
  delete(exam) {
    // this.auth.currentUser.subscribe(u => {
    //   exam.trainer = u;
    // });
    this.examservice.delete({ id: exam.id }).subscribe((r) => {
      // console.log("response after delete exam ", r);
      if (r["message"] == "success") {
        this.examlist();
        this.toastr.success("Deleted successfully", "Your record", {
          timeOut: 2000,
        });
      }
    });
  }

  assignQuestion(exam) {
    console.log("subject id", exam.course.subject.id);

    this.router.navigate([
      "/admin/assign_question/" +
        `${exam.id}` +
        "/subject/" +
        `${exam.course.subject.id}`,
    ]);
  }

  courselist() {
    this.courseService.getCourseListForExam().subscribe((r) => {
      if (r["message"] == "added succesfully") {
        this.coursesList = r["selectcourseforexam"];
        // console.log("response aftter courselist ", r);
      }
    });
  }

  findBatchList() {
    this.batchService.getBatchList().subscribe((r) => {
      if (r["status"] === "success") {
        this.batchList = r["batchlist"];
      }
    });
  }

  saveExam() {
    // console.log("exam object ", this.exam);
    this.submitted = true;
    if (this.exam_form.invalid) {
      console.log("form invalid ", this.submitted, this.step1Form.name.errors);
      return;
    }

    this.exam.trainer = this.auth.currentUserValue;
    // this.exam.startTime = this.exam.startTime + ":00";
    console.log("this.exam.startTime", this.exam.startTime);
    let tm = moment(this.exam.startTime).format("hh:mm:ss a");

    let ttt = new Date(this.exam.startTime);
    let myVar = "";
    myVar += ttt.getHours() + ":" + ttt.getMinutes() + ":" + ttt.getSeconds();
    console.log("myVar", myVar);
    this.exam.startTime = myVar;
    console.log(
      "i m outside if condition..............",
      new Date(this.exam.startTime).getTime()
    );

    this.examservice.saveExam(this.exam).subscribe((r) => {
      // console.log("response after save exam ", r);
      if (r["message"] == "exam saved successfully") {
        // this.router.navigate(["/admin/exam-list"]);
        this.examlist();
        this.ngxSmartModalService.getModal("myModal").close();
        this.exam = new Exam();
      }
    });
  }
  assignBatch(id) {
    this.router.navigate(["admin/assign_batch/" + `${id}`]);
  }

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe((time) => {
      console.log(time);
    });
  }

  public examToken: string;
  public exId: number;
  openExamTokenModal(examId) {
    this.exId = examId;
    console.log("ex id ", this.exId);

    this.ngxSmartModalService.getModal("myTokenModal").open();
    // this.exam.examToken = this.examToken;
  }
  createExamToken() {
    this.exam.id = this.exId;
    this.exam.examToken = this.examToken;
    this.examservice.generateToken(this.exam).subscribe((r) => {
      if (r["status"] === "success") {
        this.ngxSmartModalService.getModal("myTokenModal").close();
        this.examToken = "";
        this.toastr.success(r["message"], "", {
          timeOut: 2000,
          closeButton: true,
        });
        this.examlist();
      }
    });
  }

  private getExams(request) {
    this.examservice.getExamList(request).subscribe((data) => {
      this.listOfExam = data["exams"];
      this.totalElements = data["TotalNumberOfExam"];
    });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request["page"] = event.pageIndex.toString();
    request["size"] = event.pageSize.toString();
    this.getExams(request);
  }

  // pagination() {
  //   this.config = {
  //     itemsPerPage: 10,
  //     currentPage: 1,
  //     totalPages: this.items.length,
  //   };
  // }
  // pageChanged(event) {
  //   this.config.currentPage = event;
  // }
  confirmModel(exam) {
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
        console.log(result.value);

        this.delete(exam);
      }
    });
  }
}
