import { Component, inject } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { OrderService } from '../../../Service/order-service';
import {
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
  ordersService = inject(OrderService);
  orderForm = new FormGroup({
    userId: new FormControl('', [Validators.required]),
    cartId: new FormControl('', [Validators.required]),
    gameId: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
  });
  AddOrder() {
    if (this.orderForm.valid) {
      const orderRequestDto = {
        userId: Number(this.orderForm.get('userId')?.value!),
        cartId: Number(this.orderForm.get('cartId')?.value!),
        orderItemRequests: [
          {
            gameId: Number(this.orderForm.get('gameId')?.value!),
            quantity: Number(this.orderForm.get('quantity')?.value!),
          },
        ],
      };
      this.ordersService.placeOrder(orderRequestDto).subscribe((response) => {
        console.log('Order added successfully', response);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
