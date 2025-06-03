import { routing } from "./admin.routing";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminComponent } from "./admin.component";

import { SettingsComponent } from "./settings/settings.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { SubjectsComponent } from "./subjects/subjects.component";
import { TopicCategoryComponent } from "./topic-category/topic-category.component";
import { CoursesComponent } from "./courses/courses.component";
import { BatchComponent } from "./batch/batch.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { PipeModule } from "./pipe/pipe.module";
import { QuestionComponent } from "./question/question.component";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { QuestionlistComponent } from "./questionlist/questionlist.component";
import { EditQuestionComponent } from "./edit-question/edit-question.component";
import { CreateExamComponent } from "./create-exam/create-exam.component";
import { ExamListComponent } from "./exam-list/exam-list.component";
import { EditExamComponent } from "./edit-exam/edit-exam.component";
import { AssignQuestionComponent } from "./assign-question/assign-question.component";
import { NgxSmartModalModule, NgxSmartModalService } from "ngx-smart-modal";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FeedbackListComponent } from "./feedback-list/feedback-list.component";
import { AdminSidemenuComponent } from "./admin-sidemenu/admin-sidemenu.component";
import { HeaderComponent } from "./header/header.component";
import { TrainerComponent } from "./trainer/trainer.component";
import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";
import { AssignExamComponent } from "./assign-exam/assign-exam.component";
import { AssignStudentComponent } from "./assign-student/assign-student.component";
import { AmazingTimePickerService } from "amazing-time-picker";
import { QuestionPreviewComponent } from "./question-preview/question-preview.component";
import { AssignBatchComponent } from "./assign-batch/assign-batch.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { CollegeComponent } from "./college/college.component";
import { CollegeFilterPipe } from "./college/college.pipe";
import { StudentListComponent } from "./student-list/student-list.component";
import { SubjectFilterPipe } from "./subjects/subject.pipe";
import { TestCaseComponent } from "./test-case/test-case.component";
import { GrdFilterPipe } from "./pipe/grd-filter.pipe";
import { AdminReportComponent } from "./admin-report/admin-report.component";
import { EnrollStudentComponent } from "./enroll-student/enroll-student.component";
import { InvoiceListComponent } from "./invoice-list/invoice-list.component";
import { InvoiceTemplateComponent } from "./invoice-template/invoice-template.component";
import { TrainerSidemenuComponent } from "./trainer-sidemenu/trainer-sidemenu.component";
import { OrganizationComponent } from "./organization-list/organization-list.component";

/* components */

// import { ToastModule } from "ng2-toastr/ng2-toastr";

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule,
    NgxSmartModalModule.forRoot(),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    PipeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxPaginationModule,
    // ToastModule.forRoot()
  ],
  declarations: [
    // SaveCouponComponent,
    //ListCouponComponent
    AdminComponent,
    SettingsComponent,
    DashboardComponent,
    AdminLoginComponent,
    SubjectsComponent,
    TopicCategoryComponent,
    CoursesComponent,
    BatchComponent,
    QuestionComponent,
    QuestionlistComponent,
    EditQuestionComponent,
    CreateExamComponent,
    ExamListComponent,
    EditExamComponent,
    AssignQuestionComponent,
    FeedbackListComponent,
    AdminSidemenuComponent,
    AdminLayoutComponent,
    HeaderComponent,
    TrainerComponent,
    AssignExamComponent,
    AssignStudentComponent,
    QuestionPreviewComponent,
    AssignBatchComponent,
    CollegeComponent,
    CollegeFilterPipe,
    SubjectFilterPipe,
    StudentListComponent,
    TestCaseComponent,
    CollegeFilterPipe,
    AdminReportComponent,
    EnrollStudentComponent,
    InvoiceListComponent,
    OrganizationComponent,
    InvoiceTemplateComponent,
    TrainerSidemenuComponent,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptor,
    //   multi: true
    // },

    AmazingTimePickerService,
    NgxSmartModalService,
  ],
  exports: [AdminSidemenuComponent],
  //exports: [GrdFilterPipe]
})
export class AdminModule {}
