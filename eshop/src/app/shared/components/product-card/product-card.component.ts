import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
