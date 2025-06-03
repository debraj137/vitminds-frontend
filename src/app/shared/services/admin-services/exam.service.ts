import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ExamService {
  public burl = environment.baseUrl;
  private saveExamUrl = this.burl + "/exam/save";
  private listExamUrl = this.burl + "/exam/list?page=";
  private examdeleteUrl = this.burl + "/exam/delete";
  private getExamByidUrl = this.burl + "/exam/getExamById";
  private questionlistUrl = this.burl + "/exam/questions_by_examId";
  private assignedQURL = this.burl + "/exam/assign_questions";
  private assignStudentUrl = this.burl + "/exam/assign_students";
  private assignedStudentListUrl = this.burl + "/exam/students/";
  private removeStudentFromExamUrl = this.burl + "/exam/removeStudentFromExam/";
  private deleteExamQuestionUrl = this.burl + "/exam/deleteExamQuestion/";
  private examCloneUrl = this.burl + "/exam/cloneExam/";
  private examTokenUrl = this.burl + "/exam/save_exam_token";
  constructor(private http: HttpClient) {}

  saveExam(exam) {
    return this.http.post(this.saveExamUrl, exam);
  }

  getExamList(request) {
    return this.http.get(
      this.listExamUrl + `${request.page}` + "&size=" + `${request.size}`
    );
  }

  edit(exam) {
    return this.http.post(this.getExamByidUrl, exam);
  }
  delete(exam) {
    return this.http.post(this.examdeleteUrl, exam);
  }
  getQuestinlistByExamId(exam_id) {
    return this.http.post(this.questionlistUrl, { id: exam_id });
  }
  assignQuestions(questions) {
    return this.http.post(this.assignedQURL, questions);
  }
  examAssignToStudents(students) {
    return this.http.post(this.assignStudentUrl, students);
  }
  deleteExamQuestion(qId, examId) {
    return this.http.get(this.deleteExamQuestionUrl + `${examId}/${qId}`);
  }
  assignedStudentList(examId) {
    return this.http.get(this.assignedStudentListUrl + `${examId}`);
  }
  removeStudentFromExam(examId, studentId) {
    return this.http.get(
      this.removeStudentFromExamUrl + `${examId}/${studentId}`
    );
  }

  cloneExam(exam, examId) {
    return this.http.post(this.examCloneUrl + `${examId}`, exam);
  }

  getExamById(examId) {
    return this.http.post(this.getExamByidUrl, examId);
  }

  generateToken(exam) {
    return this.http.post(this.examTokenUrl, exam);
  }
}
