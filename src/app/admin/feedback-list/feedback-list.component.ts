import { Component, OnInit } from "@angular/core";
import { FeedbackService } from "src/app/shared/services/end-user-services/feedback.service";
import { ActivatedRoute } from "@angular/router";
import { ParamServiceService } from "src/app/shared/services/admin-services/param-service.service";
import Swal from "sweetalert2";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-feedback-list",
  templateUrl: "./feedback-list.component.html",
  styleUrls: ["./feedback-list.component.scss"],
  host: { class: "dashboard-content-container" },
})
export class FeedbackListComponent implements OnInit {
  //pagination
  config: any;

  constructor(
    private feedbackservice: FeedbackService,
    private route: ActivatedRoute,
    private paramService: ParamServiceService
  ) {}
  public feedback_list = [];
  public editFlag = false;
  totalElements: number = 0;
  listOfFeedback = [];

  ngOnInit() {
    this.getFeedback({ page: "0", size: "10" });
    this.feedBackList();
    this.route.queryParams.subscribe((param) => {
      let queryParam = param;
      if (queryParam != null) {
        this.paramService.setParam(queryParam);
      }
    });
  }
  feedBackList() {
    this.feedbackservice.getFeedbackList().subscribe((r) => {
      if (r["status"] == "success") {
        this.feedback_list = r["feedback"];
        // console.log("feedback list ", this.feedback_list);
        // this.pagination();
      }
    });
  }
  delete(feedback) {
    console.log("feedback that you want delete  ", feedback);
    this.feedbackservice.deleteFeedback(feedback).subscribe((r) => {
      if (r["status"] == "success") {
        this.feedBackList();
      }
    });
  }

  private getFeedback(request) {
    this.feedbackservice.getfeedback(request).subscribe((data) => {
      this.listOfFeedback = data["feedback"];
      this.totalElements = data["TotalFeedback"];
    });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request["page"] = event.pageIndex.toString();
    request["size"] = event.pageSize.toString();
    this.getFeedback(request);
  }

  // pagination() {
  //   this.config = {
  //     itemsPerPage: 3,
  //     currentPage: 1,
  //     totalPages: this.feedback_list.length,
  //   };
  // }
  // pageChanged(event) {
  //   this.config.currentPage = event;
  // }
  confirmModel(feedback) {
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

        this.delete(feedback);
      }
    });
  }
}
