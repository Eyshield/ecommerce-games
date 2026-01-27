import { Component, inject, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { OrderService } from '../../../Service/order-service';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Game } from '../../../Models/Game.models';
import { user } from '../../../Models/User.models';
import { GameService } from '../../../Service/game-service';
import { UserService } from '../../../Service/user-service';
import { Page } from '../../../Models/Page.Models';
import { orderRequestDto } from '../../../Models/OrderRequestDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-orders',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './add-orders.html',
  styleUrl: './add-orders.css',
})
export class AddOrders {
  orderService = inject(OrderService);
  gameService = inject(GameService);
  userService = inject(UserService);
  router = inject(Router);
  searchGame = new FormControl('');
  orderForm = new FormGroup({
    userId: new FormControl<number | null>(null, Validators.required),
    orderItemRequests: new FormArray<FormGroup>([]),
  });
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
  ngOnInit() {
    this.searchGame.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (value && value.length >= 2) {
          this.searchGames(value);
        } else {
          this.games.set({ ...this.games(), content: [] });
        }
      });
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
    this.orderForm.patchValue({ userId: customer.id });
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
    const item = this.orderItems.at(index);
    item.patchValue({
      gameId: game.id,
      gameTitle: game.title,
      searchControl: '',
    });

    this.games.set({ ...this.games(), content: [] });
  }
  onGameSearch(value: string, index: number): void {
    if (value && value.length >= 2) {
      this.searchGames(value);
    } else {
      this.games.set({ ...this.games(), content: [] });
    }
  }

  get orderItems(): FormArray {
    return this.orderForm.get('orderItemRequests') as FormArray;
  }
  addItem(): void {
    this.orderItems.push(
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
    this.orderItems.removeAt(index);
  }

  makeOrder(): void {
    if (this.orderForm.valid) {
      const orderData: orderRequestDto = {
        userId: this.orderForm.value.userId!,
        orderItemRequest: this.orderItems.value.map((item: any) => ({
          gameId: item.gameId,
          quantity: item.quantity,
        })),
      };
      console.log('Submitting order data:', orderData);

      this.orderService.placeOrder(orderData).subscribe({
        next: (response) => {
          console.log('order added successfully', response);
          this.router.navigate(['/orders']);
          this.orderForm.reset();
          this.orderItems.clear();
          this.userSearch.reset();
        },
        error: (error) => {
          console.error('Error adding cart', error);
        },
      });
    }
  }
}
