import { Course } from "./course";
import { Batch } from "./batch";
import { User } from "./user";

export class Invoice {
  id: number;
  user = new User();
  batch = new Batch();
  course = new Course();
  discount: number;
  additionalCharges: number;
  total: number;
  paymentValue: number;
  lookUp = {
    id: null
  };
}
