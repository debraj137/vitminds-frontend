import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ReportService {
  public burl = environment.baseUrl;

  private reportUrl = this.burl + "/dash/report?collegeId=";
  constructor(private http: HttpClient) {}

  getReport(collegeId) {
    return this.http.get(this.reportUrl + `${collegeId}`);
  }
}
