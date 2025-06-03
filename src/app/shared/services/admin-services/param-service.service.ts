import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ParamServiceService {
  private subject = new Subject<any>();

  constructor() {}

  setParam(url: any) {
    this.subject.next({ text: url });
  }
  getParam(): Observable<any> {
    return this.subject.asObservable();
  }
}
