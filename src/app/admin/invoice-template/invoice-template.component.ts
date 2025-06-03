import { Component, OnInit } from "@angular/core";
import { InvoiceService } from "src/app/shared/services/admin-services/invoice.service";
import { Invoice } from "src/app/shared/models/invoice";
import { ActivatedRoute } from "@angular/router";
import { PaymentDetail } from "src/app/shared/models/payment-detail";

@Component({
  selector: "app-invoice-template",
  templateUrl: "./invoice-template.component.html",
  styleUrls: ["./invoice-template.component.scss"]
})
export class InvoiceTemplateComponent implements OnInit {
  public invoice: Invoice = new Invoice();
  public invoiceId: any;
  public gst: number;
  public total: number = 0;
  public dueAmount: number = 0;
  public paymentDetails = [];
  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.invoiceId = this.route.params["value"].id;
    this.getInvoice(this.invoiceId);
  }

  getInvoice(invoiceId) {
    this.invoiceService.getInvoiceById(invoiceId).subscribe(r => {
      if (r["status"] === "success") {
        this.invoice = r["invoice"];
        this.paymentDetails = r["paymentDetails"];
        //this.gst = (this.invoice.total * 20) / 100;
        let paymentValue = 0;
        this.paymentDetails.map(payment => {
          paymentValue += payment.paymentValue;
        });
        this.dueAmount = this.invoice.total - paymentValue;
        //this.total = this.invoice.total + this.gst;
      }
    });
  }
}
