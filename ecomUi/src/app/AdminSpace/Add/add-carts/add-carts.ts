import { Component, inject, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { CartService } from '../../../Service/cart-service';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GameService } from '../../../Service/game-service';
import { Game } from '../../../Models/Game.models';
import { Page } from '../../../Models/Page.Models';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-add-carts',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './add-carts.html',
  styleUrl: './add-carts.css',
})
export class AddCarts {
  cartService = inject(CartService);
  gameService = inject(GameService);
  searchGame = new FormControl('');
  games = signal<Page<Game>>({
    content: [],
    page: 0,
    Size: 10,
    totalElements: 0,
    totalPages: 0,
    isFirst: true,
    isLast: false,
  });
  cartForm = new FormGroup({
    userId: new FormControl('', Validators.required),
    cartItmeRequest: new FormArray<FormGroup>([]),
  });

  get cartItems(): FormArray {
    return this.cartForm.get('cartItmeRequest') as FormArray;
  }

  ngOnInit() {
    this.searchGame.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (value && value.length >= 2) {
          this.searchGames(value);
        } else {
          this.games.set({ ...this.games(), content: [] });
        }
      });
  }

  searchGames(keyword: string) {
    this.gameService.searchGames(keyword).subscribe({
      next: (response) => this.games.set(response),
      error: () => this.games.set({ ...this.games(), content: [] }),
    });
  }
  selectGame(game: Game): void {
    this.cartItems.push(
      new FormGroup({
        gameId: new FormControl(game.id, Validators.required),
        quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      }),
    );

    this.searchGame.reset();
    this.games.set({ ...this.games(), content: [] });
  }

  addItem(): void {
    this.cartItems.push(
      new FormGroup({
        gameId: new FormControl(null, Validators.required),
        quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      }),
    );
  }

  removeItem(index: number): void {
    this.cartItems.removeAt(index);
  }

  addCart(): void {
    if (this.cartForm.valid) {
      this.cartService.addToCart(this.cartForm.value as any).subscribe();
    }
  }
}
