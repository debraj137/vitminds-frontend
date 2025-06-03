import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";

import { Course } from "src/app/shared/models/course";
import { SubjectsService } from "src/app/shared/services/admin-services/subjects.service";
import { CourseService } from "src/app/shared/services/admin-services/course.service";
import { NgxSmartModalService } from "ngx-smart-modal";
import { CommonExamService } from "src/app/shared/services/common-services/common-exam.service";
import { ActivatedRoute } from "@angular/router";
import { ParamServiceService } from "src/app/shared/services/admin-services/param-service.service";
import Swal from "sweetalert2";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
  host: { class: "dashboard-content-container" },
})
export class CoursesComponent implements OnInit {
  //pagination
  config: any;

  constructor(
    private courseService: CourseService,
    private paramService: ParamServiceService,
    private examservice: CommonExamService,
    private tostr: ToastrService,
    private subject_service: SubjectsService,
    public ngxSmartModalService: NgxSmartModalService,
    private route: ActivatedRoute
  ) {}
  items = [];
  subjectlist = [];
  examList = [];
  public filterCourse = [];
  course = new Course();
  public searchText;
  public submitted = false;
  totalElements: number = 0;
  listOfCourse = [];

  ngOnInit() {
    this.getCourses({ page: "0", size: "10" });
    this.route.queryParams.subscribe((param) => {
      let queryParam = param;
      if (queryParam != null) {
        this.paramService.setParam(queryParam);
      }
    });
    this.getSubjectList();
    this.courselist();
    //this.pagination();
    this.examlist();
  }
  examlist = () => {
    this.examservice.all_exam_list().subscribe((r) => {
      // console.log("response after getting examlist ", r);
      if (r["status"] == "success") {
        this.examList = r["exams"];
      }
    });
  };
  courselist = () => {
    this.courseService.courselist().subscribe((r) => {
      if (r["message"] == "added succesfully") {
        this.items = r["courses"];
        this.filterCourse = this.items;

        // console.log("response aftter courselist ", r);
      }
    });
  };

  addCourse = () => {
    this.course = new Course();
    this.ngxSmartModalService.getModal("myModal").open();
  };

  saveCourse = () => {
    // console.log("course ", this.course);
    this.submitted = true;
    if (
      !this.course.name ||
      !this.course.subject.id ||
      !this.course.description ||
      !this.course.fees
    ) {
      return;
    }
    this.course.organization = { id: 1 };
    this.courseService.saveCourse(this.course).subscribe((r) => {
      // console.log("response after save course ", r);
      if ((r["status"] = "success")) {
        this.courselist();
        this.submitted = false;
        this.course = new Course();
        this.tostr.success(r["message"]);
        this.ngxSmartModalService.getModal("myModal").close();
      }
    });
  };

  editCourse = (course) => {
    this.course = course;
    this.ngxSmartModalService.getModal("myModal").open();
  };

  delete = (course) => {
    let e_count = 0;
    // for (let e of this.examList) {
    //   if (e.course.id == course.id) {
    //     e_count++;
    //     // console.log("e_count ", e_count);
    //   }
    // }
    // if (e_count == 0) {
    this.courseService.delete({ id: course.id }).subscribe((r) => {
      // console.log("response after delete course ", r);
      if (r["status"] === "success") {
        this.tostr.success(r["message"]);
        this.courselist();
      } else if (r["status"] === "error") {
        this.tostr.success(r["message"]);
      } else {
        this.tostr.success(r["message"]);
      }
    });
    // } else {
    //   this.tostr.error(
    //     "you can't delete becoz this course contains some exam...!!"
    //   );
    // }
  };

  getSubjectList = () => {
    this.subject_service.listOfSubjectForQuestion().subscribe((r) => {
      if (r["message"] == "subject list get succesfully") {
        this.subjectlist = r["subjects"];
        // console.log("response after subjectlist  ", r);
      }
    });
  };

  sortBySubject(event) {
    if (event.target.value === "All") {
      this.items = this.filterCourse;
    } else {
      this.items = this.filterCourse.filter(
        (item) => item.subject.id == event.target.value
      );
    }
  }

  private getCourses(request) {
    this.courseService.getCourseList(request).subscribe((data) => {
      this.listOfCourse = data["courses"];
      this.totalElements = data["TotalCourses"];
    });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request["page"] = event.pageIndex.toString();
    request["size"] = event.pageSize.toString();
    this.getCourses(request);
  }

  confirmModel(course) {
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

        this.delete(course);
      }
    });
  }
}
