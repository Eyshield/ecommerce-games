import { Component, inject } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../../../Service/cart-service';
import { ActivatedRoute } from '@angular/router';
import { cartRequestDto } from '../../../Models/CartRequestDto.models';

@Component({
  selector: 'app-edit-carts',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './edit-carts.html',
  styleUrl: './edit-carts.css',
})
export class EditCarts {
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);

  id!: number;

  cartForm = new FormGroup({
    userId: new FormControl<number | null>(null, Validators.required),
    userLabel: new FormControl(''),
    cartItmeRequest: new FormArray<FormGroup>([]),
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCart();
  }

  get cartItems(): FormArray {
    return this.cartForm.get('cartItmeRequest') as FormArray;
  }

  createItem(): FormGroup {
    return new FormGroup({
      gameId: new FormControl<number | null>(null, Validators.required),
      gameLabel: new FormControl(''),
      quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }

  loadCart(): void {
    this.cartService.getCartById(this.id).subscribe((cart) => {
      if (cart.user) {
        this.cartForm.patchValue({
          userId: cart.user.id,
          userLabel: cart.user.nom,
        });
      }

      this.cartItems.clear();

      cart.items.forEach((item) => {
        const group = this.createItem();

        group.patchValue({
          gameId: item.game.id,
          gameLabel: item.game.title,
          quantity: item.quantity,
        });

        this.cartItems.push(group);
      });
    });
  }

  updateCart(): void {
    if (this.cartForm.invalid) return;

    const dto: cartRequestDto = {
      userId: this.cartForm.value.userId!,
      cartItmeRequest: this.cartForm.value.cartItmeRequest!.map((item) => ({
        gameId: item.gameId!,
        quantity: item.quantity,
      })),
    };

    this.cartService.updateCart(this.id, dto).subscribe();
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
}
