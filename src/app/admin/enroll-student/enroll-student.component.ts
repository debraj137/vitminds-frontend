import { Component, OnInit } from "@angular/core";
import { StudentService } from "src/app/shared/services/admin-services/student.service";
import { CourseService } from "src/app/shared/services/admin-services/course.service";
import { User } from "src/app/shared/models/user";
import { Course } from "src/app/shared/models/course";
import { ActivatedRoute, Router } from "@angular/router";
import { BatchService } from "src/app/shared/services/admin-services/batch.service";
import { Invoice } from "src/app/shared/models/invoice";
import { InvoiceService } from "src/app/shared/services/admin-services/invoice.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-enroll-student",
  templateUrl: "./enroll-student.component.html",
  styleUrls: ["./enroll-student.component.scss"]
})
export class EnrollStudentComponent implements OnInit {
  public additionalCharge: number = 0;
  public discount: number = 0;
  public courseId: number;
  public batchId: number;
  public studentId: number;
  public totalAmount: number = 0;
  public paymentValue: number = 0;
  public paymentMode: string;
  public paymentModeId: number;
  // public paymentModeArr = ["Debit Card", "Credit Card", "UPI", "Paytm", "Cash"];
  public paymentModeArr = [];
  public studentDetail = new User();
  public courseFee = new Course();
  public invoice = new Invoice();
  public courseList = [];
  public batchList = [];
  myParseInt = parseInt;
  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private batchService: BatchService,
    private invoiceService: InvoiceService,
    private toastar: ToastrService
  ) {}

  ngOnInit() {
    this.studentId = this.route.params["value"].id;
    this.enrollStudent(this.studentId);
    console.log("studentId==", this.studentId);
  }

  getCourseList() {
    this.courseService.courselist().subscribe(r => {
      if (r["status"] === "success") {
        this.courseList = r["courses"];
      }
    });
  }
  findBatchList() {
    this.batchService.getBatchList().subscribe(r => {
      if (r["status"] === "success") {
        this.batchList = r["batchlist"];
      }
    });
  }

  getPaymentModeList() {
    this.invoiceService.getPaymentMode("PaymentMode").subscribe(r => {
      if (r["status"] === "success") {
        this.paymentModeArr = r["lookUp"];
      }
    });
  }

  getCourseIdOnChange(event) {
    this.courseId = event.target.value;
    this.courseService.getCourseFee({ id: this.courseId }).subscribe(r => {
      if (r["status"] === "success") {
        this.courseFee = r["courseFee"];
        this.totalAmount = Number(this.courseFee.fees);
      }
    });
  }

  getBatchIdOnChange(event) {
    this.batchId = event.target.value;
    console.log("batchId == ", this.batchId);
  }

  getLookUpIdOnChange(event) {
    this.paymentModeId = event.target.value;
  }

  calculateTotalAmount() {
    this.totalAmount += this.additionalCharge - this.discount;
  }

  public fullName: string;
  enrollStudent(studentId) {
    console.log("student Id== ", studentId);
    this.getCourseList();
    this.findBatchList();
    this.getPaymentModeList();

    this.studentService.getSingleStudent({ userId: studentId }).subscribe(r => {
      if (r["status"] === "success") {
        this.studentDetail = r["student"];
        this.fullName =
          this.studentDetail.firstName + " " + this.studentDetail.seccondName;
      }
    });
  }

  createEnroll() {
    this.invoice.user.userId = this.studentId;
    this.invoice.course.id = this.courseId;
    this.invoice.batch.id = this.batchId;
    this.invoice.additionalCharges = this.additionalCharge;
    this.invoice.discount = this.discount;
    this.invoice.total = this.totalAmount;
    this.invoice.paymentValue = this.paymentValue;
    this.invoice.lookUp.id = this.paymentModeId;
    this.invoiceService.makeInvoice(this.invoice).subscribe(r => {
      if (r["status"] === "success") {
        this.toastar.success("Invoice Created Successfully");
        this.router.navigate(["/admin/invoice-list"]);
      }
    });
  }

  additionalChargeHandler() {
    this.totalAmount =
      +this.courseFee.fees + +this.additionalCharge - this.discount;
  }
}
