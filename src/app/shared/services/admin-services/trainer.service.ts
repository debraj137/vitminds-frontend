import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TrainerService {
  public burl = environment.baseUrl;
  // private trainerListUrl = this.burl + "/trainer/list?organizationId=1";
  private trainerListUrl = this.burl + "/trainer/list?page=";
  private save_TrainerUrl = this.burl + "/trainer/save";
  private change_statusUrl = this.burl + "/student/changestatus";
  private get_trainerUrl = this.burl + "/getTrainer/";
  private deleteTrainerUrl = this.burl + "/trainer/delete";
  private trainerUrl = this.burl + "/trainer/list";
  constructor(private http: HttpClient) {}

  trainerList() {
    return this.http.get(this.trainerListUrl);
  }

  getTrainerList(request) {
    return this.http.get(
      this.trainerListUrl + `${request.page}` + "&size=" + `${request.size}`
    );
  }

  saveTrainer(trainer) {
    return this.http.post(this.save_TrainerUrl, trainer);
  }
  changeStatus(trainer) {
    return this.http.post(this.change_statusUrl, trainer);
  }

  getTrainer(trainerId) {
    return this.http.get(this.get_trainerUrl + `${trainerId}`);
  }

  deleteTrainer(trainer) {
    return this.http.post(this.deleteTrainerUrl, trainer);
  }

  getListOfTrainer() {
    return this.http.get(this.trainerUrl);
  }
}
