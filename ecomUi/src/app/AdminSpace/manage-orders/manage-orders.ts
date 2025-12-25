import { Component } from '@angular/core';
import { SideBarAdmin } from '../../SharedC/Widget/side-bar-admin/side-bar-admin';

@Component({
  selector: 'app-manage-orders',
  imports: [SideBarAdmin],
  templateUrl: './manage-orders.html',
  styleUrl: './manage-orders.css',
})
export class ManageOrders {
  selectedStatus: 'pending' | 'shipped' | 'delivered' | null = null;
}
