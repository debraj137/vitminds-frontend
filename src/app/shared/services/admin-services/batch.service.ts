import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BatchService {
  public burl = environment.baseUrl;
  private batchListUrl = this.burl + "/batch/list?page=";
  private save_batchUrl = this.burl + "/batch/save";
  private lookupUrl =
    this.burl + "/lookUp/list/?lookupGroup=Batch Duration Type";
  private assignedExamUrl = this.burl + "";
  private assignStudentUrl = this.burl + "/batch/assign_student";
  private removeStudentFromBatchURL = this.burl + "/batch/deleteBatchStudent/";
  private assignedStudentListURL = this.burl + "/batch/assigned_student_list";
  private assignExamUrl = this.burl + "";
  private batchlistUrl = this.burl + "/batch/batchlist";
  private batchByTrainer = this.burl + "/batch/trainerBatchDetails/";
  constructor(private http: HttpClient) {}

  batchlist() {
    return this.http.post(this.batchListUrl, { organization: { id: 1 } });
  }

  getlistofbatch(request) {
    return this.http.post(
      this.batchListUrl + `${request.page}` + "&size=" + `${request.size}`,
      { organization: { id: 1 } }
    );
  }

  saveBatch(batch) {
    return this.http.post(this.save_batchUrl, batch);
  }
  lookuplist() {
    return this.http.get(this.lookupUrl);
  }
  get_assignedExams() {
    // return this.http.
  }

  assignStudentList(students) {
    return this.http.post(this.assignStudentUrl, students);
  }
  assignedStudents(batch) {
    return this.http.post(this.assignedStudentListURL, batch);
  }
  removeStudentFromBatch(batchId, studentId) {
    return this.http.get(
      this.removeStudentFromBatchURL + `${batchId}/${studentId}`
    );
  }
  assignExamList(exams) {
    return this.http.post(this.assignExamUrl, exams);
  }

  getBatchList() {
    return this.http.get(this.batchlistUrl);
  }
  getBatchByTrainerId(trainerId) {
    return this.http.get(this.batchByTrainer + `${trainerId}`);
  }
}
