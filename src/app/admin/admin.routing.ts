import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { SettingsComponent } from "./settings/settings.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { SubjectsComponent } from "./subjects/subjects.component";
import { CoursesComponent } from "./courses/courses.component";
import { BatchComponent } from "./batch/batch.component";
import { QuestionComponent } from "./question/question.component";
import { QuestionlistComponent } from "./questionlist/questionlist.component";
import { EditQuestionComponent } from "./edit-question/edit-question.component";
import { TopicCategoryComponent } from "./topic-category/topic-category.component";
import { CreateExamComponent } from "./create-exam/create-exam.component";
import { ExamListComponent } from "./exam-list/exam-list.component";
import { EditExamComponent } from "./edit-exam/edit-exam.component";
import { AssignQuestionComponent } from "./assign-question/assign-question.component";
import { FeedbackListComponent } from "./feedback-list/feedback-list.component";
import { AdminGuard } from "./guard/admin.guard";
import { TrainerComponent } from "./trainer/trainer.component";
import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";
import { AssignExamComponent } from "./assign-exam/assign-exam.component";
import { AssignStudentComponent } from "./assign-student/assign-student.component";
import { QuestionPreviewComponent } from "./question-preview/question-preview.component";
import { AssignBatchComponent } from "./assign-batch/assign-batch.component";
import { CollegeComponent } from "./college/college.component";
import { StudentListComponent } from "./student-list/student-list.component";
import { TestCaseComponent } from "./test-case/test-case.component";
import { AdminReportComponent } from "./admin-report/admin-report.component";
import { EnrollStudentComponent } from "./enroll-student/enroll-student.component";
import { InvoiceListComponent } from "./invoice-list/invoice-list.component";
import { InvoiceTemplateComponent } from "./invoice-template/invoice-template.component";
import { OrganizationComponent } from "./organization-list/organization-list.component";

export const childRoutes: Routes = [
  {
    path: "admin",
    component: AdminLoginComponent,
    children: [{ path: "login", component: AdminLoginComponent }],
  },

  {
    path: "invoice/:id",
    component: InvoiceTemplateComponent,
    canActivate: [AdminGuard],
  },

  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "admin",
        children: [
          //  { path: "", redirectTo: "login", pathMatch: "full" },
          { path: "setting", component: SettingsComponent },
          { path: "dashboard", component: DashboardComponent },
          // { path: "login", component: AdminLoginComponent },
          {
            path: "subjects",
            component: SubjectsComponent,
            canActivate: [AdminGuard],
          },
          {
            path: "college_list",
            component: CollegeComponent,
            canActivate: [AdminGuard],
          },
          {
            path: "student_list",
            component: StudentListComponent,
            canActivate: [AdminGuard],
          },

          {
            path: "course_list",
            component: CoursesComponent,
            canActivate: [AdminGuard],
          },
          {
            path: "batch_list",
            component: BatchComponent,
            canActivate: [AdminGuard],
          },
          {
            path: "question/:questionType",
            component: QuestionComponent,
            canActivate: [AdminGuard],
          },
          {
            path: "question/preview/:id",
            component: QuestionPreviewComponent,
          },
          {
            path: "question-list",
            component: QuestionlistComponent,
            canActivate: [AdminGuard],
          },
          {
            path: "edit-question/:id",
            component: EditQuestionComponent,
            canActivate: [AdminGuard],
          },
          {
            path: "category_list",
            component: TopicCategoryComponent,
            canActivate: [AdminGuard],
          },
          {
            path: "create-exam",
            component: CreateExamComponent,
            canActivate: [AdminGuard],
          },
          {
            path: "exam-list",
            component: ExamListComponent,
            canActivate: [AdminGuard],
          },
          {
            path: "edit-exam/:id",
            component: EditExamComponent,
            canActivate: [AdminGuard],
          },
          {
            path: "assign_question/:id/subject/:subId",
            component: AssignQuestionComponent,
            canActivate: [AdminGuard],
          },
          {
            path: "assign_exam/:id",
            component: AssignExamComponent,
            canActivate: [AdminGuard],
          },
          {
            path: "assign_batch/:id",
            component: AssignBatchComponent,
            canActivate: [AdminGuard],
          },
          {
            path: "assign_student/:id",
            component: AssignStudentComponent,
            canActivate: [AdminGuard],
          },
          {
            path: "feedback-list",
            component: FeedbackListComponent,
            canActivate: [AdminGuard],
          },
          {
            path: "trainer-list",
            component: TrainerComponent,
            canActivate: [AdminGuard],
          },

          {
            path: "organization-list",
            component: OrganizationComponent,
            canActivate: [AdminGuard],
          },

          {
            path: "invoice-list",
            component: InvoiceListComponent,
            canActivate: [AdminGuard],
          },

          {
            path: "test-case/:id",
            component: TestCaseComponent,
            canActivate: [AdminGuard],
          },

          // {
          //   path: "report",
          //   component: AdminReportComponent,
          //   canActivate: [AdminGuard]
          // },
          {
            path: "enroll/:id",
            component: EnrollStudentComponent,
            canActivate: [AdminGuard],
          },

          // {
          //   path: "invoice/:id",
          //   component: InvoiceTemplateComponent,
          //   canActivate: [AdminGuard]
          // }
          //   {
          //     path: "subadmin",
          //     loadChildren: "./sub-admin/sub-admin.module#SubAdminModule"
          //   },
        ],
      },
    ],
  },
  // otherwise redirect to home
  { path: "**", redirectTo: "" },
];

export const routing = RouterModule.forChild(childRoutes);
