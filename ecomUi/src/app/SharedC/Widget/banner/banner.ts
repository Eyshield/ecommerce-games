import { Component, input } from '@angular/core';
import { Game } from '../../../Models/Game.models';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  game = input<Game[] | null>();
  currentIndex = 0;

  currentGame(): Game | null {
    const games = this.game();
    return games && games.length ? games[this.currentIndex] : null;
  }

  next() {
    const games = this.game();
    this.currentIndex = (this.currentIndex + 1) % (games?.length ?? 1);
  }

  prev() {
    const games = this.game();
    this.currentIndex =
      (this.currentIndex - 1 + (games?.length ?? 1)) % (games?.length ?? 1);
  }
}
