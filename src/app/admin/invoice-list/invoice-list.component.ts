import { Component, OnInit } from "@angular/core";
import { InvoiceService } from "src/app/shared/services/admin-services/invoice.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ParamServiceService } from "src/app/shared/services/admin-services/param-service.service";
import { NgxSmartModalService } from "ngx-smart-modal";
import { PaymentDetail } from "src/app/shared/models/payment-detail";
import { ToastrService } from "ngx-toastr";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-invlice-list",
  templateUrl: "./invoice-list.component.html",
  styleUrls: ["./invoice-list.component.scss"],
})
export class InvoiceListComponent implements OnInit {
  //pagination
  config: any;

  public invoiceList = [];
  public paymentModeId;
  public paymentModeArr = [];
  public invoiceId: number;
  public paymentValue: number = 0;
  public paymentDetail = new PaymentDetail();
  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private paramService: ParamServiceService,
    private router: Router,
    private ngxSmartModalService: NgxSmartModalService,
    private toastr: ToastrService
  ) {}

  totalElements: number = 0;
  listOfInvoice = [];

  ngOnInit() {
    this.getInvoices({ page: "0", size: "10" });
    this.route.queryParams.subscribe((param) => {
      let queryParam = param;
      if (queryParam != null) {
        this.paramService.setParam(queryParam);
      }
    });
    this.getInvoiceList();
    // this.pagination();
  }

  getInvoiceList() {
    this.invoiceService.getInvoiceList().subscribe((r) => {
      if (r["status"] === "success") {
        this.invoiceList = r["invoices"];
        console.log("invoice List== ", this.invoiceList);
      }
    });
  }

  viewInvoice(invoiceId) {
    this.router.navigate([]).then((resutl) => {
      window.open("/invoice/" + `${invoiceId}`, "_blank");
    });
    console.log("invoice Id== ", invoiceId);
  }

  getPaymentModeList() {
    this.invoiceService.getPaymentMode("PaymentMode").subscribe((r) => {
      if (r["status"] === "success") {
        this.paymentModeArr = r["lookUp"];
      }
    });
  }

  getInvoiceIdforUpdate(id) {
    console.log("id = ", id);
    this.invoiceId = id;
    this.getPaymentModeList();
    this.ngxSmartModalService.open("myModal");
  }

  updateInvoice() {
    this.paymentDetail.invoice.id = this.invoiceId;
    this.paymentDetail.paymentValue = this.paymentValue;
    this.paymentDetail.mode.id = this.paymentModeId;
    this.invoiceService.updatePayment(this.paymentDetail).subscribe((r) => {
      if (r["status"] === "success") {
        this.toastr.success(r["message"]);
        this.ngxSmartModalService.close("myModal");
      }
    });
  }

  getLookUpIdOnChange(event) {
    this.paymentModeId = event.target.value;
  }

  private getInvoices(request) {
    this.invoiceService.getList(request).subscribe((data) => {
      this.listOfInvoice = data["invoices"];
      this.totalElements = data["Totalinvoices"];
    });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request["page"] = event.pageIndex.toString();
    request["size"] = event.pageSize.toString();
    this.getInvoices(request);
  }

  // pagination() {
  //   //Create dummy data
  //   this.config = {
  //     itemsPerPage: 5,
  //     currentPage: 1,
  //     totalItems: this.invoiceList.length,
  //   };
  // }
  // pageChanged(event) {
  //   this.config.currentPage = event;
  // }
}
