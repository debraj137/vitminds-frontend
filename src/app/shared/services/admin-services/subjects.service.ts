import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SubjectsService {
  public burl = environment.baseUrl;
  private subject_listUrl = this.burl + "/subject/list?page=";
  private saveSubjectUrl = this.burl + "/subject/save";
  private deletesubjectUrl = this.burl + "/subject/delete";
  private subject_Url = this.burl + "/subject/subjectListForQuestion";
  constructor(private http: HttpClient) {}

  subjetcList() {
    return this.http.get(this.subject_listUrl);
  }
  getSubjectList(request) {
    return this.http.get(
      this.subject_listUrl + `${request.page}` + "&size=" + `${request.size}`
    );
  }
  saveSubject(subject) {
    return this.http.post(this.saveSubjectUrl, subject);
  }
  delete(subject) {
    return this.http.post(this.deletesubjectUrl, subject);
  }

  listOfSubjectForQuestion() {
    return this.http.get(this.subject_Url);
  }
}
