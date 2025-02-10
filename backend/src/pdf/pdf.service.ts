import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { genkit } from 'genkit';
import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import pdfParse from 'pdf-parse';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './interfaces/question.interface';

@Injectable()
export class PdfService {
  private ai: any;

  constructor(
    @Inject('FIRESTORE') private firestore: any,
    private configService: ConfigService,
  ) {
    this.ai = genkit({
      plugins: [
        googleAI({ apiKey: this.configService.get('googleGenAIApiKey') }),
      ],
      model: gemini15Flash,
    });
  }

  async processPdf(
    buffer: Buffer,
    dto: CreateQuestionDto,
  ): Promise<Question[]> {
    const pdfData = await pdfParse(buffer);
    const qaPairs = await this.generateQuestions(pdfData.text, dto);
    await this.saveToFirestore(qaPairs, dto);
    return qaPairs;
  }

  private async generateQuestions(
    text: string,
    dto: CreateQuestionDto,
  ): Promise<Question[]> {
    const { text: response } = await this.ai.generate(`
      Analyze the following text and create a JSON array with questions and answers. Use the parameters provided:
      - Number of questions: ${dto.numQuestions}
      - Language: ${dto.language}
      - Difficulty: ${dto.difficulty}

      Input: ${text}
      Output: [...]
    `);

    const sanitized = response.replace(/```json|```/g, '').trim();
    return JSON.parse(sanitized);
  }

  private async saveToFirestore(
    questions: Question[],
    dto: CreateQuestionDto,
  ): Promise<void> {
    const docRef = this.firestore.collection('questions').doc();
    await docRef.set({
      quest: questions,
      ...dto,
      createdAt: new Date(),
    });
  }
}
