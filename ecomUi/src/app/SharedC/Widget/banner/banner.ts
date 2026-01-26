import { Component, input } from '@angular/core';
import { Game } from '../../../Models/Game.models';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  game = input<Game | null>();
}
