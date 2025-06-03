import { LanguageTaskComponent } from "./language-task/language-task.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AdminComponent } from "./admin/admin.component";
import { LanguageDomainComponent } from "./language-domain/language-domain.component";
import { FeedbackComponent } from "./feedback/feedback.component";

import { UserLayoutComponent } from "./layout/userLayout/userLayout.component";
import { DefaultLayoutComponent } from "./layout/defaultLayout/defaultLayout.component";
//import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";
import { CodePlaygroundComponent } from "./code-playground/code-playground.component";
import { ExamComponent } from "./user/exam/exam.component";
import { ExamResultComponent } from "./user/exam-result/exam-result.component";
import { DashboardComponent } from "./user/dashboard/dashboard.component";
import { ExamListComponent } from "./user/exam-list/exam-list.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { ExamDetailComponent } from "./user/exam-detail/exam-detail.component";
import { ForgetPasswordComponent } from "./auth/forget-password/forget-password.component";
import { EnrollAndPayComponent } from "./user/enroll-and-pay/enroll-and-pay.component";

const routes: Routes = [
  //  {
  //   path: "",
  //   component: AdminLayoutComponent,
  //   children: [{ path: "admin", component: AdminComponent }]
  // },
  {
    path: "",
    component: DefaultLayoutComponent,
    children: [{ path: "", component: HomeComponent, pathMatch: "full" }],
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    children: [
      {
        path: "auth",
        children: [
          { path: "login", component: LoginComponent },
          { path: "signup", component: SignupComponent },
          { path: "language_domain/:id", component: LanguageDomainComponent },
          { path: "language_task/:id", component: LanguageTaskComponent },
          { path: "feedback", component: FeedbackComponent },
          { path: "forget-password", component: ForgetPasswordComponent },
        ],
      },
    ],
  },
  {
    path: "",
    component: UserLayoutComponent,
    children: [
      {
        // { path: "language_domain/:id", component: LanguageDomainComponent },
        // { path: "language_task/:id", component: LanguageTaskComponent },
        // { path: "feedback", component: FeedbackComponent },
        path: "user",
        children: [
          { path: "code-playground", component: CodePlaygroundComponent },
          { path: "dashboard", component: DashboardComponent },
          { path: "profile", component: ProfileComponent },
          { path: "exam_list/:status", component: ExamListComponent },
          { path: "exam_result/:id", component: ExamResultComponent },
          { path: "exam_detail/:id", component: ExamDetailComponent },
          { path: "enroll_and_pay", component: EnrollAndPayComponent },
        ],
      },
    ],
  },
  {
    path: "exam",
    children: [{ path: ":id", component: ExamComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
