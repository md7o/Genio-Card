import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PdfModule } from './pdf/pdf.module';
import { FirebaseModule } from './firebase/firebase.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    FirebaseModule,
    PdfModule,
  ],
})
export class AppModule {}
