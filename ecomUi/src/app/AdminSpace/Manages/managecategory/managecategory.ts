import { Component, inject, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../Service/category-service';
import { Page } from '../../../Models/Page.Models';
import { Category } from '../../../Models/Category.models';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-managecategory',
  imports: [SideBarAdmin, RouterLink, ReactiveFormsModule],
  templateUrl: './managecategory.html',
  styleUrl: './managecategory.css',
})
export class Managecategory {
  categoryService = inject(CategoryService);
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
      this.categoryService
        .searchCategories(this.searchTerm.value)
        .subscribe((response) => {
          this.categoriePage.set(response);
          this.categories.set(response.content);
        });
    } else {
      this.categories.set([]);
      this.categoriePage().page = 0;

      this.categoryService
        .getAllCategories(this.categoriePage().Size, this.categoriePage().page)
        .subscribe((response) => {
          this.categoriePage.set(response);
          this.categories.set(response.content);
        });
    }
  }
  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.loadCategories();
    });
  }
}
