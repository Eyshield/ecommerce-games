import { Routes } from '@angular/router';
import { Home } from './SharedC/home/home';
import { PresentationGame } from './SharedC/presentation-game/presentation-game';
import { Cart } from './SharedC/cart/cart';
import { DashBoardPersonelAccount } from './SharedC/dash-board-personel-account/dash-board-personel-account';
import { DashBoard } from './AdminSpace/dash-board/dash-board';
import { ManageUser } from './AdminSpace/manage-user/manage-user';
import { Managecategory } from './AdminSpace/managecategory/managecategory';
import { ManageGames } from './AdminSpace/manage-games/manage-games';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'presentation-game/:id', component: PresentationGame },
  { path: 'cart', component: Cart },
  { path: 'personal', component: DashBoardPersonelAccount },
  { path: 'dashboard', component: DashBoard },
  { path: 'user', component: ManageUser },
  { path: 'category', component: Managecategory },
  { path: 'games', component: ManageGames },
];
