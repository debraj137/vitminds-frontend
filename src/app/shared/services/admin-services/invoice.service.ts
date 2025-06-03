import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  public burl = environment.baseUrl;
  public makeInvoiceUrl = this.burl + "/enroll_Student/makeInvoice";
  public paymentModeUrl = this.burl + "/lookUp/list?lookupGroup=";
  public invoiceListUrl = this.burl + "/invoice/list?page=";
  public singleInvoiceUrl = this.burl + "/invoice/invoiceById?invoiceId=";
  public updatePaymentUrl = this.burl + "/invoice/updatePayment";
  public onlineenrollUrl = this.burl + "/enroll_Student/online-enroll";
  constructor(private http: HttpClient) {}

  makeInvoice(envoiceData) {
    return this.http.post(this.makeInvoiceUrl, envoiceData);
  }

  getPaymentMode(lookupgroup) {
    return this.http.get(this.paymentModeUrl + `${lookupgroup}`);
  }

  getInvoiceList() {
    return this.http.get(this.invoiceListUrl);
  }

  getList(request) {
    return this.http.get(
      this.invoiceListUrl + `${request.page}` + "&size=" + `${request.size}`
    );
  }

  getInvoiceById(invoiceId) {
    return this.http.get(this.singleInvoiceUrl + `${invoiceId}`);
  }

  updatePayment(paymentDetail) {
    return this.http.post(this.updatePaymentUrl, paymentDetail);
  }

  saveOnlineEnroll(enrolldata) {
    return this.http.post(this.onlineenrollUrl, enrolldata);
  }
}
