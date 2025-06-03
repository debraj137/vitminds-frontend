import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class SignuploginService {
  url = environment.baseUrl;
  private sendEmailOTPUrl = this.url + "/user/generate_otp";
  private loginUrl = this.url + "/user/login";
  private verificationEmailOTPUrl = this.url + "/user/validate_otp";
  constructor(private _http: HttpClient) {}
  sendEmailforOTP(mobileNumber) {
    return this._http.post(this.sendEmailOTPUrl, mobileNumber);
  }
  save(user) {
    return this._http.post(this.url + "/user/save", user);
  }

  sendOTPforVarification(mobileNumberOTP) {
    return this._http.post(this.verificationEmailOTPUrl, mobileNumberOTP);
  }
}
