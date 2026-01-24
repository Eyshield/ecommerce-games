import { Component, inject, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { CartService } from '../../../Service/cart-service';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GameService } from '../../../Service/game-service';
import { Game } from '../../../Models/Game.models';
import { Page } from '../../../Models/Page.Models';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { user } from '../../../Models/User.models';
import { UserService } from '../../../Service/user-service';
import { cartRequestDto } from '../../../Models/CartRequestDto.models';

@Component({
  selector: 'app-add-carts',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './add-carts.html',
  styleUrl: './add-carts.css',
})
export class AddCarts {
  cartService = inject(CartService);
  gameService = inject(GameService);
  userService = inject(UserService);

  games = signal<Page<Game>>({
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
    cartItemRequests: new FormArray<FormGroup>([]),
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

  get cartItems(): FormArray {
    return this.cartForm.get('cartItemRequests') as FormArray;
  }

  ngOnInit() {
    this.userSearch.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (value && value.length >= 2) {
          this.searchUsers(value);
        } else {
          this.customers.set({ ...this.customers(), content: [] });
        }
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

  addCart(): void {
    if (this.cartForm.valid) {
      const cartData: cartRequestDto = {
        userId: this.cartForm.value.userId!,
        cartItemRequests: this.cartItems.value.map((item: any) => ({
          gameId: item.gameId,
          quantity: item.quantity,
        })),
      };
      console.log('Submitting cart data:', cartData);

      this.cartService.addToCart(cartData).subscribe({
        next: (response) => {
          console.log('Cart added successfully', response);
          this.cartForm.reset();
          this.cartItems.clear();
          this.userSearch.reset();
        },
        error: (error) => {
          console.error('Error adding cart', error);
        },
      });
    }
  }
}
