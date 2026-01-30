import { Component, inject, OnInit, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { RouterLink } from '@angular/router';

import { Page } from '../../../Models/Page.Models';
import { CartService } from '../../../Service/cart-service';
import { Cart } from '../../../Models/Cart.models';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { destroyScope } from '../../../utils/destroyScope';

@Component({
  selector: 'app-manage-carts',
  imports: [SideBarAdmin, RouterLink, ReactiveFormsModule],
  templateUrl: './manage-carts.html',
  styleUrl: './manage-carts.css',
})
export class ManageCarts implements OnInit {
  carts = signal<Cart[]>([]);
  private subscriptions = destroyScope();
  searchTerm = new FormControl('');
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
    this.loadCarts();
  }
  loadCarts() {
    if (this.searchTerm.value !== '' && this.searchTerm.value) {
      this.subscriptions.add(
        this.cartService
          .searchCarts(this.searchTerm.value)
          .subscribe((response) => {
            this.pageCarts.set(response);
            this.carts.set(response.content);
          }),
      );
    } else {
      this.carts.set([]);
      this.pageCarts().page = 0;
      this.subscriptions.add(
        this.cartService
          .getAllCarts(this.pageCarts().page, this.pageCarts().Size)
          .subscribe((response) => {
            this.pageCarts.set(response);
            this.carts.set(response.content);
          }),
      );
    }
  }
  removeCart(id: number) {
    this.subscriptions.add(
      this.cartService.removeCart(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Cart Removed Successfully',
            text: 'The cart has been removed successfully.',
          });
          this.loadCarts();
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error removing Cart',
            text: 'There was an error removing the cart. Please try again.',
          });
        },
      }),
    );
  }
  nextPage() {
    if (this.pageCarts().page < this.pageCarts().totalPages - 1) {
      this.pageCarts().page++;
      this.loadCarts();
    }
  }

  prevPage() {
    if (this.pageCarts().page > 0) {
      this.pageCarts().page--;
      this.loadCarts();
    }
  }
}
