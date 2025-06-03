import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  public burl = environment.baseUrl;
  private studentListUrl = this.burl + "/student/list?page=";
  private changeStatusUrl = this.burl + "/student/changestatus";
  private saveStudentUrl = this.burl + "/student/save";
  private singleStudentUrl = this.burl + "/student/singleStudent";
  private studentUrl = this.burl + "/student/list";
  constructor(private http: HttpClient) {}

  getAllStudentlist() {
    return this.http.post(this.studentUrl, { organization: { id: 1 } });
  }

  getStudentlist(request) {
    return this.http.post(
      this.studentListUrl + `${request.page}` + "&size=" + `${request.size}`,
      { organization: { id: 1 } }
    );
  }

  changeStatus(student) {
    return this.http.post(this.changeStatusUrl, student);
  }

  saveStudent(student) {
    return this.http.post(this.saveStudentUrl, student);
  }
  getSingleStudent(studentId) {
    return this.http.post(this.singleStudentUrl, studentId);
  }
}
