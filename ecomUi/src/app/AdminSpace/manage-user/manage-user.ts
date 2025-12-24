import { Component } from '@angular/core';
import { SideBarAdmin } from '../../SharedC/Widget/side-bar-admin/side-bar-admin';

@Component({
  selector: 'app-manage-user',
  imports: [SideBarAdmin],
  templateUrl: './manage-user.html',
  styleUrl: './manage-user.css',
})
export class ManageUser {}
