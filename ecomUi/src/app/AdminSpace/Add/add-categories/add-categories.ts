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
import Swal from 'sweetalert2';

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
      this.categoryService.addCategory(category).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Category Added Successfully',
            text: 'The category has been added successfully.',
          });
          this.router.navigate(['/category']);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error Adding Category',
            text: 'There was an error adding the category. Please try again.',
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill out the form correctly before submitting.',
      });
    }
  }
}
