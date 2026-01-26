import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../Widget/navbar/navbar';
import { Game } from '../../Models/Game.models';
import { GameService } from '../../Service/game-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-presentation-game',
  imports: [Navbar],
  templateUrl: './presentation-game.html',
  styleUrl: './presentation-game.css',
})
export class PresentationGame {
  game = signal<Game | null>(null);
  gameService = inject(GameService);
  router = inject(ActivatedRoute);
  ngOnInit() {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.gameService.getGameByIdForUsers(id).subscribe((response) => {
      this.game.set(response);
    });
  }
}
