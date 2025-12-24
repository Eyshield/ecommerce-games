import { Component } from '@angular/core';
import { SideBarAdmin } from '../../SharedC/Widget/side-bar-admin/side-bar-admin';

@Component({
  selector: 'app-manage-games',
  imports: [SideBarAdmin],
  templateUrl: './manage-games.html',
  styleUrl: './manage-games.css',
})
export class ManageGames {}
