import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-games',
  imports: [],
  templateUrl: './list-games.html',
  styleUrl: './list-games.css',
})
export class ListGames {
  router = inject(Router);
  game = input<any>();
  navigatePresentaionGame(id: number) {
    this.router.navigate(['/presentation-game', id]);
  }
}
