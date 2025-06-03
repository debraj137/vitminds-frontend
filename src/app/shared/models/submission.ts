export class Submission {
  id: number;
  codeTemplate: string;
  language: string;
  resultStatus: string;
  submittedBy = {
    userId: null
  };
  question = {
    id: null,
    max_score: null,
    cutoff_score: null
  };
}
