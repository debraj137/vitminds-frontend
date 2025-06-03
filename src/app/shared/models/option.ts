import { Question } from "./question";

export class Option {
  id: number;
  name: string;
  question = new Question();
}
