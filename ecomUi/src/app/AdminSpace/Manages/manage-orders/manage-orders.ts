import { Component, inject, OnInit, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../../Service/order-service';
import { orders } from '../../../Models/Order.Models';
import { Page } from '../../../Models/Page.Models';

@Component({
  selector: 'app-manage-orders',
  imports: [SideBarAdmin, RouterLink],
  templateUrl: './manage-orders.html',
  styleUrl: './manage-orders.css',
})
export class ManageOrders implements OnInit {
  selectedStatus: 'pending' | 'shipped' | 'delivered' | null = null;
  orderService = inject(OrderService);
  orders = signal<orders[]>([]);
  ordersPage = signal<Page<orders>>({
    content: [],
    page: 0,
    Size: 10,
    totalElements: 0,
    totalPages: 0,
    isFirst: true,
    isLast: false,
  });
  ngOnInit() {
    this.loadOrders(0);
  }
  loadOrders(page: number) {
    this.orderService
      .getAllOrders(page, this.ordersPage().Size)
      .subscribe((response) => {
        this.ordersPage.set(response);
        this.orders.set(response.content);
      });
  }
}
