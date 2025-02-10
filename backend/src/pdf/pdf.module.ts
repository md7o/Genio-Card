import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [ConfigModule, FirebaseModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
