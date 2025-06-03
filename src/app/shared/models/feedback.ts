import { User } from "./user";

export class Feedback {
  id: number;
  name: string;
  submittedBy: User;
  email: string;
  message: string;
  technical: string;
  communication: string;
  aptitude: string;
  cleared_your_doubt: string;
  explained_concept: string;
  trainer = new User();
}
