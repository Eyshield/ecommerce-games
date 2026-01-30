import { Component, inject, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../Service/category-service';
import { Page } from '../../../Models/Page.Models';
import { Category } from '../../../Models/Category.models';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { destroyScope } from '../../../utils/destroyScope';

@Component({
  selector: 'app-managecategory',
  imports: [SideBarAdmin, RouterLink, ReactiveFormsModule],
  templateUrl: './managecategory.html',
  styleUrl: './managecategory.css',
})
export class Managecategory {
  categoryService = inject(CategoryService);
  private subscriptions = destroyScope();
  searchTerm = new FormControl('');
  categoriePage = signal<Page<Category>>({
    content: [],
    page: 0,
    Size: 10,
    totalElements: 0,
    totalPages: 0,
    isFirst: true,
    isLast: false,
  });
  categories = signal<Category[]>([]);
  ngOnInit() {
    this.loadCategories();
  }
  loadCategories() {
    if (this.searchTerm.value !== '' && this.searchTerm.value) {
      this.subscriptions.add(
        this.categoryService
          .searchCategories(this.searchTerm.value)
          .subscribe((response) => {
            this.categoriePage.set(response);
            this.categories.set(response.content);
          }),
      );
    } else {
      this.categories.set([]);
      this.categoriePage().page = 0;
      this.subscriptions.add(
        this.categoryService
          .getAllCategories(
            this.categoriePage().Size,
            this.categoriePage().page,
          )
          .subscribe((response) => {
            this.categoriePage.set(response);
            this.categories.set(response.content);
          }),
      );
    }
  }
  deleteCategory(id: number) {
    this.subscriptions.add(
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Category Deleted Successfully',
            text: 'The category has been deleted successfully.',
          });

          this.loadCategories();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error deleting Category',
            text: 'There was an error deleting the category. Please try again.',
          });
        },
      }),
    );
  }
}
