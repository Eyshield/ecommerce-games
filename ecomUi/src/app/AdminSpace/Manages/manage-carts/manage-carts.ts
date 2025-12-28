import { Component } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-carts',
  imports: [SideBarAdmin, RouterLink],
  templateUrl: './manage-carts.html',
  styleUrl: './manage-carts.css',
})
export class ManageCarts {}
