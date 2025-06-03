import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CollegeService {
  public burl = environment.baseUrl;

  private saveUrl = this.burl + "/college/save";
  private listUrl = this.burl + "/college/list?page=";
  private listOfUrl = this.burl + "/college/list";
  private collegeById = this.burl + "/college/collegeById/";
  private delete = this.burl + "/college/delete";
  constructor(private http: HttpClient) {}

  saveCollege(college) {
    return this.http.post(this.saveUrl, college);
  }

  listCollege() {
    return this.http.get(this.listUrl);
  }

  getlist(request) {
    return this.http.get(
      this.listUrl + `${request.page}` + "&size=" + `${request.size}`
    );
  }

  getcollegeById(id) {
    return this.http.get(this.collegeById + `${id}`);
  }
  deleteCollege(college) {
    return this.http.post(this.delete, college);
  }

  getListOfCollege() {
    return this.http.get(this.listOfUrl);
  }
}
