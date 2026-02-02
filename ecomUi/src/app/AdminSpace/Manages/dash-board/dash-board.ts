import { Component, inject, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { UserService } from '../../../Service/user-service';
import { OrderService } from '../../../Service/order-service';

@Component({
  selector: 'app-dash-board',
  imports: [SideBarAdmin],
  templateUrl: './dash-board.html',
  styleUrl: './dash-board.css',
})
export class DashBoard {
  userService = inject(UserService);
  orderService = inject(OrderService);
  usercount = signal<number>(0);
  ordercount = signal<number>(0);
  ngOnInit() {
    this.userService.getAllUsers(10, 0).subscribe((response) => {
      this.usercount.set(response.totalElements);
    });
    this.orderService.getAllOrders(1, 0).subscribe((response) => {
      this.ordercount.set(response.totalElements);
    });
  }
}
