import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../Widget/navbar/navbar';
import { cartStore } from '../../CartStore/cart.store';

@Component({
  selector: 'app-cart',
  imports: [Navbar],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartStore = inject(cartStore);
  cartItems = this.cartStore.items;
  totalPrice = this.cartStore.totalPrice;
  quantity = this.cartStore.itemsCount;
  removeFromCart(id: number) {
    this.cartStore.removeFromCart(id);
  }
}
