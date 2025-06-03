import { Component, OnInit } from "@angular/core";
import { TopicCategoryService } from "src/app/shared/services/admin-services/topic-category.service";
import { TopicCategory } from "src/app/shared/models/topic-category";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ViewChild } from "@angular/core";
import { NgxSmartModalService } from "ngx-smart-modal";
import { QuestionService } from "src/app/shared/services/admin-services/question.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { ParamServiceService } from "src/app/shared/services/admin-services/param-service.service";
import { PageEvent } from "@angular/material/paginator";

const NAMES: string[] = ["Maia", "Asher", "Olivia", "Atticus"];

@Component({
  selector: "app-topic-category",
  templateUrl: "./topic-category.component.html",
  styleUrls: ["./topic-category.component.scss"],
  host: { class: "dashboard-content-container" },
})
export class TopicCategoryComponent implements OnInit {
  displayedColumns: string[] = ["id", "name"];
  public dataSource;
  public categoryList = [];
  public categoryName: string;
  public topicCategory: TopicCategory = new TopicCategory();
  public submitted = false;
  public searchText;
  //pagination
  config: any;
  totalElements: number = 0;
  listOfTopicCategory = [];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private categoryService: TopicCategoryService,
    private questionservice: QuestionService,
    private tostr: ToastrService,
    private route: ActivatedRoute,
    private paramService: ParamServiceService
  ) {
    // this.dataSource = this.getCategoryList();
  }
  public all_ques = [];
  ngOnInit() {
    this.getListOfCategory({ page: "0", size: "10" });
    this.getCategoryList();
    this.questionservice.questionlist().subscribe((r) => {
      if (r["message"] == "list succesfully") {
        this.all_ques = r["questions"];
      }
    });
    //this.pagination();

    this.route.queryParams.subscribe((param) => {
      let queryParam = param;
      if (queryParam != null) {
        this.paramService.setParam(queryParam);
      }
    });
  }

  applyFilter(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: "name",
      value: filterValue,
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCategoryList = () => {
    this.categoryService.listCategory().subscribe((r) => {
      if (r["status"] === "success") {
        this.categoryList = r["topicCategories"];
      }
    });
  };

  addCategory = () => {
    this.topicCategory = new TopicCategory();
    this.categoryName = "";
    this.ngxSmartModalService.getModal("myModal").open();
  };

  saveCategory = () => {
    this.submitted = true;
    if (!this.categoryName) {
      return;
    }
    this.topicCategory.name = this.categoryName;
    this.categoryService.saveCategory(this.topicCategory).subscribe((r) => {
      if (r["status"] === "success") {
        this.getCategoryList();
        this.submitted = false;
        this.categoryName = "";
        if (this.topicCategory.id) this.tostr.success("Edit successfully..!!");
        else this.tostr.success("Added successfully..!!");
        this.topicCategory = new TopicCategory();
        this.ngxSmartModalService.getModal("myModal").close();
      }
    });
  };
  deleteCategory = (category) => {
    let q_count = 0;
    for (let q of this.all_ques) {
      if (category.id == q.topicCategory.id) {
        q_count++;
      }
    }
    if (q_count == 0) {
      this.categoryService.deleteCategory(category).subscribe((r) => {
        if (r["status"] === "success") {
          this.getCategoryList();
        }
      });
    } else {
      this.tostr.error(
        "you can't delete becoz this topic category contain some questions..!!"
      );
    }
  };

  editCategory = (category) => {
    // console.log("edit category ", category);
    this.topicCategory = category;
    this.categoryName = category.name;
    this.ngxSmartModalService.getModal("myModal").open();
    // this.saveCategory();
  };

  private getListOfCategory(request) {
    this.categoryService.getTopicCategoryList(request).subscribe((data) => {
      this.listOfTopicCategory = data["topicCategories"];
      this.totalElements = data["TotalTopicCategory"];
    });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request["page"] = event.pageIndex.toString();
    request["size"] = event.pageSize.toString();
    this.getListOfCategory(request);
  }

  //pagination
  // pagination() {
  //   this.config = {
  //     itemsPerPage: 10,
  //     currentPage: 1,
  //     totalPages: this.categoryList.length,
  //   };
  // }
  // pageChanged(event) {
  //   this.config.currentPage = event;
  // }
}
