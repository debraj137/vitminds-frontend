import { Component, OnInit } from "@angular/core";
import { StudentService } from "src/app/shared/services/admin-services/student.service";
import { User } from "src/app/shared/models/user";
import { CollegeService } from "src/app/shared/services/admin-services/college.service";
import { ToastrService } from "ngx-toastr";
import { NgxSmartModalService } from "ngx-smart-modal";
import { ActivatedRoute, Router } from "@angular/router";
import { ParamServiceService } from "src/app/shared/services/admin-services/param-service.service";
import { Course } from "src/app/shared/models/course";
import { CourseService } from "src/app/shared/services/admin-services/course.service";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.scss"],
})
export class StudentListComponent implements OnInit {
  config: any;

  constructor(
    private studentService: StudentService,
    private collegeService: CollegeService,
    private courseService: CourseService,
    private toastr: ToastrService,
    public ngxSmartModalService: NgxSmartModalService,
    private route: ActivatedRoute,
    public router: Router,
    private paramService: ParamServiceService
  ) {}
  student = new User();
  public studentlist = [];
  public searchText;
  public collegeList = [];
  public additionalCharge;
  public discount;
  public courseId;
  public studentId: number;
  public studentDetail = new User();
  public courseFee = new Course();
  public submitted = false;

  totalElements: number = 0;
  listOfStudent = [];

  ngOnInit() {
    this.getListOfStudent({ page: "0", size: "10" });
    this.route.queryParams.subscribe((param) => {
      let queryParam = param;
      if (queryParam != null) {
        this.paramService.setParam(queryParam);
      }
    });
    this.getStudentList();
    // this.pagination();
    this.getCollegeList();
  }

  getCollegeList() {
    this.collegeService.getListOfCollege().subscribe((r) => {
      if (r["status"] === "success") {
        this.collegeList = r["college_list"];
      }
    });
  }

  getStudentList() {
    this.studentService.getAllStudentlist().subscribe((data) => {
      // console.log("data is retrieved", data);
      if (data["status"] == "success") {
        this.studentlist = data["students"];
      }
      // console.log("data stored in collegelist[]", this.studentlist);
    });
  }
  saveStudent = () => {
    this.submitted = true;
    if (
      !this.student.firstName ||
      !this.student.college.id ||
      !this.student.email ||
      !this.student.adminLoginMaster.password
    ) {
      return;
    }

    this.student.organization = {
      id: 1,
    };

    let invalid = false;

    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log("email ==", this.student.email);

    if (
      this.student.email != " " &&
      pattern.test(String(this.student.email).toLowerCase())
    ) {
      invalid = true;
    } else {
      this.toastr.error("Invalid Email");
      invalid = false;
    }

    if (invalid == true) {
      this.studentService.saveStudent(this.student).subscribe((r) => {
        if (r["status"] === "fail") {
          this.toastr.error(r["message"]);
          // this.saveStudent();
          //  this.ngxSmartModalService.getModal("myModal").open();
        } else if (r["status"] === "success") {
          this.student = new User();
          this.getStudentList();
          this.toastr.success(r["message"]);
          this.ngxSmartModalService.getModal("myModal").close();
        }
      });
      // this.ngxSmartModalService.close("myModal");
      this.student = new User();
    }
    this.submitted = false;
  };

  chnageStatus(id) {
    this.studentService.changeStatus({ userId: id }).subscribe((r) => {
      // console.log("response after change status ", r);
      if (r["status"] == "success") {
        this.getStudentList();
      }
    });
  }

  private getListOfStudent(request) {
    this.studentService.getStudentlist(request).subscribe((data) => {
      this.listOfStudent = data["students"];
      this.totalElements = data["TotalStudent"];
    });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request["page"] = event.pageIndex.toString();
    request["size"] = event.pageSize.toString();
    this.getListOfStudent(request);
  }

  // pagination() {
  //   this.config = {
  //     itemsPerPage: 10,
  //     currentPage: 1,
  //     totalItems: this.studentlist.length,
  //   };
  // }
  // pageChanged(event) {
  //   this.config.currentPage = event;
  // }

  public courseList = [];

  getCourseList() {
    this.courseService.courselist().subscribe((r) => {
      if (r["status"] === "success") {
        this.courseList = r["courses"];
      }
    });
  }

  getCourseIdOnChange(event) {
    this.courseId = event.target.value;
    this.courseService.getCourseFee({ id: this.courseId }).subscribe((r) => {
      if (r["status"] === "success") {
        this.courseFee = r["courseFee"];
      }
    });
  }

  enrollStudent(studentId) {
    this.router.navigate(["admin/enroll/" + `${studentId}`]);
  }
}
