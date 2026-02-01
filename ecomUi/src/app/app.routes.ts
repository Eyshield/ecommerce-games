import { Routes } from '@angular/router';
import { Home } from './SharedC/home/home';
import { PresentationGame } from './SharedC/presentation-game/presentation-game';
import { Cart } from './SharedC/cart/cart';
import { DashBoardPersonelAccount } from './SharedC/dash-board-personel-account/dash-board-personel-account';
import { DashBoard } from './AdminSpace/Manages/dash-board/dash-board';
import { ManageCarts } from './AdminSpace/Manages/manage-carts/manage-carts';
import { ManageGames } from './AdminSpace/Manages/manage-games/manage-games';
import { ManageOrders } from './AdminSpace/Manages/manage-orders/manage-orders';
import { ManageUser } from './AdminSpace/Manages/manage-user/manage-user';
import { Managecategory } from './AdminSpace/Manages/managecategory/managecategory';
import { AddUsers } from './AdminSpace/Add/add-users/add-users';
import { AddCategories } from './AdminSpace/Add/add-categories/add-categories';
import { AddGames } from './AdminSpace/Add/add-games/add-games';
import { AddOrders } from './AdminSpace/Add/add-orders/add-orders';
import { AddCarts } from './AdminSpace/Add/add-carts/add-carts';
import { EditCarts } from './AdminSpace/Edit/edit-carts/edit-carts';
import { EditCategories } from './AdminSpace/Edit/edit-categories/edit-categories';
import { EditGames } from './AdminSpace/Edit/edit-games/edit-games';
import { EditOrders } from './AdminSpace/Edit/edit-orders/edit-orders';
import { EditUsers } from './AdminSpace/Edit/edit-users/edit-users';
import { Redirect } from './SharedC/Widget/redirect/redirect';
import { authGuard } from './Guards/auth-guard';
import { authAdminGuard } from './Guards/auth-admin-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'redirect', component: Redirect },
  { path: 'presentation-game/:id', component: PresentationGame },
  { path: 'cart', component: Cart },
  {
    path: 'personal',
    component: DashBoardPersonelAccount,
    canActivate: [authGuard],
  },
  { path: 'dashboard', component: DashBoard, canActivate: [authAdminGuard] },
  { path: 'user', component: ManageUser, canActivate: [authAdminGuard] },
  {
    path: 'category',
    component: Managecategory,
    canActivate: [authAdminGuard],
  },
  { path: 'games', component: ManageGames, canActivate: [authAdminGuard] },
  { path: 'orders', component: ManageOrders, canActivate: [authAdminGuard] },
  { path: 'carts', component: ManageCarts, canActivate: [authAdminGuard] },
  { path: 'addUsers', component: AddUsers, canActivate: [authAdminGuard] },
  {
    path: 'addCategory',
    component: AddCategories,
    canActivate: [authAdminGuard],
  },
  { path: 'addGames', component: AddGames, canActivate: [authAdminGuard] },
  { path: 'addOrders', component: AddOrders, canActivate: [authAdminGuard] },
  { path: 'addCarts', component: AddCarts, canActivate: [authAdminGuard] },
  {
    path: 'editGames/:id',
    component: EditGames,
    canActivate: [authAdminGuard],
  },
  {
    path: 'editCategory/:id',
    component: EditCategories,
    canActivate: [authAdminGuard],
  },
  {
    path: 'editOrders/:id',
    component: EditOrders,
    canActivate: [authAdminGuard],
  },
  {
    path: 'editCarts/:id',
    component: EditCarts,
    canActivate: [authAdminGuard],
  },
  {
    path: 'editUsers/:id',
    component: EditUsers,
    canActivate: [authAdminGuard],
  },
];
