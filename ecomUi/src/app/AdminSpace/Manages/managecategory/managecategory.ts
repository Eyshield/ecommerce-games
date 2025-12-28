import { Component } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-managecategory',
  imports: [SideBarAdmin, RouterLink],
  templateUrl: './managecategory.html',
  styleUrl: './managecategory.css',
})
export class Managecategory {}
