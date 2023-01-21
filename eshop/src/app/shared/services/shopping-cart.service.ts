import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from 'shared/models/product';
import { take, Observable, map } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map((x: any) => {
          if (!x) {
            return new ShoppingCart(x);
          }
          return new ShoppingCart(x.items);
        })
      );
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    const result: any = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let carId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + carId + '/items').remove();
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        if (item.payload.exists()) {
          if (item.payload.val().quantity + change === 0) {
            item$.remove();
          } else {
            item$.update({
              product: product,
              quantity: item.payload.val().quantity + change,
            });
          }
        } else {
          item$.update({
            title: product.title,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl,
            quantity: change,
          });
        }
      });
  }
}
