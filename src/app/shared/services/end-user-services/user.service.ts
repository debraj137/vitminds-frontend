import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Subject, Observable } from "rxjs";
import { User } from "../../models/user";
@Injectable({
  providedIn: "root"
})
export class UserService {
  url = environment.baseUrl;
  private userUpdateUrl = this.url + "/user/update";
  private passwordUpdateUrl = this.url + "/user/change_password";
  private subject = new Subject<any>();
  constructor(private _http: HttpClient) {}

  setUser(user: User) {
    this.subject.next({ text: user });
  }
  getUser(): Observable<any> {
    return this.subject.asObservable();
  }

  update_profile(user) {
    return this._http.post(this.userUpdateUrl, user);
  }
  changePassword(user) {
    return this._http.post(this.passwordUpdateUrl, user);
  }
}
