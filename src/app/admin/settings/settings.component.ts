import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
  host: { class: "dashboard-content-container" }
})
export class SettingsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
