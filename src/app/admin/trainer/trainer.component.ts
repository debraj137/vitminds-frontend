import { Component, OnInit } from "@angular/core";
import { TrainerService } from "src/app/shared/services/admin-services/trainer.service";
import { User } from "src/app/shared/models/user";
import { NgxSmartModalService } from "ngx-smart-modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BatchService } from "src/app/shared/services/admin-services/batch.service";
import { Batch } from "src/app/shared/models/batch";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { ParamServiceService } from "src/app/shared/services/admin-services/param-service.service";
import Swal from "sweetalert2";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-trainer",
  templateUrl: "./trainer.component.html",
  styleUrls: ["./trainer.component.scss"],
})
export class TrainerComponent implements OnInit {
  //pagination
  config: any;

  constructor(
    private trainerService: TrainerService,
    private batchService: BatchService,
    private toaster: ToastrService,
    // private batchservice: BatchService,
    private fb: FormBuilder,
    public ngxSmartModalService: NgxSmartModalService,
    private route: ActivatedRoute,
    private paramService: ParamServiceService
  ) {
    this.createFormOne();
  }

  public trainerList: User[] = [];
  public trainer = new User();
  public batches: Batch[] = [];
  public searchText;
  public submitted = false;
  public count = 0;
  batchlist = [];
  totalElements: number = 0;
  listOfTrainer = [];

  ngOnInit() {
    this.getTrainers({ page: "0", size: "10" });
    this.route.queryParams.subscribe((param) => {
      let queryParam = param;
      if (queryParam != null) {
        this.paramService.setParam(queryParam);
      }
    });
    this.getTrainerList();
    //this.pagination();
  }

  public exam_form: FormGroup;
  get step1Form() {
    return this.exam_form.controls;
  }
  createFormOne() {
    const req = [Validators.compose([Validators.required])];
    this.exam_form = this.fb.group({
      Email: ["", Validators.compose([...req])],
      firstName: ["", Validators.compose([...req])],
      secondName: ["", Validators.compose([...req])],
      Qualification: ["", Validators.compose([...req])],
      Designation: ["", Validators.compose([...req])],
      mobileNumber: ["", Validators.compose([...req])],
      password: ["", Validators.compose([...req])],
    });
  }

  current_trainer = new User();
  trainerDetails(trainer) {
    console.log("mesage", this.batches);
    this.current_trainer = trainer;
    this.batchService.getBatchByTrainerId(trainer.userId).subscribe((data) => {
      if (data["status"] == "success") {
        this.batches = data["batchDetail"];
      }
      console.log("hello message", this.batches);
    });
    this.ngxSmartModalService.getModal("myModal2").open();
  }

  getTrainerList() {
    this.trainerService.trainerList().subscribe((r) => {
      if (r["message"] == "added succesfully") {
        this.trainerList = r["trainers"];
        // console.log("response aftter courselist ", r);
      }
    });
  }

  saveTrainer() {
    // console.log("course ", this.course);
    this.submitted = true;
    if (this.exam_form.invalid) {
      return;
    }
    this.trainer.organization = { id: 1 };
    this.trainer.description = "";
    this.trainer.adminLoginMaster.password = this.trainer.password;
    this.trainerService.saveTrainer(this.trainer).subscribe((r) => {
      // console.log("response after save course ", r);
      if (r["message"] == "added succesfully") {
        this.getTrainerList();
        this.submitted = false;
        this.trainer = new User();
        this.ngxSmartModalService.getModal("myModal").close();
      }
    });
  }
  delete(trainerId) {
    this.trainerService.deleteTrainer({ userId: trainerId }).subscribe((r) => {
      if (r["status"] === "success") {
        this.trainerList = this.trainerList.filter(
          (trainer) => trainer.userId != trainerId
        );
        this.toaster.success(r["message"]);
      } else if (r["status"] === "error") {
        this.toaster.success(r["message"]);
        //this.getTrainerList();
      } else {
        this.toaster.success(r["message"]);
      }
    });
  }

  changeStatus(id) {
    this.trainerService.changeStatus({ userId: id }).subscribe((r) => {
      // console.log("response after chnage sttaus ", r);
      if (r["status"] == "success") {
        this.getTrainerList();
      }
    });
  }

  private getTrainers(request) {
    this.trainerService.getTrainerList(request).subscribe((data) => {
      this.listOfTrainer = data["trainers"];
      this.totalElements = data["TotalTrainer"];
    });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request["page"] = event.pageIndex.toString();
    request["size"] = event.pageSize.toString();
    this.getTrainers(request);
  }

  // pagination() {
  //   this.config = {
  //     itemsPerPage: 10,
  //     currentPage: 1,
  //     totalPages: this.trainerList.length,
  //   };
  // }
  // pageChanged(event) {
  //   this.config.currentPage = event;
  // }
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
        console.log(result.value);

        this.delete(id);
      }
    });
  }
}
