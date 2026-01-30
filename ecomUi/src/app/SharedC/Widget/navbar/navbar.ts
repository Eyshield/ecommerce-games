import { Component, inject, signal } from '@angular/core';
import { UserMenu } from '../user-menu/user-menu';
import { AuthService } from '../../../Service/auth-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../../../Service/game-service';
import { Game } from '../../../Models/Game.models';
import { Page } from '../../../Models/Page.Models';
import { Router } from '@angular/router';
import { destroyScope } from '../../../utils/destroyScope';

@Component({
  selector: 'app-navbar',
  imports: [UserMenu, ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  searchTerm = new FormControl('');
  gameService = inject(GameService);
  router = inject(Router);
  games = signal<Game[]>([]);
  private subscriptions = destroyScope();
  gamePage = signal<Page<Game>>({
    content: [],
    page: 0,
    Size: 10,
    totalElements: 0,
    totalPages: 0,
    isFirst: true,
    isLast: false,
  });
  Register() {
    this.authService.Register();
  }
  searchGames() {
    if (this.searchTerm.value !== '' && this.searchTerm.value) {
      this.subscriptions.add(
        this.gameService
          .searchGames(this.searchTerm.value)
          .subscribe((response) => {
            this.gamePage.set(response);
            this.games.set(response.content);
          }),
      );
    } else {
      this.games.set([]);
      this.gamePage().content = [];
    }
  }
  onSelecGame(id: number) {
    this.router.navigate(['/presentation-game', id]);
  }
  Login() {
    this.authService.Login();
  }
  authService = inject(AuthService);
  isLoggedIn = this.authService.isLoggedIn();
}
