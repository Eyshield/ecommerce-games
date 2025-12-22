import { Routes } from '@angular/router';
import { Home } from './SharedC/home/home';
import { PresentationGame } from './SharedC/presentation-game/presentation-game';
import { Cart } from './SharedC/cart/cart';
import { DashBoardPersonelAccount } from './SharedC/dash-board-personel-account/dash-board-personel-account';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'presentation-game/:id', component: PresentationGame },
  { path: 'cart', component: Cart },
  { path: 'personal', component: DashBoardPersonelAccount },
];
