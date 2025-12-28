import { Component } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-user',
  imports: [SideBarAdmin, RouterLink],
  templateUrl: './manage-user.html',
  styleUrl: './manage-user.css',
})
export class ManageUser {}
