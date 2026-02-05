import { Component, inject, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { GameService } from '../../../Service/game-service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../../Service/category-service';
import { Category } from '../../../Models/Category.models';
import Swal from 'sweetalert2';
import { destroyScope } from '../../../utils/destroyScope';

@Component({
  selector: 'app-add-games',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './add-games.html',
  styleUrl: './add-games.css',
})
export class AddGames {
  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  router = inject(Router);
  categoryService = inject(CategoryService);
  gameService = inject(GameService);
  private subscriptions = destroyScope();
  categories = signal<Category[]>([]);
  gameForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    categoryId: new FormControl<number | null>(null, Validators.required),
    releaseDate: new FormControl('', Validators.required),
    plateform: new FormControl('', Validators.required),
    homeSection: new FormControl('', Validators.required),
    stock: new FormControl('', [Validators.required, Validators.min(0)]),
    image: new FormControl(''),
  });
  ngOnInit() {
    this.loadCategories();
  }
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      this.selectedFile = file;
      this.previewImage = URL.createObjectURL(file);
    } else {
      this.previewImage = null;
    }
  }
  loadCategories() {
    this.subscriptions.add(
      this.categoryService.getAllCategorie().subscribe((response) => {
        this.categories.set(response);
      }),
    );
  }
  AddGame() {
    if (this.gameForm.valid) {
      const fromData = new FormData();
      for (const [Key, value] of Object.entries(this.gameForm.value)) {
        fromData.append(Key, value as string);
      }
      if (this.selectedFile) {
        fromData.append('image', this.selectedFile);
      }
      this.subscriptions.add(
        this.gameService.addGame(fromData).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Game Added Successfully',
              text: 'The game has been added successfully.',
            });
            this.router.navigate(['/games']);
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error Adding Game',
              text: 'There was an error adding the game. Please try again.',
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
