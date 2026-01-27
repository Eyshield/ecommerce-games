import { Component, inject, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../../../Service/cart-service';
import { ActivatedRoute, Router } from '@angular/router';
import { cartRequestDto } from '../../../Models/CartRequestDto.models';
import { Page } from '../../../Models/Page.Models';
import { Game } from '../../../Models/Game.models';
import { user } from '../../../Models/User.models';
import { UserService } from '../../../Service/user-service';
import { GameService } from '../../../Service/game-service';

@Component({
  selector: 'app-edit-carts',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './edit-carts.html',
  styleUrl: './edit-carts.css',
})
export class EditCarts {
  cartService = inject(CartService);
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  gameService = inject(GameService);
  id!: number;
  games = signal<Page<Game>>({
    content: [],
    page: 0,
    Size: 10,
    totalElements: 0,
    totalPages: 0,
    isFirst: true,
    isLast: false,
  });
  userSearch = new FormControl('');
  customers = signal<Page<user>>({
    content: [],
    page: 0,
    Size: 10,
    totalElements: 0,
    totalPages: 0,
    isFirst: true,
    isLast: false,
  });
  cartForm = new FormGroup({
    userId: new FormControl<number | null>(null, Validators.required),
    userLabel: new FormControl(''),
    cartItmeRequest: new FormArray<FormGroup>([]),
  });
  router = inject(Router);

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
  searchUsers(keyword: string) {
    this.userService.searchUsers(keyword).subscribe({
      next: (response) => this.customers.set(response),
      error: () => this.customers.set({ ...this.customers(), content: [] }),
    });
  }
  selectCustomer(customer: user) {
    this.cartForm.patchValue({ userId: customer.id });
    this.userSearch.setValue(`${customer.nom} ${customer.prenom}`);
    this.customers.set({ ...this.customers(), content: [] });
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
  searchGames(keyword: string) {
    this.gameService.searchGames(keyword).subscribe({
      next: (response) => this.games.set(response),
      error: () => this.games.set({ ...this.games(), content: [] }),
    });
  }
  selectGame(game: Game, index: number): void {
    const item = this.cartItems.at(index);
    item.patchValue({
      gameId: game.id,
      gameTitle: game.title,
    });
    item.get('searchControl')?.setValue(game.title, { emitEvent: false });
    this.games.set({ ...this.games(), content: [] });
  }
  onGameSearch(value: string, index: number): void {
    if (value && value.length >= 2) {
      this.searchGames(value);
    } else {
      this.games.set({ ...this.games(), content: [] });
    }
  }
  updateCart(): void {
    if (this.cartForm.invalid) return;

    const dto: cartRequestDto = {
      userId: this.cartForm.value.userId!,
      cartItemRequests: this.cartForm.value.cartItmeRequest!.map((item) => ({
        gameId: item.gameId!,
        quantity: item.quantity,
      })),
    };

    this.cartService.updateCart(this.id, dto).subscribe({
      next: (response) => {
        console.log('Cart updated successfully', response);
        this.router.navigate(['/carts']);
      },
      error: (error) => {
        console.error('Error updating cart', error);
      },
    });
  }
  addItem(): void {
    this.cartItems.push(
      new FormGroup({
        gameId: new FormControl<number | null>(null, Validators.required),
        quantity: new FormControl<number>(1, [
          Validators.required,
          Validators.min(1),
        ]),
        searchControl: new FormControl(''),
        gameTitle: new FormControl(''),
      }),
    );
  }
  removeItem(index: number): void {
    this.cartItems.removeAt(index);
  }
}
