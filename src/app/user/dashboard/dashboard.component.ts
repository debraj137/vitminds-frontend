import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from "@angular/core";
import * as CanvasJS from "../../../assets/canvas/canvasjs.min";
import Chart from "chart.js";
import { ExamService } from "src/app/shared/services/end-user-services/exam.service";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { FormControl } from "@angular/forms";
import { MomentDateTimeAdapter } from "ng-pick-datetime-moment";
import {
  OwlDateTimeComponent,
  DateTimeAdapter,
  OWL_DATE_TIME_FORMATS,
  OWL_DATE_TIME_LOCALE,
  OwlDateTimeFormats
} from "ng-pick-datetime";
import * as _moment from "moment";
// import * as moment from "moment";
import { Moment } from "moment";

const moment = (_moment as any).default ? (_moment as any).default : _moment;

export const MY_MOMENT_DATE_TIME_FORMATS: OwlDateTimeFormats = {
  parseInput: "MM/YYYY",
  fullPickerInput: "l LT",
  datePickerInput: "MM/YYYY",
  timePickerInput: "LT",
  monthYearLabel: "MMM YYYY",
  dateA11yLabel: "LL",
  monthYearA11yLabel: "MMMM YYYY"
};

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],

  host: { class: "dashboard-content-container" },
  providers: [
    // `MomentDateTimeAdapter` and `OWL_MOMENT_DATE_TIME_FORMATS` can be automatically provided by importing
    // `OwlMomentDateTimeModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateTimeAdapter,
      useClass: MomentDateTimeAdapter,
      deps: [OWL_DATE_TIME_LOCALE]
    },

    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS }
  ]
})
export class DashboardComponent implements OnInit {
  @ViewChild("myChart", { static: false }) myChart: ElementRef;
  @ViewChild("myChartSix", { static: false }) myChartSix: ElementRef;
  @ViewChild("myChartMonth", { static: false }) myChartMonth: ElementRef;

  public user;
  public examReports = [];
  public examScore = [];
  public sixMonthExamScore = [];
  public sixMonthExamMonth = [];
  public examWeek = [];
  public sixMonthReports = [];
  public selectedMonth;
  public monthlyExamReport = [];
  public monthlyExamScore = [];
  public monthchartFlag = false;
  public date = new FormControl(moment());
  public optionReport = ["This Month", "Last 6 Months", "This Year"];
  constructor(
    private examService: ExamService,
    private auth: AuthenticationService //private dateAdapter: DateTimeAdapter
  ) {
    this.auth.currentUser.subscribe(u => {
      if (u != null) {
        this.user = u;
      }
    });
  }

  ngOnInit() {
    //this.ExamReport();
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: OwlDateTimeComponent<Moment>
  ) {
    const ctrlValue = this.date.value;
    console.log(ctrlValue);
    this.selectedMonth = normalizedMonth.format("YYYY-MM-DD");
    console.log("selectedMonth== ", this.selectedMonth);
    this.monthlyExamReport.length = 0;
    this.monthlyExamScore.length = 0;
    //this.monthchartFlag = true;
    this.getExamReportBySelectedMonth(this.selectedMonth);

    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  ngAfterViewInit() {
    this.monthchartFlag = false;
    this.examService.getExamReport(this.user.userId).subscribe(r => {
      if (r["status"] === "success") {
        this.examReports = r["examReports"];
        this.sixMonthReports.length = 0;
        this.examScore.length = 0;
        this.sixMonthExamScore.length = 0;
        this.sixMonthExamMonth.length = 0;
        for (let i = 0; i < this.examReports.length; i++) {
          this.examScore.push(this.examReports[i].totalScore);
          this.examWeek.push(this.examReports[i].weekNumber);
        }
        console.log("exam score== ", this.examScore);
      }

      var ctx = this.myChart.nativeElement.getContext("2d");
      var chart = new Chart(ctx, {
        type: "line",

        // The data for our dataset
        data: {
          labels: ["1st Week", "2nd Week", "3rd Week", "4th Week", "5th Week"],
          // Information about the dataset
          datasets: [
            {
              label: "Mark",
              backgroundColor: "rgba(42,65,232,0.08)",
              borderColor: "#2a41e8",
              borderWidth: "3",
              data: this.examScore,
              pointRadius: 5,
              pointHoverRadius: 5,
              pointHitRadius: 10,
              pointBackgroundColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointBorderWidth: "2"
            }
          ]
        },

        // Configuration options
        options: {
          layout: {
            padding: 10
          },

          legend: { display: false },
          title: { display: false },

          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: false
                },
                gridLines: {
                  borderDash: [6, 10],
                  color: "#d8d8d8",
                  lineWidth: 1
                },
                ticks: {
                  beginAtZero: true
                }
              }
            ],
            xAxes: [
              {
                scaleLabel: { display: false },
                gridLines: { display: false }
              }
            ]
          },

          tooltips: {
            backgroundColor: "#333",
            titleFontSize: 13,
            titleFontColor: "#fff",
            bodyFontColor: "#fff",
            bodyFontSize: 13,
            displayColors: false,
            xPadding: 10,
            yPadding: 10,
            intersect: false
          }
        }
      });
    });
  }

  public chartFlag = false;
  changeOption(event) {
    console.log(event.target.value);
    this.chartFlag = true;
    this.monthchartFlag = false;
    if ("Last 6 Months" === event.target.value) {
      this.examService.getExamReport(this.user.userId).subscribe(r => {
        if (r["status"] === "success") {
          this.sixMonthReports = r["monthlyExamReports"];
          this.examReports.length = 0;
          this.examScore.length = 0;
          this.sixMonthExamScore.length = 0;
          this.sixMonthExamMonth.length = 0;
          for (let i = 0; i < this.sixMonthReports.length; i++) {
            this.sixMonthExamScore.push(this.sixMonthReports[i].totalMarks);
            this.sixMonthExamMonth.push(this.sixMonthReports[i].month);
          }

          console.log("six month exam score == ", this.sixMonthExamScore);
        }
        var ctxx = this.myChartSix.nativeElement.getContext("2d");
        var chart = new Chart(ctxx, {
          type: "line",

          // The data for our dataset
          data: {
            labels: this.sixMonthExamMonth,
            // Information about the dataset
            datasets: [
              {
                label: "Mark",
                backgroundColor: "rgba(42,65,232,0.08)",
                borderColor: "#2a41e8",
                borderWidth: "3",
                data: this.sixMonthExamScore,
                pointRadius: 5,
                pointHoverRadius: 5,
                pointHitRadius: 10,
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointBorderWidth: "2"
              }
            ]
          },

          // Configuration options
          options: {
            layout: {
              padding: 10
            },

            legend: { display: false },
            title: { display: false },

            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false
                  },
                  gridLines: {
                    borderDash: [6, 10],
                    color: "#d8d8d8",
                    lineWidth: 1
                  },
                  ticks: {
                    beginAtZero: true
                  }
                }
              ],
              xAxes: [
                {
                  scaleLabel: { display: false },
                  gridLines: { display: false }
                }
              ]
            },

            tooltips: {
              backgroundColor: "#333",
              titleFontSize: 13,
              titleFontColor: "#fff",
              bodyFontColor: "#fff",
              bodyFontSize: 13,
              displayColors: false,
              xPadding: 10,
              yPadding: 10,
              intersect: false
            }
          }
        });
      });
    } else {
      this.chartFlag = false;
      this.monthchartFlag = false;
      this.ngAfterViewInit();
    }
  }

  getExamReportBySelectedMonth(selectedMonth) {
    this.monthchartFlag = true;
    this.chartFlag = false;

    this.examService
      .getExamReportByMonth(this.user.userId, selectedMonth)
      .subscribe(r => {
        if (r["status"] === "success") {
          this.monthlyExamReport = r["selectedMonthReport"];
          for (let i = 0; i < this.monthlyExamReport.length; i++) {
            this.monthlyExamScore.push(this.monthlyExamReport[i].totalScore);
            //this.examWeek.push(this.exa mReports[i].weekNumber);
          }
          console.log("month exam score== ", this.monthlyExamScore);
        }

        var ct = this.myChartMonth.nativeElement.getContext("2d");
        var chart = new Chart(ct, {
          type: "line",

          // The data for our dataset
          data: {
            labels: [
              "1st Week",
              "2nd Week",
              "3rd Week",
              "4th Week",
              "5th Week"
            ],
            // Information about the dataset
            datasets: [
              {
                label: "Mark",
                backgroundColor: "rgba(42,65,232,0.08)",
                borderColor: "#2a41e8",
                borderWidth: "3",
                data: this.monthlyExamScore,
                pointRadius: 5,
                pointHoverRadius: 5,
                pointHitRadius: 10,
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointBorderWidth: "2"
              }
            ]
          },

          // Configuration options
          options: {
            layout: {
              padding: 10
            },

            legend: { display: false },
            title: { display: false },

            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false
                  },
                  gridLines: {
                    borderDash: [6, 10],
                    color: "#d8d8d8",
                    lineWidth: 1
                  },
                  ticks: {
                    beginAtZero: true
                  }
                }
              ],
              xAxes: [
                {
                  scaleLabel: { display: false },
                  gridLines: { display: false }
                }
              ]
            },

            tooltips: {
              backgroundColor: "#333",
              titleFontSize: 13,
              titleFontColor: "#fff",
              bodyFontColor: "#fff",
              bodyFontSize: 13,
              displayColors: false,
              xPadding: 10,
              yPadding: 10,
              intersect: false
            }
          }
        });
      });
  }
}
