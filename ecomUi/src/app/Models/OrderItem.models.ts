import { Game } from './Game.models';

export interface OrderItem {
  id?: number;
  game: Game;
  quantity: number;
  price: number;
}
