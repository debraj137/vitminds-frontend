import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class FeedbackService {
  public burl = environment.baseUrl;
  private saveFeedbackUrl = this.burl + "/student/saveFeedback";
  private feedbackListUrl = this.burl + "/student/listFeedback?page=";
  private deleteFeedbackUrl = this.burl + "/student/deleteFeedback";
  constructor(private http: HttpClient) {}
  saveFeedback(feedback) {
    return this.http.post(this.saveFeedbackUrl, feedback);
  }
  getFeedbackList() {
    return this.http.get(this.feedbackListUrl);
  }

  getfeedback(request) {
    return this.http.get(
      this.feedbackListUrl + `${request.page}` + "&size=" + `${request.size}`
    );
  }

  deleteFeedback(feedback) {
    return this.http.post(this.deleteFeedbackUrl, feedback);
  }
}
