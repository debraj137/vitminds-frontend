import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Subject, Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ExamService {
  public burl = environment.baseUrl;
  private questionsByExamUrl = this.burl + "/exam/questions_by_examId";
  private examSingleQuestionUrl =
    this.burl + "/exam/single_question?questionId=";
  private saveAnswerUrl = this.burl + "/onlineExam/saveAnswer";
  private summaryUrl = this.burl + "/onlineExam/summary/";
  private examDetailUrl = this.burl + "/exam/exam_detail?examId=";
  private examReportUrl = this.burl + "/onlineExam/exam_report?userId=";
  private monthlyexamReportUrl =
    this.burl + "/onlineExam/month_exam_report?userId=";

  private validateExamTokenUrl = this.burl + "/onlineExam/validate_exam_token/";
  private subject = new Subject<any>();

  constructor(private http: HttpClient) {}

  setExamSubmitFlag(flag: boolean) {
    this.subject.next({ text: flag });
  }

  getExamSubmitFlag(): Observable<any> {
    return this.subject.asObservable();
  }

  getAssignedExamSingleQuestion(questionId, examId) {
    return this.http.get(
      this.examSingleQuestionUrl + `${questionId}&examId=${examId}`
    );
  }
  questionsByExamId(exam) {
    return this.http.post(this.questionsByExamUrl, exam);
  }

  saveAnswerOnSubmit(examQuestionAnswerDetail) {
    return this.http.post(this.saveAnswerUrl, examQuestionAnswerDetail);
  }
  getSummary(examId, userId) {
    return this.http.get(this.summaryUrl + `${examId}/${userId}`);
  }

  getExamDetail(examId) {
    return this.http.get(this.examDetailUrl + `${examId}`);
  }

  getExamReport(userId) {
    return this.http.get(this.examReportUrl + `${userId}`);
  }

  getExamReportByMonth(userId, selectedDate) {
    return this.http.get(
      this.monthlyexamReportUrl + `${userId}&date=${selectedDate}`
    );
  }

  validateExamToken(exam, userId) {
    return this.http.post(this.validateExamTokenUrl + `${userId}`, exam);
  }
}
