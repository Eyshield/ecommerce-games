import { Component, inject, OnInit, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { RouterLink } from '@angular/router';
import { Cart } from '../../../SharedC/cart/cart';
import { Page } from '../../../Models/Page.Models';
import { CartService } from '../../../Service/cart-service';

@Component({
  selector: 'app-manage-carts',
  imports: [SideBarAdmin, RouterLink],
  templateUrl: './manage-carts.html',
  styleUrl: './manage-carts.css',
})
export class ManageCarts implements OnInit {
  carts = signal<Cart[]>([]);
  cartService = inject(CartService);
  pageCarts = signal<Page<Cart>>({
    content: [],
    page: 0,
    Size: 10,
    totalElements: 0,
    totalPages: 0,
    isFirst: true,
    isLast: false,
  });
  ngOnInit() {
    this.loadCarts(0);
  }
  loadCarts(page: number) {
    this.cartService
      .getAllCarts(page, this.pageCarts().Size)
      .subscribe((response) => {
        this.pageCarts.set(response);
        this.carts.set(response.content);
      });
  }
}
