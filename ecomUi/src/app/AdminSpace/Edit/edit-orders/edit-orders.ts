import { Component, inject } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderService } from '../../../Service/order-service';
import { ActivatedRoute } from '@angular/router';
import { orderRequestDto } from '../../../Models/OrderRequestDto';

@Component({
  selector: 'app-edit-orders',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './edit-orders.html',
  styleUrl: './edit-orders.css',
})
export class EditOrders {
  orderService = inject(OrderService);
  route = inject(ActivatedRoute);
  id!: number;

  orderForm = new FormGroup({
    userId: new FormControl<number | null>(null, Validators.required),
    userLabel: new FormControl(''),
    orderItmeRequest: new FormArray<FormGroup>([]),
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOrder();
  }

  get orderItems(): FormArray {
    return this.orderForm.get('orderItmeRequest') as FormArray;
  }

  createItem(): FormGroup {
    return new FormGroup({
      gameId: new FormControl<number | null>(null, Validators.required),
      gameLabel: new FormControl(''),
      quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }

  loadOrder(): void {
    this.orderService.getOrdersById(this.id).subscribe((order) => {
      if (order.user) {
        this.orderForm.patchValue({
          userId: order.user.id,
          userLabel: order.user.nom,
        });
      }

      this.orderItems.clear();

      order.items.forEach((item) => {
        const group = this.createItem();

        group.patchValue({
          gameId: item.game.id,
          gameLabel: item.game.title,
          quantity: item.quantity,
        });

        this.orderItems.push(group);
      });
    });
  }

  updateOrder(): void {
    if (this.orderForm.invalid) return;

    const dto: orderRequestDto = {
      userId: this.orderForm.value.userId!,
      orderItemRequests: this.orderForm.value.orderItmeRequest!.map((item) => ({
        gameId: item.gameId!,
        quantity: item.quantity,
      })),
    };

    this.orderService.updateOrder(this.id, dto).subscribe();
  }
  addItem(): void {
    this.orderItems.push(
      new FormGroup({
        gameId: new FormControl(null, Validators.required),
        quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      }),
    );
  }

  removeItem(index: number): void {
    this.orderItems.removeAt(index);
  }
}
