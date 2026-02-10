import { Component, inject, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { UserService } from '../../../Service/user-service';
import { OrderService } from '../../../Service/order-service';
import { GameService } from '../../../Service/game-service';
import { Page } from '../../../Models/Page.Models';
import { Game } from '../../../Models/Game.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-board',
  imports: [SideBarAdmin],
  templateUrl: './dash-board.html',
  styleUrl: './dash-board.css',
})
export class DashBoard {
  userService = inject(UserService);
  orderService = inject(OrderService);
  usercount = signal<number>(0);
  ordercount = signal<number>(0);
  gameService = inject(GameService);
  totalRevenue = signal<number>(0);
  gameFlops = signal<Page<Game>>({
    content: [],
    page: 0,
    Size: 10,
    totalElements: 0,
    totalPages: 0,
    isFirst: true,
    isLast: false,
  });
  gameBest = signal<Page<Game>>({
    content: [],
    page: 0,
    Size: 10,
    totalElements: 0,
    totalPages: 0,
    isFirst: true,
    isLast: false,
  });
  ngOnInit() {
    this.userService.getAllUsers(10, 0).subscribe({
      next: (response) => {
        this.usercount.set(response.totalElements);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load user count',
        });
      },
    });
    this.orderService.getAllOrders(10, 0).subscribe({
      next: (response) => {
        this.ordercount.set(response.totalElements);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load order count',
        });
      },
    });
    this.orderService.getTotalRevenue().subscribe({
      next: (response) => {
        this.totalRevenue.set(response);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load total revenue',
        });
      },
    });
    this.gameService.getDashGames(0, 5, 0, 5).subscribe({
      next: (response) => {
        this.gameFlops.set(response.flops);

        this.gameBest.set(response.bestsellers);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load games data',
        });
      },
    });
  }
}
