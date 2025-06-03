import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-default-layout",
  templateUrl: "./defaultLayout.component.html",
  styleUrls: ["./defaultLayout.component.scss"]
})
export class DefaultLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log("from default");
  }
}
