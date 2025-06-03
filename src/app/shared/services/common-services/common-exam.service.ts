import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Subject, Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class CommonExamService {
  public burl = environment.baseUrl;
  private exam_listUrl = this.burl + "/exam/list";
  private student_exam_listUrl = this.burl + "/student/exam/list";
  private attended_exam_listUrl = this.burl + "/student/exam/attended_exam";
  private finished_exam_listUrl = this.burl + "/student/exam/finished_exam";
  private practice_exam_listUrl = this.burl + "/student/exam/practice_exam";

  private subject = new Subject<any>();

  constructor(private http: HttpClient) {}
  all_exam_list() {
    return this.http.get(this.exam_listUrl);
  }
  student_exam_list(user) {
    return this.http.post(this.student_exam_listUrl, user);
  }
  attended_exam_list(user) {
    return this.http.post(this.attended_exam_listUrl, user);
  }
  finished_exam_list(user) {
    return this.http.post(this.finished_exam_listUrl, user);
  }
  practice_exam_list(user) {
    return this.http.post(this.practice_exam_listUrl, user);
  }
  setExamId(examId: number) {
    this.subject.next({ text: examId });
  }

  getExamId(): Observable<any> {
    return this.subject.asObservable();
  }
}
