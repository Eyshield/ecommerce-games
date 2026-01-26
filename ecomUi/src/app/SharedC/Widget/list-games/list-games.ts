import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../../Models/Game.models';

@Component({
  selector: 'app-list-games',
  imports: [],
  templateUrl: './list-games.html',
  styleUrl: './list-games.css',
})
export class ListGames {
  router = inject(Router);
  game = input<Game>();
  navigatePresentaionGame(id: number) {
    this.router.navigate(['/presentation-game', id]);
  }
}
