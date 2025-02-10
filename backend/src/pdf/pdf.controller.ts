import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PdfService } from './pdf.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './interfaces/question.interface';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('pdfFile'))
  async uploadPdf(
    @UploadedFile() file: Express.Multer.File,
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<{ questions: Question[] }> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const questions = await this.pdfService.processPdf(
      file.buffer,
      createQuestionDto,
    );
    return { questions };
  }
}
