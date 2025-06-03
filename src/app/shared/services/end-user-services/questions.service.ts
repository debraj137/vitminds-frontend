import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class QuestionsService {
  public burl = environment.baseUrl;
  private practice_questionsUrl =
    this.burl + "/question/practice_question/list?subjectId=";
  private singleQuestionUrl =
    this.burl + "/question/single_question?questionId=";

  private compilerUrl = this.burl + "/question/compile";
  private submissionUrl = this.burl + "/question/submission";
  public submissionByUserUrl = this.burl + "/question/submissionlist_by_user?";

  constructor(private http: HttpClient) {}

  getPracticeQuestions(id) {
    return this.http.get(this.practice_questionsUrl + `${id}`);
  }
  getSingleQuestion(id) {
    return this.http.get(this.singleQuestionUrl + `${id}`);
  }
  doCompilation(compiler) {
    return this.http.post(this.compilerUrl, compiler);
  }

  submissionCode(submission) {
    return this.http.post(this.submissionUrl, submission);
  }

  getSubmissionByUser(userId, questionId) {
    return this.http.get(
      this.submissionByUserUrl + `userId=${userId}&questionId=${questionId}`
    );
  }
}
