import { Game } from './Game.models';

export interface Category {
  id?: number;
  name: string;
  games?: Game[];
}
