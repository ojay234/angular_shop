import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: any) {
    return this.db.list('/products').push(product);
  }
  getAll() {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(
        map((products: any[]) => {
          return products.map((p) => ({
            key: p.payload.key,
            ...p.payload.val(),
          }));
        })
      );
  }
  get(productId: any) {
    return this.db.object('/products/' + productId);
  }
  update(productId: any, product: any) {
    return this.db.object('/products/' + productId).update(product);
  }
  delete(productId: any) {
    return this.db.object('/products/' + productId).remove();
  }
}
