import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  public burl = environment.baseUrl;
  private questionlistUrl = this.burl + "/question/list?page=";
  private save_questionUrl = this.burl + "/question/saveQuestion";
  private singleQuestionUrl =
    this.burl + "/question/single_question?questionId=";
  private delete_questionUrl = this.burl + "/question/deleteQuestion/";
  private saveOptionsUrl = this.burl + "/question/saveOption";
  private saveRightOptionUrl = this.burl + "/question/chooseOption";
  private optionsByqidUrl = this.burl + "/question/optionlistByQid/";
  private _uploadUrl = this.burl + "/question/saveFromExcel";
  private saveTestCaseUrl = this.burl + "/question/saveTestCase";
  private questionlistbysubjectUrl =
    this.burl + "/question/questionlist_by_subject?subjectId=";
  constructor(private http: HttpClient) {}

  saveQuestion(question) {
    return this.http.post(this.save_questionUrl, question);
  }
  questionlist() {
    return this.http.get(this.questionlistUrl);
  }

  getListOfQuestion(request) {
    return this.http.get(
      this.questionlistUrl + `${request.page}` + "&size=" + `${request.size}`
    );
  }

  getQuestionsBySubject(subjectId) {
    return this.http.get(this.questionlistbysubjectUrl + `${subjectId}`);
  }

  get_singleQuestion(id) {
    return this.http.get(this.singleQuestionUrl + `${id}`);
  }
  deleteQuestion(id) {
    return this.http.get(this.delete_questionUrl + `${id}`);
  }
  saveOptionlist(options) {
    return this.http.post(this.saveOptionsUrl, options);
  }
  saveRightOption(options) {
    return this.http.post(this.saveRightOptionUrl, options);
  }
  getOptionList(id) {
    return this.http.get(this.optionsByqidUrl + `${id}`);
  }

  pushFileToStorage(Questionupload) {
    const formdata: FormData = new FormData();
    // formdata.append('city');
    // console.log("Questionupload ", Questionupload);

    formdata.append("file", Questionupload.file);
    formdata.append("subject.id", Questionupload.subjectId);
    formdata.append("user.id", Questionupload.submittedBy);
    return this.http.post(this._uploadUrl, formdata);
  }

  saveTestCase(testcase) {
    return this.http.post(this.saveTestCaseUrl, testcase);
  }
}
