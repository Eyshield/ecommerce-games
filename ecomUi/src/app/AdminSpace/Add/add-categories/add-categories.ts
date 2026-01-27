import { Component, inject } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { CategoryService } from '../../../Service/category-service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-categories',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './add-categories.html',
  styleUrl: './add-categories.css',
})
export class AddCategories {
  categoryService = inject(CategoryService);
  router = inject(Router);
  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  AddCategory() {
    if (this.categoryForm.valid) {
      const category = {
        name: this.categoryForm.get('name')?.value!,
      };
      this.categoryService.addCategory(category).subscribe((response) => {
        console.log('Category added successfully', response);
        this.router.navigate(['/category']);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
