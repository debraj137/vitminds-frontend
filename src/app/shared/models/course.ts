import { Subject } from "./subject";

export class Course {
  id: number;
  name: string;
  description: string;
  fees: number;
  organization;
  subject = new Subject();
}
