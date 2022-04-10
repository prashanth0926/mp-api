import { Module } from '@nestjs/common';
import { FirestoreModule } from '../firestore/firestore.module';
import { CollectionController } from './collections.controller';
import { CollectionService } from './collections.service';

@Module({
  imports: [FirestoreModule],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
