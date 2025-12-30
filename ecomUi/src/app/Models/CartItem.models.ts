import { Game } from './Game.models';

export interface CartItem {
  id?: number;
  game: Game;
  quantity: number;
  price: number;
}
