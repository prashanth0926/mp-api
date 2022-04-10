import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectionModule } from './modules/collections/collections.module';
import { CsvModule } from './modules/csv/csv.module';
import { UsersModule } from './modules/users/users.module';
import { FirestoreModule } from './modules/firestore/firestore.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    CollectionModule,
    CsvModule,
    UsersModule,
    FirestoreModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
