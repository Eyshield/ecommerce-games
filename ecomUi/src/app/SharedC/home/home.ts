import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../Widget/navbar/navbar';
import { Banner } from '../Widget/banner/banner';
import { ListGames } from '../Widget/list-games/list-games';
import { GameService } from '../../Service/game-service';
import { Game } from '../../Models/Game.models';
import { Page } from '../../Models/Page.Models';

@Component({
  selector: 'app-home',
  imports: [Navbar, Banner, ListGames],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  gameService = inject(GameService);

  banners = signal<Page<Game> | null>(null);
  upcoming = signal<Page<Game> | null>(null);
  bestsellers = signal<Page<Game> | null>(null);

  constructor() {
    this.loadHomeGames();
  }

  loadHomeGames(): void {
    this.gameService.getHomeGames().subscribe({
      next: (res) => {
        this.banners.set(res.banners);
        this.upcoming.set(res.upcoming);
        this.bestsellers.set(res.bestsellers);
      },
      error: () => {
        console.error('Failed to load home games');
      },
    });
  }
}
