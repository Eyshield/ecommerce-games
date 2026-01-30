import { Component, inject } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { CategoryService } from '../../../Service/category-service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { destroyScope } from '../../../utils/destroyScope';

@Component({
  selector: 'app-edit-categories',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './edit-categories.html',
  styleUrl: './edit-categories.css',
})
export class EditCategories {
  categoryService = inject(CategoryService);
  private subscriptions = destroyScope();
  route = inject(ActivatedRoute);
  router = inject(Router);
  id: number = 0;
  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.categoryService.getCategoryById(this.id).subscribe((data) => {
        this.categoryForm.patchValue({
          name: data.name,
        });
      }),
    );
  }

  EditCategory() {
    if (this.categoryForm.valid) {
      const category = {
        name: this.categoryForm.get('name')?.value!,
      };
      this.subscriptions.add(
        this.categoryService.updateCategory(this.id, category).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Category Edited Successfully',
              text: 'The category has been edited successfully.',
            });
            this.router.navigate(['/category']);
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error editing Category',
              text: 'There was an error editing the category. Please try again.',
            });
          },
        }),
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill out the form correctly before submitting.',
      });
    }
  }
}
