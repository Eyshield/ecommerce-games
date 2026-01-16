import { Component, inject } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { CartService } from '../../../Service/cart-service';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-carts',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './add-carts.html',
  styleUrl: './add-carts.css',
})
export class AddCarts {
  cartService = inject(CartService);
  cartForm = new FormGroup({
    userId: new FormControl('', Validators.required),
    cartItmeRequest: new FormArray<FormGroup>([]),
  });

  get cartItems(): FormArray {
    return this.cartForm.get('cartItmeRequest') as FormArray;
  }

  addItem(): void {
    this.cartItems.push(
      new FormGroup({
        gameId: new FormControl(null, Validators.required),
        quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      })
    );
  }

  removeItem(index: number): void {
    this.cartItems.removeAt(index);
  }

  addCart(): void {
    if (this.cartForm.valid) {
      this.cartService.addToCart(this.cartForm.value as any).subscribe();
    }
  }
}
