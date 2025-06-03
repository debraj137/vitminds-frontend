import { Component, OnInit } from "@angular/core";
import { ReportService } from "src/app/shared/services/admin-services/report.service";
import { CollegeService } from "src/app/shared/services/admin-services/college.service";
import { ActivatedRoute } from "@angular/router";
import { ParamServiceService } from "src/app/shared/services/admin-services/param-service.service";

@Component({
  selector: "app-admin-report",
  templateUrl: "./admin-report.component.html",
  styleUrls: ["./admin-report.component.scss"]
})
export class AdminReportComponent implements OnInit {
  public registeredStudentCount: number;
  public conductedExamCount: number;
  public collegeList = [];
  public collegeId: number;

  constructor(
    private reportService: ReportService,
    private collegeService: CollegeService,
    private route: ActivatedRoute,
    private paramService: ParamServiceService
  ) {}

  ngOnInit() {
    this.collegeId = 0;
    this.getReport(this.collegeId);
    this.getCollegeList();

    this.route.queryParams.subscribe(param => {
      let queryParam = param;
      if (queryParam != null) {
        this.paramService.setParam(queryParam);
      }
    });
  }

  getReport(collegeId) {
    this.reportService.getReport(collegeId).subscribe(r => {
      if (r["status"] === "success") {
        this.registeredStudentCount = r["registeredStudentCount"];
        this.conductedExamCount = r["conductedExamCount"];
      }
    });
  }

  getCollegeList() {
    this.collegeService.listCollege().subscribe(r => {
      if (r["status"] === "success") {
        this.collegeList = r["college_list"];
      }
    });
  }

  sortByCollege(event) {
    this.collegeId = event.target.value;
    if (this.collegeId != null && this.collegeId != 0) {
      this.getReport(this.collegeId);
    } else {
      this.getReport(this.collegeId);
    }
  }
}
