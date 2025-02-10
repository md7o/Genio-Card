import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from '../../FirebaseKeys/genio-card-firebase-adminsdk-ymgn0-bf0510952c.json';

import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'FIRESTORE',
      useFactory: () => {
        admin.initializeApp({
          credential: admin.credential.cert(
            serviceAccount as admin.ServiceAccount,
          ),
        });
        return admin.firestore();
      },
      inject: [ConfigService],
    },
  ],
  exports: ['FIRESTORE'],
})
export class FirebaseModule {}
