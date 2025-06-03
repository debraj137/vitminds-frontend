import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private myRoute: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return this.authService.isLoggedIn;
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.myRoute.navigate(["admin"]);
      return false;
    }
  }
}
