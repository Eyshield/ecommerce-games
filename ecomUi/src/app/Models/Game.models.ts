import { Category } from './Category.models';

export interface Game {
  id?: number;
  title: string;
  category: Category;
  platform: string;
  releaseDate: Date;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
}
