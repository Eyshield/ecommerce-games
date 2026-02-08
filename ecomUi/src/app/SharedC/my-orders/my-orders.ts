import { Component, inject, signal } from '@angular/core';
import { orders } from '../../Models/Order.Models';
import { Page } from '../../Models/Page.Models';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService } from '../../Service/order-service';
import { AuthService } from '../../Service/auth-service';

@Component({
  selector: 'app-my-orders',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders {
  orders = signal<Page<orders>>({
    content: [],
    page: 0,
    Size: 10,
    totalElements: 0,
    totalPages: 0,
    isFirst: true,
    isLast: false,
  });
  orderService = inject(OrderService);
  authService = inject(AuthService);
  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId()!;
    this.orderService.getOrdersByUserId(userId, 0, 10).subscribe((data) => {
      this.orders.set(data);
    });
  }
}
