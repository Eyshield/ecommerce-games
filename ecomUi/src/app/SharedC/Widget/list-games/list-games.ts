import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../../Models/Game.models';
import { cartStore } from '../../../CartStore/cart.store';

@Component({
  selector: 'app-list-games',
  imports: [],
  templateUrl: './list-games.html',
  styleUrl: './list-games.css',
})
export class ListGames {
  cartStore = inject(cartStore);
  addToCart(game: Game) {
    this.cartStore.addToCart(game, 1);
  }
  router = inject(Router);
  games = input<Game[]>([]);
  navigatePresentaionGame(id: number) {
    this.router.navigate(['/presentation-game', id]);
  }
}
