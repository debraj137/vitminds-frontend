import { Day } from "./day";
import { Subject } from "./subject";

export class Question {
  id: number;
  name: string;
  description: string;
  language: string;
  practice = false;
  topicCategory = new Day();
  subject: Subject = new Subject();
  template: string;
  questionType: string;
  questionMarks: number;
  // option = [new Option(), new Option(), new Option(), new Option()];
}
