import { Routes } from '@angular/router';
import { Home } from './SharedC/home/home';
import { PresentationGame } from './SharedC/presentation-game/presentation-game';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'presentation-game/:id', component: PresentationGame },
];
