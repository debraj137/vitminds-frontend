import { Component, OnInit } from "@angular/core";
import { OrganizationService } from "src/app/shared/services/admin-services/organization.service";
import { Organization } from "src/app/shared/models/organization";
import { AuthenticationService } from "src/app/shared/services/common-services/authentication.service";
import { NgxSmartModalService } from "ngx-smart-modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AmazingTimePickerService } from "amazing-time-picker";
import { Router, ActivatedRoute } from "@angular/router";
import { ParamServiceService } from "src/app/shared/services/admin-services/param-service.service";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-organization-list",
  templateUrl: "./organization-list.component.html",
  styleUrls: ["./organization-list.component.scss"],
})
export class OrganizationComponent implements OnInit {
  public saveOrganizationForm: FormGroup;
  public submitted = false;

  config: any;

  constructor(
    private organizationService: OrganizationService,
    public ngxSmartModalService: NgxSmartModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private atp: AmazingTimePickerService,
    private auth: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private paramService: ParamServiceService
  ) {
    this.saveOrganizationList();
    this.saveForm();
    this.saveNewForm();
  }

  organization = new Organization();
  searchText: string;
  organizationlist = [];
  totalElements: number = 0;

  ngOnInit() {
    this.getOrganization({ page: "0", size: "10" });
    this.route.queryParams.subscribe((param) => {
      let queryParam = param;
      if (queryParam != null) {
        this.paramService.setParam(queryParam);
      }
    });
  }

  saveForm() {
    const req = [Validators.compose([Validators.required])];
    this.saveOrganizationForm = this.formBuilder.group({
      name: ["", Validators.compose([...req])],
      primaryEmailId: ["", Validators.compose([...req])],
      secondaryEmailId: ["", Validators.compose([...req])],
      mobileNo: ["", Validators.compose([...req])],
      gst: ["", Validators.compose([...req])],
      website: ["", Validators.compose([...req])],
      startedYear: ["", Validators.compose([...req])],
      userType: ["", Validators.compose([...req])],
      aboutInstitute: ["", Validators.compose([...req])],
      active: ["", Validators.compose([...req])],
      code: ["", Validators.compose([...req])],
    });
  }

  get formValid() {
    return this.saveOrganizationForm.controls;
  }

  saveOrganization() {
    this.submitted = true;
    if (this.saveOrganizationForm.invalid) {
      return;
    }
    this.organizationService
      .saveOrganization(this.organization)
      .subscribe((data) => {
        console.log("response after organization list ", data);
        this.saveOrganizationList();
        this.ngxSmartModalService.getModal("myModal1").close();
        this.toastr.success("Saved successfully!", "Your Organization !", {
          timeOut: 2000,
        });
      });
    this.saveOrganizationForm.reset();
    this.submitted = false;
  }

  saveOrganizationList() {
    this.organizationService.listOfOrganization().subscribe((data) => {
      console.log("data is retrieved", data);
      if (data["status"] == "success") {
        this.organizationlist = data["organizations"];
        this.totalElements = data["TotalOrganization"];
      }
    });
  }

  edit(organization) {
    this.organization.id = organization.id;
    this.organization.name = organization.name;
    this.organization.primaryEmailId = organization.primaryEmailId;
    this.organization.secondaryEmailId = organization.secondaryEmailId;
    this.organization.mobileNo = organization.mobileNo;
    this.organization.gst = organization.gst;
    this.organization.website = organization.website;
    this.organization.startedYear = organization.startedYear;
    this.organization.userType = organization.userType;
    this.organization.aboutInstitute = organization.aboutInstitute;
    this.organization.active = organization.active;
    this.organization.code = organization.code;
    this.ngxSmartModalService.getModal("myModal1").open();
  }

  private getOrganization(request) {
    this.organizationService.listOrganization(request).subscribe((data) => {
      this.organizationlist = data["organizations"];
      this.totalElements = data["TotalOrganization"];
    });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request["page"] = event.pageIndex.toString();
    request["size"] = event.pageSize.toString();
    this.getOrganization(request);
  }

  // Add New Element

  saveNewOrganization() {
    this.submitted = true;
    if (this.saveOrganizationForm.invalid) {
      return;
    }
    this.organizationService
      .saveOrganization(this.organization)
      .subscribe((data) => {
        console.log("response after organization list ", data);
        this.saveOrganizationList();
        this.ngxSmartModalService.getModal("myModal2").close();
        this.toastr.success("Saved successfully!", "Your Organization !", {
          timeOut: 2000,
        });
      });
    this.saveOrganizationForm.reset();
    this.submitted = false;
  }

  saveNewForm() {
    const req = [Validators.compose([Validators.required])];
    this.saveOrganizationForm = this.formBuilder.group({
      name: ["", Validators.compose([...req])],
      primaryEmailId: ["", Validators.compose([...req])],
      secondaryEmailId: ["", Validators.compose([...req])],
      mobileNo: ["", Validators.compose([...req])],
      gst: ["", Validators.compose([...req])],
      website: ["", Validators.compose([...req])],
      startedYear: ["", Validators.compose([...req])],
      userType: ["", Validators.compose([...req])],
      aboutInstitute: ["", Validators.compose([...req])],
      active: ["", Validators.compose([...req])],
    });
  }
}
