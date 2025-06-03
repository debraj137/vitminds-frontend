import { Course } from "./course";
import { Day } from "./day";
import { User } from "./user";
export class Batch {
  id: number;
  batchCode: string;
  batchName: string;
  description: string;
  trainer = new User();
  course = new Course();
  duration: number;
  durationType = new Day();
  organization = { id: 1 };
  User;
}
