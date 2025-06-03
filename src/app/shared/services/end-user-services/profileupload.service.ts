import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import "rxjs/Rx";
import "rxjs/add/operator/toPromise";
import { Observable } from "rxjs/Observable";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProfileuploadService {
  url = environment.baseUrl;
  private listingImageUrl = this.url + "/user/uploadImage";
  constructor(private http: HttpClient) {}

  pushFileToStorage(imageUpload) {
    const formdata: FormData = new FormData();
    formdata.append("userFile", imageUpload.userFile);
    formdata.append("user.id", "" + imageUpload.user.id);
    return this.http.post(this.listingImageUrl, formdata);
  }
}
