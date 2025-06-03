import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TopicCategoryService {
  public burl = environment.baseUrl;
  private topiccatsaveUrl = this.burl + "/category/save";
  private topiccatlistUrl = this.burl + "/category/list?page=";
  private topiccatdeleteUrl = this.burl + "/category/delete";
  private topicCatUrl = this.burl + "/category/list";

  constructor(private http: HttpClient) {}

  saveCategory = (category) => {
    return this.http.post(this.topiccatsaveUrl, category);
  };

  listCategory() {
    return this.http.get(this.topiccatlistUrl);
  }

  getTopicCategoryList(request) {
    return this.http.get(
      this.topiccatlistUrl + `${request.page}` + "&size=" + `${request.size}`
    );
  }

  deleteCategory(category) {
    return this.http.post(this.topiccatdeleteUrl, category);
  }

  listCategoryForQuestion() {
    return this.http.get(this.topicCatUrl);
  }
}
