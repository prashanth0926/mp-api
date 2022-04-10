import { HttpException, Injectable } from '@nestjs/common';
import * as config from 'config';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class FirestoreService {
  private readonly firestore = null;
  constructor() {
    if (config.firebaseCreds) {
      try {
        const app = initializeApp({
          credential: cert(config.firebaseCreds),
          databaseURL: config.databaseURL,
        });

        if (app) {
          try {
            this.firestore = getFirestore(app);

            if (this.firestore) {
              console.log('firestore initialized successfully!');
            }
          } catch (error) {
            console.log('firestore initialize error: ', error);
          }
        }
      } catch (error) {
        console.log('firebase initialize error: ', error);
      }
    }
  }

  checkFirestoreStatus() {
    if (!this.firestore) {
      throw new HttpException('Firestore connection not established!', 500);
    }
  }

  async createDoc(
    collection: string,
    document: string,
    data: any,
  ): Promise<any> {
    await this.checkFirestoreStatus();

    const doc = this.firestore.collection(collection).doc(document);

    await doc.set(data);

    return doc.get();
  }

  async getDoc(collection: string, document: string): Promise<any> {
    await this.checkFirestoreStatus();

    const doc = await this.firestore.collection(collection).doc(document).get();

    return doc.data();
  }

  async getCollection(collection: string): Promise<any> {
    await this.checkFirestoreStatus();

    const coll = await this.firestore.collection(collection).get();
    const out = {};

    coll.forEach((d) => {
      out[d.id] = d.data();
    });

    return out;
  }

  async updateDoc(
    collection: string,
    document: string,
    data: any,
  ): Promise<any> {
    await this.checkFirestoreStatus();

    const doc = this.firestore.collection(collection).doc(document);

    await doc.update(data);

    return doc.get();
  }

  async deleteDoc(collection: string, document: string): Promise<void> {
    await this.checkFirestoreStatus();

    const doc = this.firestore.collection(collection).doc(document);

    await doc.delete();
  }
}
