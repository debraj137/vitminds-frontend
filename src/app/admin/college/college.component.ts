import { Component, OnInit } from "@angular/core";
import { CollegeService } from "src/app/shared/services/admin-services/college.service";
import { College } from "src/app/shared/models/college";
import { NgxSmartModalService } from "ngx-smart-modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { ParamServiceService } from "src/app/shared/services/admin-services/param-service.service";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-college",
  templateUrl: "./college.component.html",
  styleUrls: ["./college.component.scss"],
})
export class CollegeComponent implements OnInit {
  public saveCollegeForm: FormGroup;
  public submitted = false;

  //pagination
  config: any;

  constructor(
    private collegeService: CollegeService,
    public ngxSmartModalService: NgxSmartModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private paramService: ParamServiceService
  ) {
    this.getCollegeList();
    //this.pagination();
    this.saveForm();
  }

  college = new College();
  searchText: string;
  collegelist = [];
  totalElements: number = 0;

  ngOnInit() {
    this.getColleges({ page: "0", size: "10" });
    this.route.queryParams.subscribe((param) => {
      let queryParam = param;
      if (queryParam != null) {
        this.paramService.setParam(queryParam);
      }
    });
  }

  saveForm() {
    // Validation  part start
    const req = [Validators.compose([Validators.required])];
    this.saveCollegeForm = this.formBuilder.group({
      collegeName: ["", Validators.compose([...req])],
    });
    // Validation part end
  }

  get formValid() {
    return this.saveCollegeForm.controls;
  }

  saveCollege() {
    this.submitted = true;
    if (this.saveCollegeForm.invalid) {
      return;
    }
    this.collegeService.saveCollege(this.college).subscribe((data) => {
      console.log("response after batch list ", data);
      this.getCollegeList();
      this.ngxSmartModalService.getModal("myModal").close();
      this.toastr.success("Saved successfully!", "Your College !", {
        timeOut: 2000,
      });
    });
    this.saveCollegeForm.reset();
    this.submitted = false;
  }
  getCollegeList() {
    this.collegeService.listCollege().subscribe((data) => {
      console.log("data is retrieved", data);
      if (data["status"] == "success") {
        this.collegelist = data["college_list"];
        this.totalElements = data["Totalcollege"];
      }
    });
  }
  deleteCollege(college) {
    this.collegeService.deleteCollege(college).subscribe((data) => {
      if (data["message"] === "college deleted") {
        this.getCollegeList();
      }
    });
    this.toastr.success("Deleted successfully!", "Your College !", {
      timeOut: 2000,
    });
  }

  edit(college) {
    this.college.id = college.id;
    this.college.collegeName = college.collegeName;
    this.ngxSmartModalService.getModal("myModal").open();
  }

  // pagination() {
  //   //Create dummy data
  //   this.config = {
  //     itemsPerPage: 10,
  //     currentPage: 1,
  //     totalItems: this.collegelist.length,
  //   };
  // }
  // pageChanged(event) {
  //   this.config.currentPage = event;
  // }

  private getColleges(request) {
    this.collegeService.getlist(request).subscribe((data) => {
      if (data["status"] == "success") {
        this.collegelist = data["college_list"];
        this.totalElements = data["Totalcollege"];
      }
    });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request["page"] = event.pageIndex.toString();
    request["size"] = event.pageSize.toString();
    this.getColleges(request);
  }
}
