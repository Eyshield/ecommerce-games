import { Component, input } from '@angular/core';

@Component({
  selector: 'app-list-games',
  imports: [],
  templateUrl: './list-games.html',
  styleUrl: './list-games.css',
})
export class ListGames {
  game = input<any>();
}
