import { Category } from './Category.models';

export interface Game {
  id?: number;
  title: string;
  category: Category;
  plateform: string;
  releaseDate: Date;
  price: number;
  stock: number;
  homeSection: string;
  description: string;
  imageUrl: string;
}
