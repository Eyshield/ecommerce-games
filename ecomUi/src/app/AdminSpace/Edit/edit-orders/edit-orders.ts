import { Component, inject, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderService } from '../../../Service/order-service';
import { ActivatedRoute, Router } from '@angular/router';
import { orderRequestDto } from '../../../Models/OrderRequestDto';
import { Game } from '../../../Models/Game.models';
import { Page } from '../../../Models/Page.Models';
import { user } from '../../../Models/User.models';
import { UserService } from '../../../Service/user-service';
import { GameService } from '../../../Service/game-service';
import Swal from 'sweetalert2';
import { destroyScope } from '../../../utils/destroyScope';

@Component({
  selector: 'app-edit-orders',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './edit-orders.html',
  styleUrl: './edit-orders.css',
})
export class EditOrders {
  orderService = inject(OrderService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  private subscriptions = destroyScope();
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
  searchUsers(keyword: string) {
    this.subscriptions.add(
      this.userService.searchUsers(keyword).subscribe({
        next: (response) => this.customers.set(response),
        error: () => this.customers.set({ ...this.customers(), content: [] }),
      }),
    );
  }

  selectCustomer(customer: user) {
    this.orderForm.patchValue({ userId: customer.id });
    this.userSearch.setValue(`${customer.nom} ${customer.prenom}`);
    this.customers.set({ ...this.customers(), content: [] });
  }

  searchGames(keyword: string) {
    this.subscriptions.add(
      this.gameService.searchGames(keyword).subscribe({
        next: (response) => this.games.set(response),
        error: () => this.games.set({ ...this.games(), content: [] }),
      }),
    );
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

  createItem(): FormGroup {
    return new FormGroup({
      gameId: new FormControl<number | null>(null, Validators.required),
      gameLabel: new FormControl(''),
      quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }

  loadOrder(): void {
    this.subscriptions.add(
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
      }),
    );
  }

  updateOrder(): void {
    if (this.orderForm.valid) {
      const dto: orderRequestDto = {
        userId: this.orderForm.value.userId!,
        orderItemRequest: this.orderForm.value.orderItmeRequest!.map(
          (item) => ({
            gameId: item.gameId!,
            quantity: item.quantity,
          }),
        ),
      };
      this.subscriptions.add(
        this.orderService.updateOrder(this.id, dto).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Order Edited Successfully',
              text: 'The order has been edited successfully.',
            });
            this.router.navigate(['/orders']);
            this.orderForm.reset();
            this.orderItems.clear();
            this.userSearch.reset();
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Order failed',
              text: 'there was an error editing the order. Please try again.',
            });
          },
        }),
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill out the form correctly before submitting.',
      });
    }
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
}
