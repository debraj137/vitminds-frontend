import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { IntroBannerComponent } from "./home/intro-banner/intro-banner.component";
import { PopularJobCategoryComponent } from "./home/popular-job-category/popular-job-category.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AdminModule } from "./admin/admin.module";
import { AuthenticationService } from "./shared/services/common-services/authentication.service";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { LanguageDomainComponent } from "./language-domain/language-domain.component";
import { LanguageTaskComponent } from "./language-task/language-task.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AceEditorModule } from "ng2-ace-editor";
import { MatTableModule } from "@angular/material/table";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { ToastrModule } from "ngx-toastr";
import { FeedbackComponent } from "./feedback/feedback.component";
import { DefaultLayoutComponent } from "./layout/defaultLayout/defaultLayout.component";
import { UserLayoutComponent } from "./layout/userLayout/userLayout.component";
import { SideMenuComponent } from "./user/side-menu/side-menu.component";
import { ExamComponent } from "./user/exam/exam.component";
import { QuestionComponent } from "./user/exam/question/question.component";
import { ExamResultComponent } from "./user/exam-result/exam-result.component";
import { CodePlaygroundComponent } from "./code-playground/code-playground.component";
import { ExamListComponent } from "./user/exam-list/exam-list.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { CountdownModule } from "ngx-countdown";
import { ExamDetailComponent } from "./user/exam-detail/exam-detail.component";
import { ForgetPasswordComponent } from "./auth/forget-password/forget-password.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { NgxSmartModalModule, NgxSmartModalService } from "ngx-smart-modal";
import { DashboardComponent } from "./user/dashboard/dashboard.component";
import { PipeModule } from "./admin/pipe/pipe.module";
import { EnrollAndPayComponent } from "./user/enroll-and-pay/enroll-and-pay.component";
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    IntroBannerComponent,
    PopularJobCategoryComponent,
    SignupComponent,
    LoginComponent,
    LanguageDomainComponent,
    LanguageTaskComponent,
    FeedbackComponent,
    DashboardComponent,
    SideMenuComponent,
    DefaultLayoutComponent,
    UserLayoutComponent,
    SideMenuComponent,
    //AdminLayoutComponent,
    CodePlaygroundComponent,
    ExamComponent,
    QuestionComponent,
    ExamResultComponent,
    ExamListComponent,
    ProfileComponent,
    ExamDetailComponent,
    ForgetPasswordComponent,
    EnrollAndPayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AdminModule,
    MatTableModule,
    PipeModule,
    HttpClientModule,
    AngularEditorModule,
    ToastrModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AceEditorModule,
    CountdownModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  exports: [MatTableModule],
  providers: [AuthenticationService, NgxSmartModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
