import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class OrganizationService {
  public burl = environment.baseUrl;

  private saveUrl = this.burl + "/organization/save";
  private listUrl = this.burl + "/organization/list?page=";

  constructor(private http: HttpClient) {}

  saveOrganization(organization) {
    return this.http.post(this.saveUrl, organization);
  }

  listOfOrganization() {
    return this.http.get(this.listUrl);
  }

  listOrganization(request) {
    return this.http.get(
      this.listUrl + `${request.page}` + "&size=" + `${request.size}`
    );
  }
}
