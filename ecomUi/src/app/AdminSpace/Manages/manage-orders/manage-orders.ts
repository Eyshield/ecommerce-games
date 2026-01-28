import { Component, inject, OnInit, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../../Service/order-service';
import { orders } from '../../../Models/Order.Models';
import { Page } from '../../../Models/Page.Models';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-orders',
  imports: [SideBarAdmin, RouterLink, ReactiveFormsModule],
  templateUrl: './manage-orders.html',
  styleUrl: './manage-orders.css',
})
export class ManageOrders implements OnInit {
  selectedStatus: 'pending' | 'shipped' | 'delivered' | null = null;
  orderService = inject(OrderService);
  searchTerm = new FormControl('');
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
    this.loadOrders();
  }
  loadOrders() {
    if (this.searchTerm.value !== '' && this.searchTerm.value) {
      this.orderService
        .searchOrders(this.searchTerm.value)
        .subscribe((response) => {
          this.ordersPage.set(response);
          this.orders.set(response.content);
        });
    } else {
      this.orders.set([]);
      this.ordersPage().page = 0;
      this.orderService
        .getAllOrders(this.ordersPage().page, this.ordersPage().Size)
        .subscribe((response) => {
          this.ordersPage.set(response);
          this.orders.set(response.content);
        });
    }
  }

  nextPage() {
    if (this.ordersPage().page < this.ordersPage().totalPages - 1) {
      this.ordersPage().page++;
      this.loadOrders();
    }
  }

  prevPage() {
    if (this.ordersPage().page > 0) {
      this.ordersPage().page--;
      this.loadOrders();
    }
  }
}
