import { Component, inject } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { OrderService } from '../../../Service/order-service';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-orders',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './add-orders.html',
  styleUrl: './add-orders.css',
})
export class AddOrders {
  orderService = inject(OrderService);
  orderForm = new FormGroup({
    userId: new FormControl('', Validators.required),
    orderItemRequests: new FormArray<FormGroup>([]),
  });

  get orderItems(): FormArray {
    return this.orderForm.get('orderItemRequests') as FormArray;
  }

  addItem(): void {
    this.orderItems.push(
      new FormGroup({
        gameId: new FormControl(null, Validators.required),
        quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      })
    );
  }

  removeItem(index: number): void {
    this.orderItems.removeAt(index);
  }

  makeOrder(): void {
    if (this.orderForm.valid) {
      this.orderService.placeOrder(this.orderForm.value as any).subscribe();
    }
  }
}
