import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ParamServiceService } from "src/app/shared/services/admin-services/param-service.service";

@Component({
  selector: "app-trainer-sidemenu",
  templateUrl: "./trainer-sidemenu.component.html",
  styleUrls: ["./trainer-sidemenu.component.scss"],
})
export class TrainerSidemenuComponent implements OnInit {
  public queryParam: any;

  public activeComponent = {
    student: false,
    subject: false,
    course: false,
    topic_category: false,
    questionList: false,
    examList: false,
    batch: false,
    feedback: false,
    trainer: false,
    invoice: false,
  };
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private paramService: ParamServiceService
  ) {}

  ngOnInit() {
    this.paramService.getParam().subscribe((r) => {
      this.queryParam = Object.keys(r.text);
      this.gotoCompment(this.queryParam[0]);
    });
  }
  logout() {
    this.auth.logout();
    return this.router.navigate(["/"]);
    // location.reload();
  }

  gotoCompment(param) {
    this.initiliazeFalse();
    if (param === "student") {
      this.activeComponent.student = true;
    } else if (param === "subject") {
      this.activeComponent.subject = true;
    } else if (param === "course") {
      this.activeComponent.course = true;
    } else if (param === "topic-category") {
      this.activeComponent.topic_category = true;
    } else if (param === "question") {
      this.activeComponent.questionList = true;
    } else if (param === "examlist") {
      this.activeComponent.examList = true;
    } else if (param === "batches") {
      this.activeComponent.batch = true;
    } else if (param === "feedback") {
      this.activeComponent.feedback = true;
    } else if (param === "trainer") {
      this.activeComponent.trainer = true;
    } else if (param === "invoice") {
      this.activeComponent.invoice = true;
    }
  }
  initiliazeFalse() {
    this.activeComponent.student = false;
    this.activeComponent.batch = false;
    this.activeComponent.subject = false;
    this.activeComponent.course = false;
    this.activeComponent.topic_category = false;
    this.activeComponent.questionList = false;
    this.activeComponent.invoice = false;
    this.activeComponent.trainer = false;
    this.activeComponent.feedback = false;
    this.activeComponent.examList = false;
  }
}
