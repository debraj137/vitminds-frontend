import { BatchService } from "./../../shared/services/admin-services/batch.service";
import { Component, OnInit } from "@angular/core";
import { Batch } from "src/app/shared/models/batch";
import { CourseService } from "src/app/shared/services/admin-services/course.service";
import { TrainerService } from "src/app/shared/services/admin-services/trainer.service";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { NgxSmartModalService } from "ngx-smart-modal";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ParamServiceService } from "src/app/shared/services/admin-services/param-service.service";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-batch",
  templateUrl: "./batch.component.html",
  styleUrls: ["./batch.component.scss"],
  host: { class: "dashboard-content-container" },
})
export class BatchComponent implements OnInit {
  //pagiantion
  config: any;

  constructor(
    private batchservice: BatchService,
    private courseservice: CourseService,
    private trainerservice: TrainerService,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    public ngxSmartModalService: NgxSmartModalService,
    private route: ActivatedRoute,
    private paramService: ParamServiceService
  ) {
    this.createFormOne();
  }
  items = [];
  batch = new Batch();
  batchlist = [];
  courselist = [];
  tarinerlist = [];
  lookuplist = [];
  public searchText = "";
  public submitted = false;
  listOfbatches = [];
  totalElements: number = 0;

  ngOnInit() {
    // console.log("user ", this.auth.currentUserValue);
    this.getBatches({ page: "0", size: "10" });
    this.batchList();
    //this.pagination();
    this.trainerservice.getListOfTrainer().subscribe((r) => {
      // console.log("response after getting trainer list ", r);
      if (r["message"] == "added succesfully") {
        this.tarinerlist = r["trainers"];
        // console.log("trainerlist ", this.tarinerlist);
      }
    });
    this.batchservice.lookuplist().subscribe((r) => {
      // console.log("response after get lookup list ", r);
      if (r["message"] == "added succesfully") {
        this.lookuplist = r["lookUp"];
      }
    });
    this.courseservice.getCourseListForExam().subscribe((r) => {
      // console.log("rsponse after getting courselist ", r);
      if (r["message"] == "added succesfully") {
        this.courselist = r["selectcourseforexam"];
      }
    });

    this.route.queryParams.subscribe((param) => {
      let queryParam = param;
      if (queryParam != null) {
        this.paramService.setParam(queryParam);
      }
    });
  }

  public exam_form: FormGroup;
  get step1Form() {
    return this.exam_form.controls;
  }
  createFormOne() {
    const req = [Validators.compose([Validators.required])];
    this.exam_form = this.fb.group({
      trainerId: ["", Validators.compose([...req])],
      courseId: ["", Validators.compose([...req])],
      duration: ["", Validators.compose([...req])],
      durationType: ["", Validators.compose([...req])],
      batchName: ["", Validators.compose([...req])],
      batchCode: ["", Validators.compose([...req])],
      description: ["", Validators.compose([...req])],
    });
  }

  batchList() {
    this.batchservice.batchlist().subscribe((r) => {
      // console.log("response after batch list ", r);
      if (r["message"] === "added succesfully") {
        this.batchlist = r["batch"];
      }
    });
  }
  saveBatch() {
    this.submitted = true;
    if (this.exam_form.invalid) {
      return;
    }
    // this.batch.trainer = this.auth.c_user;
    this.batchservice.saveBatch(this.batch).subscribe((r) => {
      if (r["message"] === "added succesfully") {
        this.batchList();
        this.submitted = false;
        this.batch = new Batch();
        this.ngxSmartModalService.getModal("myModal").close();
      }
    });
  }
  edit(batch) {
    console.log("batch before edit ", batch);
  }
  delete(batch) {
    console.log("batch before delete ", batch);
  }
  assignExam(batch) {
    this.router.navigate(["admin/assign_exam/" + `${batch.id}`]);
  }
  assignStudent(batch) {
    this.router.navigate(["admin/assign_student/" + `${batch.id}`]);
  }

  private getBatches(request) {
    this.batchservice.getlistofbatch(request).subscribe((data) => {
      this.listOfbatches = data["batch"];
      this.totalElements = data["TotalBatches"];
    });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request["page"] = event.pageIndex.toString();
    request["size"] = event.pageSize.toString();
    this.getBatches(request);
  }

  // pagination() {
  //   this.config = {
  //     itemsPerPage: 10,
  //     currentPage: 1,
  //     totalPages: this.batchlist.length,
  //   };
  // }
  // pageChanged(event) {
  //   this.config.currentPage = event;
  // }
}
