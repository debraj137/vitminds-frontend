import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  public burl = environment.baseUrl;
  private courseListUrl = this.burl + "/course/list?page=";
  private save_courseUrl = this.burl + "/course/save";
  private delete_courseUrl = this.burl + "/course/delete";
  private courseFeeUrl = this.burl + "/course/coursefee";
  private coursesUrl = this.burl + "/course/listofcourse";
  constructor(private http: HttpClient) {}

  courselist() {
    return this.http.get(this.courseListUrl);
  }

  getCourseList(request) {
    return this.http.get(
      this.courseListUrl + `${request.page}` + "&size=" + `${request.size}`
    );
  }

  saveCourse(course) {
    return this.http.post(this.save_courseUrl, course);
  }
  delete(course) {
    return this.http.post(this.delete_courseUrl, course);
  }

  getCourseFee(courseId) {
    return this.http.post(this.courseFeeUrl, courseId);
  }

  getCourseListForExam() {
    return this.http.get(this.coursesUrl);
  }
}
