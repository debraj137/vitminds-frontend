import { Invoice } from "./invoice";

export class PaymentDetail {
  id: number;
  invoice = new Invoice();
  paymentValue: number;
  mode = {
    id: null
  };
}
