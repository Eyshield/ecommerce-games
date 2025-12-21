import { Component, signal } from '@angular/core';
import { Navbar } from '../Widget/navbar/navbar';

@Component({
  selector: 'app-cart',
  imports: [Navbar],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  removeFromCart(_t10: any) {
    throw new Error('Method not implemented.');
  }
  cartItems = signal<Array<any>>([
    {
      imageUrl: 'pes.jpg',
      title: 'Pro Evolution Soccer 2024',
      price: '59.99',
    },
  ]);
}
