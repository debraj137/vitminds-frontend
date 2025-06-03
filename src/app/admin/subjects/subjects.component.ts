import { Component, OnInit } from "@angular/core";
import { SubjectsService } from "src/app/shared/services/admin-services/subjects.service";
import { Subject } from "rxjs";
import { NgxSmartModalService } from "ngx-smart-modal";
import { CourseService } from "src/app/shared/services/admin-services/course.service";
import { ToastrService } from "ngx-toastr";
import { ParamServiceService } from "src/app/shared/services/admin-services/param-service.service";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-subjects",
  templateUrl: "./subjects.component.html",
  styleUrls: ["./subjects.component.scss"],
})
export class SubjectsComponent implements OnInit {
  public items = [];
  public searchText: string;
  public right;
  public submitted = false;
  //pagination
  config: any;
  totalElements: number = 0;
  listOfSubject = [];

  constructor(
    private subjects_service: SubjectsService,
    private courseService: CourseService,
    public ngxSmartModalService: NgxSmartModalService,
    private tostr: ToastrService,
    private paramService: ParamServiceService,
    private route: ActivatedRoute
  ) {}
  // public subject_list;
  ngOnInit() {
    // this.items = ["Windstorm", "Bombasto", "Magneta", "Tornado"];
    this.getsubjects({ page: "0", size: "10" });
    this.route.queryParams.subscribe((param) => {
      let queryParam = param;
      if (queryParam != null) {
        this.paramService.setParam(queryParam);
      }
    });
    this.subjectlist();
    // this.pagination();
    this.courselist();
  }
  public all_course = [];
  courselist = () => {
    this.courseService.courselist().subscribe((r) => {
      if (r["message"] == "added succesfully") {
        this.all_course = r["courses"];
        // console.log("response aftter courselist ", r);
      }
    });
  };
  subjectlist = () => {
    this.subjects_service.subjetcList().subscribe((r) => {
      if (r["message"] == "subject list get succesfully") {
        this.items = r["subjects"];
      }
    });
  };

  addSubject = () => {
    this.subject = "";
    this.subjectId = undefined;
    this.ngxSmartModalService.getModal("myModal").open();
  };
  public subject;

  saveSubject = () => {
    this.submitted = true;
    if (!this.subject) {
      console.log("invalid form");
      return;
    }

    this.subjects_service
      .saveSubject({
        id: this.subjectId,
        name: this.subject,
        organization: { id: 1 },
      })
      .subscribe((r) => {
        // console.log("response after save subject ", r);
        if (r["status"] == "success") {
          this.subjectlist();
          this.subject = undefined;
          this.subjectId = undefined;
          this.submitted = false;
          this.tostr.success(r["message"]);
          this.ngxSmartModalService.getModal("myModal").close();
        }
      });
  };
  public subjectId;
  editSubject = (sub) => {
    console.log("edit subject ", sub);
    this.subject = sub.name;
    this.subjectId = sub.id;
    this.ngxSmartModalService.getModal("myModal").open();
  };
  delete = (subject) => {
    // console.log("delete subject ", subject);
    let c_count = 0;
    for (let c of this.all_course) {
      if (c.subject.id == subject.id) {
        c_count++;
        // console.log("c_count ", c_count);
      }
    }
    if (c_count == 0) {
      this.subjects_service.delete(subject).subscribe((r) => {
        // console.log("response after delete ", r);
        this.tostr.success("Deleted successfully", "Your record", {
          timeOut: 2000,
        });
        this.subjectlist();
      });
    } else {
      // console.log("inside tostr");
      this.tostr.error(
        "you can't delete becoz this subject contain some courses..!!"
      );
    }
  };

  private getsubjects(request) {
    this.subjects_service.getSubjectList(request).subscribe((data) => {
      this.listOfSubject = data["subjects"];
      this.totalElements = data["TotalSubject"];
    });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request["page"] = event.pageIndex.toString();
    request["size"] = event.pageSize.toString();
    this.getsubjects(request);
  }

  // pagination() {
  //   this.config = {
  //     itemsPerPage: 10,
  //     currentPage: 1,
  //     totalItems: this.items.length,
  //   };
  // }
  // pageChanged(event) {
  //   this.config.currentPage = event;
  // }
  confirmModel(sub) {
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

        this.delete(sub);
      }
    });
  }
}
