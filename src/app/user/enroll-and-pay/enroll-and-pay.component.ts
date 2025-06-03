import { Component, OnInit, SystemJsNgModuleLoaderConfig } from "@angular/core";
import { CourseService } from "src/app/shared/services/admin-services/course.service";
import { Course } from "src/app/shared/models/course";
import { InvoiceService } from "src/app/shared/services/admin-services/invoice.service";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { User } from "src/app/shared/models/user";
import { Invoice } from "src/app/shared/models/invoice";
import { Router } from "@angular/router";

@Component({
  selector: "app-enroll-and-pay",
  templateUrl: "./enroll-and-pay.component.html",
  styleUrls: ["./enroll-and-pay.component.scss"],
})
export class EnrollAndPayComponent implements OnInit {
  public courseList = [];
  public courseId: number;
  public courseFee = new Course();
  public totalAmount: number;
  public paymentModeArr = [];
  public paymentModeId: number;
  public user = new User();
  public invoice = new Invoice();
  constructor(
    private courseService: CourseService,
    private invoiceService: InvoiceService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe((u) => {
      if (u != null) {
        this.user = u;
      }
    });
    this.getCourseList();
    this.getPaymentModeList();
  }

  getCourseList() {
    this.courseService.getCourseListForExam().subscribe((r) => {
      if (r["status"] === "success") {
        this.courseList = r["selectcourseforexam"];
      }
    });
  }

  getCourseIdOnChange(event) {
    this.courseId = event.target.value;
    this.courseService.getCourseFee({ id: this.courseId }).subscribe((r) => {
      if (r["status"] === "success") {
        this.courseFee = r["courseFee"];
        this.totalAmount = Number(this.courseFee.fees);
      }
    });
  }

  getPaymentModeList() {
    this.invoiceService.getPaymentMode("PaymentMode").subscribe((r) => {
      if (r["status"] === "success") {
        this.paymentModeArr = r["lookUp"];
      }
    });
  }

  getLookUpIdOnChange(event) {
    this.paymentModeId = event.target.value;
  }

  public values;
  public action;
  createEnroll() {
    this.invoice.user.userId = this.user.userId;
    this.invoice.course.id = this.courseId;
    this.invoice.paymentValue = this.courseFee.fees;
    this.invoice.lookUp.id = this.paymentModeId;
    this.invoiceService.saveOnlineEnroll(this.invoice).subscribe((r) => {
      if (r["status"] === "success") {
        this.values = r["values"];
        this.action = this.values.action;
        // window.location.href = this.action;
        window.open(this.action, "_blank");
      }
    });
  }
}
