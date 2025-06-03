import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { QuestionService } from "src/app/shared/services/admin-services/question.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TestCase } from "src/app/shared/models/test-case";
import { ToastrService } from "ngx-toastr";
import { TestCaseInput } from "src/app/shared/models/test-case-input";

@Component({
  selector: "app-test-case",
  templateUrl: "./test-case.component.html",
  styleUrls: ["./test-case.component.scss"]
})
export class TestCaseComponent implements OnInit {
  form: FormGroup;
  public questionId: number;
  public output = [];
  public input = [];
  public testCase = new TestCase();
  public testCases = [];
  public testCaseInputs = [];
  public counts = [];
  public name: string;
  public flag = false;
  // public buttonType: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.questionId = this.route.params["value"].id;
    //this.counts.push({});
    this.addMore();
    // this.form = this.fb.group({
    //   items: this.fb.array([])
    // });
    // for (let i = 0; i < 3; i++) {
    //   let testCaseInput = new TestCaseInput();
    //   this.testCaseInputs.push(testCaseInput);
    // }
  }

  // createTestCase() {
  //   return this.fb.group({
  //     input: ["", [Validators.required]],
  //     output: ["", [Validators.required]]
  //   });
  // }

  back() {
    this.router.navigate(["/admin/question-list"]);
  }

  saveTestCase() {
    this.testCases.length = 0;
    this.flag = false;
    console.log("length of counts = ", this.counts);

    for (let i = 0; i < this.counts.length; i++) {
      if (
        this.output[i] == "" ||
        this.output[i] == undefined ||
        this.input[i] == "" ||
        this.input[i] == undefined
      ) {
        this.flag = true;
        break;
      }
      this.testCase.question.id = this.questionId;
      this.testCase.output = this.output[i];
      this.testCase.input = this.input[i];
      //this.testCase.testCaseInputs = this.testCaseInputs;
      this.testCases.push(this.testCase);
      this.testCase = new TestCase();
      console.log("test cases []== ", this.testCases);
    }

    if (!this.flag) {
      //this.submit();
      console.log("test case array == ", this.testCases);
      for (let i = 0; i < this.testCases.length; i++) {
        this.questionService.saveTestCase(this.testCases[i]).subscribe(r => {
          if (r["status"] === "success") {
            this.toastr.success(r["message"]);
            //this.input[i] = "";
            //this.output[i] = "";
          }
        });
      }
      console.log("all is well");
    }
    console.log(this.testCases);
  }

  addMore() {
    //(this.form.controls["items"] as FormArray).push(this.createTestCase());
    // if (this.counts.length < 3) {
    this.counts.push({ testCase: "" });
    console.log("push counts", this.counts);

    //}
  }

  removeTestCase(index) {
    //this.testCases.splice(index, 1);
    //if (this.counts.length > 1) {

    console.log(index);

    this.counts.splice(index, 1);
    console.log(this.counts, "=====");

    //}
  }

  // submit() {
  //   console.log("test case array == ", this.testCases);
  //   for (let i = 0; i < this.testCases.length; i++) {
  //     this.questionService.saveTestCase(this.testCases[i]).subscribe(r => {
  //       if (r["status"] === "success") {
  //         this.toastr.success(r["message"]);
  //         // this.input[i] = "";
  //         //this.output[i] = "";
  //       }
  //     });
  //   }
  //   console.log("all is well");
  // }
}
