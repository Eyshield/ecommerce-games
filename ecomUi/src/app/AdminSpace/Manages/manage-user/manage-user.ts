import { Component, inject, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../Service/user-service';
import { user } from '../../../Models/User.models';
import { Page } from '../../../Models/Page.Models';

@Component({
  selector: 'app-manage-user',
  imports: [SideBarAdmin, RouterLink],
  templateUrl: './manage-user.html',
  styleUrl: './manage-user.css',
})
export class ManageUser {
  userService = inject(UserService);
  userPage = signal<Page<user>>({
    content: [],
    page: 0,
    Size: 10,
    totalElements: 0,
    totalPages: 0,
    isFirst: true,
    isLast: false,
  });
  users = signal<user[]>([]);
  ngOnInit() {
    this.loadUsers(0);
  }
  loadUsers(page: number) {
    this.userService
      .getAllUsers(page, this.userPage().Size)
      .subscribe((response) => {
        this.userPage.set(response);
        this.users.set(response.content);
      });
  }
}
