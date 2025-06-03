import { Course } from "./course";
import { Time } from "@angular/common";
import { User } from "./user";
import { Batch } from "./batch";

export class Exam {
  id: number;
  name: string;
  course: Course = new Course();
  batch: Batch = new Batch();
  duration: number;
  maxmarks: number;
  passmarks: number;
  date: Date;
  startTime: string;
  trainer: User = new User();
  examToken: string;
}
