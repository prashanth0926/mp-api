import { Injectable, NotFoundException } from '@nestjs/common';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable()
export class CollectionService {
  constructor(private readonly firestoreService: FirestoreService) {}

  async getCollection(collection: string): Promise<any> {
    return this.firestoreService.getCollection(collection);
  }

  async getDoc(collection: string, doc: string): Promise<any> {
    return this.firestoreService.getDoc(collection, doc);
  }

  async createDoc(collection: string, doc: string, data: any): Promise<any> {
    return this.firestoreService.createDoc(collection, doc, data);
  }

  async updateDoc(collection: string, doc: string, data: any): Promise<any> {
    const d = await this.getDoc(collection, doc);

    if (!d) {
      throw new NotFoundException(
        `doc ${doc} of collection ${collection} not found!`,
      );
    }

    return this.firestoreService.updateDoc(collection, doc, data);
  }
}
