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

@Component({
  selector: 'app-edit-categories',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './edit-categories.html',
  styleUrl: './edit-categories.css',
})
export class EditCategories {
  categoryService = inject(CategoryService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  id: number = 0;
  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getCategoryById(this.id).subscribe((data) => {
      this.categoryForm.patchValue({
        name: data.name,
      });
    });
  }

  EditCategory() {
    if (this.categoryForm.valid) {
      const category = {
        name: this.categoryForm.get('name')?.value!,
      };
      this.categoryService
        .updateCategory(this.id, category)
        .subscribe((response) => {
          console.log('Category added successfully', response);
          this.router.navigate(['/category']);
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
