import { Component, OnInit } from "@angular/core";
import { HomeSubjectService } from "src/app/shared/services/end-user-services/home-subject.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-popular-job-category",
  templateUrl: "./popular-job-category.component.html",
  styleUrls: ["./popular-job-category.component.scss"]
})
export class PopularJobCategoryComponent implements OnInit {
  constructor(
    private subjectservice: HomeSubjectService,
    private router: Router
  ) {}
  subjectlist = [];
  ngOnInit() {
    this.subjectservice.subjetcList().subscribe(r => {
      // console.log("response after getting subject list ", r);
      if (r["message"] == "subject list get succesfully") {
        this.subjectlist = r["subjects"];
      }
    });
  }
  gotoLanguageTask(id) {
    this.router.navigate(["/auth/language_domain/" + `${id}`]);
  }
}
