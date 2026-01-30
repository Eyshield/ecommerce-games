import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../Widget/navbar/navbar';
import { Game } from '../../Models/Game.models';
import { GameService } from '../../Service/game-service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../Service/order-service';
import { AuthService } from '../../Service/auth-service';
import { orderRequestDto } from '../../Models/OrderRequestDto';
import Swal from 'sweetalert2';
import { destroyScope } from '../../utils/destroyScope';

@Component({
  selector: 'app-presentation-game',
  imports: [Navbar],
  templateUrl: './presentation-game.html',
  styleUrl: './presentation-game.css',
})
export class PresentationGame {
  game = signal<Game | null>(null);
  orderService = inject(OrderService);
  gameService = inject(GameService);
  private subscriptions = destroyScope();
  authService = inject(AuthService);
  router = inject(ActivatedRoute);
  ngOnInit() {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.gameService.getGameByIdForUsers(id).subscribe((response) => {
        this.game.set(response);
      }),
    );
  }
  makeOrder() {
    if (!this.authService.isLoggedIn()) {
      this.authService.Login();
      return;
    }

    if (!this.game()) return;

    const orderDto: orderRequestDto = {
      userId: this.authService.getCurrentUserId(),
      orderItemRequest: [
        {
          gameId: this.game()!.id!,
          quantity: 1,
        },
      ],
    };
    this.subscriptions.add(
      this.orderService.placeOrder(orderDto).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Order Placed Successfully',
            text: 'Thank you for your purchase!',
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Order Failed',
            text: 'There was an issue placing your order. Please try again later.',
          });
        },
      }),
    );
  }
}
