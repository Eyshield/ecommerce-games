import { Component, inject } from '@angular/core';
import { Navbar } from '../Widget/navbar/navbar';
import { cartStore } from '../../CartStore/cart.store';
import { OrderService } from '../../Service/order-service';
import { AuthService } from '../../Service/auth-service';
import { orderRequestDto } from '../../Models/OrderRequestDto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [Navbar],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartStore = inject(cartStore);
  orderService = inject(OrderService);
  authService = inject(AuthService);

  cartItems = this.cartStore.items;
  totalPrice = this.cartStore.totalPrice;
  quantity = this.cartStore.itemsCount;
  removeFromCart(id: number) {
    this.cartStore.removeFromCart(id);
  }
  placeOrder() {
    const orderRequestDto: orderRequestDto = {
      userId: this.authService.getCurrentUserId() ?? '',
      orderItemRequest: this.cartItems()
        .filter((item) => item.game.id !== undefined)
        .map((item) => ({
          gameId: item.game.id as number,
          quantity: item.quantity,
        })),
    };
    this.orderService.placeOrder(orderRequestDto).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Order Placed Successfully',
          text: 'Your order has been placed successfully.',
        });
        this.cartStore.clearCart();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Order Failed',
          text: 'There was an error placing your order. Please try again.',
        });
      },
    });
  }
}
