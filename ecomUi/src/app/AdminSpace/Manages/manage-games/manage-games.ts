import { Component, inject, OnInit, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { RouterLink } from '@angular/router';
import { GameService } from '../../../Service/game-service';
import { Page } from '../../../Models/Page.Models';
import { Game } from '../../../Models/Game.models';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-games',
  imports: [SideBarAdmin, RouterLink, ReactiveFormsModule],
  templateUrl: './manage-games.html',
  styleUrl: './manage-games.css',
})
export class ManageGames implements OnInit {
  gamesService = inject(GameService);
  searchTerm = new FormControl('');
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
    this.loadGames();
  }
  loadGames() {
    if (this.searchTerm.value !== '' && this.searchTerm.value) {
      this.gamesService
        .searchGames(this.searchTerm.value)
        .subscribe((response) => {
          this.gamesPage.set(response);
          this.games.set(response.content);
        });
    } else {
      this.games.set([]);
      this.gamesPage().page = 0;

      this.gamesService
        .getAllGames(this.gamesPage().Size, this.gamesPage().page)
        .subscribe((response) => {
          this.gamesPage.set(response);
          this.games.set(response.content);
        });
    }
  }
  deleteGame(id: number) {
    this.gamesService.deleteGame(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Game Deleted Successfully',
          text: 'The game has been deleted successfully.',
        });
        this.loadGames();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error Deleting Game',
          text: 'There was an error deleting the game. Please try again.',
        });
      },
    });
  }
  nextPage() {
    if (this.gamesPage().page < this.gamesPage().totalPages - 1) {
      this.gamesPage().page++;
      this.loadGames();
    }
  }

  prevPage() {
    if (this.gamesPage().page > 0) {
      this.gamesPage().page--;
      this.loadGames();
    }
  }
}
