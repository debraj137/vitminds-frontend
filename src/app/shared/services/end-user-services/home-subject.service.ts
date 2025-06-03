import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HomeSubjectService {
  public burl = environment.baseUrl;
  private subject_listUrl = this.burl + "/subject/list";

  constructor(private http: HttpClient) {}
  subjetcList() {
    return this.http.get(this.subject_listUrl);
  }
}
