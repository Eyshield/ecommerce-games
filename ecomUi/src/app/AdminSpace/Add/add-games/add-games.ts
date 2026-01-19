import { Component, inject, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { GameService } from '../../../Service/game-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../../Service/category-service';
import { Category } from '../../../Models/Category.models';

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
  categories = signal<Category[]>([]);
  gameForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    categoryId: new FormControl<number | null>(null),
    releaseDate: new FormControl(''),
    platform: new FormControl(''),
    stock: new FormControl(''),
    image: new FormControl(''),
  });
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewImage = URL.createObjectURL(file);
    } else {
      this.previewImage = null;
    }
  }
  loadCategories() {
    this.categoryService.getAllCategorie().subscribe((response) => {
      this.categories.set(response);
    });
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
      this.gameService.addGame(fromData).subscribe((response) => {
        console.log('Game added successfully', response);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
