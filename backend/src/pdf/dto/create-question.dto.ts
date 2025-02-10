export class CreateQuestionDto {
  readonly sectionTitle: string;
  readonly numQuestions: number;
  readonly language: string;
  readonly difficulty: string;
  readonly userId: string;
}
