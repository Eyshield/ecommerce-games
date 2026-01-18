import { Component, inject, OnInit, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { RouterLink } from '@angular/router';
import { GameService } from '../../../Service/game-service';
import { Page } from '../../../Models/Page.Models';
import { Game } from '../../../Models/Game.models';

@Component({
  selector: 'app-manage-games',
  imports: [SideBarAdmin, RouterLink],
  templateUrl: './manage-games.html',
  styleUrl: './manage-games.css',
})
export class ManageGames implements OnInit {
  gamesService = inject(GameService);
  gamesPage = signal<Page<Game>>({
    content: [],
    page: 0,
    Size: 10,
    totalElements: 0,
    totalPages: 0,
    isFirst: true,
    isLast: false,
  });
  games = signal<Game[]>([]);
  ngOnInit() {
    this.loadGames(0);
  }
  loadGames(page: number) {
    this.gamesService
      .getAllGames(this.gamesPage().Size, page)
      .subscribe((response) => {
        this.games.set(response.content);
      });
  }
  deleteGame(id: number) {
    this.gamesService.deleteGame(id);
  }
}
