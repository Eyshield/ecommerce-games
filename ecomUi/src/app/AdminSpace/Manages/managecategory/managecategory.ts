import { Component, inject, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../Service/category-service';
import { Page } from '../../../Models/Page.Models';
import { Category } from '../../../Models/Category.models';

@Component({
  selector: 'app-managecategory',
  imports: [SideBarAdmin, RouterLink],
  templateUrl: './managecategory.html',
  styleUrl: './managecategory.css',
})
export class Managecategory {
  categoryService = inject(CategoryService);
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
    this.loadCategories(0);
  }
  loadCategories(page: number) {
    this.categoryService
      .getAllCategories(this.categoriePage().Size, page)
      .subscribe((response) => {
        this.categoriePage.set(response);
        this.categories.set(response.content);
      });
  }
  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id);
  }
}
