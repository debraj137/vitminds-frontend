import { User } from "../../models/user";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUserAdminSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public newuser: User = new User();
  public c_user = null;
  public count = 1;

  public burl = environment.baseUrl;
  private forgotPwdUrl = this.burl + "/user/forget_password";
  private resetPwdUrl = this.burl + "/user/reset_password";

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("frontcurrentUser"))
    );

    this.currentUserAdminSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    console.log("currentUser = ", this.currentUser);

    this.newuser = new User();
  }

  public get isLoggedIn() {
    return this.getToken() !== null;
  }

  getToken() {
    return localStorage.getItem("currentUser");
  }

  public get currentAdminUserValue(): User {
    if (
      this.currentUserAdminSubject.value &&
      this.currentUserAdminSubject.value.username == null
    ) {
      this.c_user = this.currentUserAdminSubject.value;
    }
    return this.currentUserAdminSubject.value;
  }

  // Admin Login
  login(username: string, passwd: string) {
    return this.http
      .post<any>(this.burl + "/auth", {
        email: username,
        adminLoginMaster: {
          password: passwd,
        },
      })
      .pipe(
        map((user) => {
          if (user && user["token"]) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(
              "currentUser",
              JSON.stringify(user["adminInfo"])
            );
            this.newuser.token = user["token"];
            this.newuser.username = username;
            this.newuser.userId = user["adminInfo"].userId;
            this.newuser.firstName = user["adminInfo"].firstName;
            this.newuser.seccondName = user["adminInfo"].seccondName;
            this.newuser.role = user["adminInfo"].role;
            // console.log("user[adminInfo]===" + user["adminInfo"].firstName);
            this.currentUserAdminSubject.next(this.newuser);

            if (user["adminInfo"].role != null) {
              this.c_user = user["adminInfo"];
            }
            this.count = 0;
            if (user["token"] == null) {
              return null;
            }
          }
          return user;
        })
      );
  }
  public isTrainer(): boolean {
    return this.currentUserAdminSubject.value.role.role == "TRAINER";
  }

  // Logout Admin
  logout() {
    // remove admin user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserAdminSubject.next(null);
  }

  loginEndUser(user) {
    return this.http.post<any>(this.burl + "/user/login", user).pipe(
      map((response) => {
        if (response != null && response["token"] != null) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            "frontcurrentToken",
            JSON.stringify(response["token"])
          );
          localStorage.setItem(
            "frontcurrentUser",
            JSON.stringify(response["adminInfo"])
          );
          // this.currentUserSubject.next(response["user"]);
          // this.currentUser = this.currentUserSubject.asObservable().source[
          //   "value"
          // ];
          this.newuser.token = response["token"];
          this.newuser.userId = response["adminInfo"].userId;
          this.newuser = response["adminInfo"];
          // this.newuser.firstName = response["adminInfo"].firstName;
          // this.newuser.seccondName = response["adminInfo"].seccondName;
          // this.newuser.primaryImageUrl = response["adminInfo"].primaryImageUrl;
          // this.newuser.fileName = response["adminInfo"].fileName;
          this.currentUserSubject.next(this.newuser);
        }
        return response;
      })
    );
  }

  logoutEndUser() {
    //remove user from local storage to log user out
    localStorage.removeItem("frontcurrentUser");
    localStorage.removeItem("frontcurrentToken");
    this.currentUserSubject.next(null);
    this.currentUser = null;
    return "success";
  }
  public get isUserLoggedIn() {
    return this.getUserToken() !== null;
  }

  getUserToken() {
    return localStorage.getItem("frontcurrentUser");
  }
  public get currentUserValue(): User {
    if (
      this.currentUserSubject.value &&
      this.currentUserSubject.value.username == null
    ) {
      this.c_user = this.currentUserSubject.value;
    }
    return this.currentUserSubject.value;
  }

  forgotPassword(email) {
    return this.http.post(this.forgotPwdUrl, email);
  }

  resetPassword(user) {
    return this.http.post(this.resetPwdUrl, user);
  }
}

//${config.apiUrl}/users/authenticate`
