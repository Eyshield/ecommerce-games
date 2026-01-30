import { Component, inject, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GameService } from '../../../Service/game-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../Models/Category.models';
import { CategoryService } from '../../../Service/category-service';
import Swal from 'sweetalert2';
import { destroyScope } from '../../../utils/destroyScope';

@Component({
  selector: 'app-edit-games',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './edit-games.html',
  styleUrl: './edit-games.css',
})
export class EditGames {
  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  gameService = inject(GameService);
  categoryService = inject(CategoryService);
  private subscriptions = destroyScope();
  router = inject(Router);
  categories = signal<Category[]>([]);
  gameForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    category: new FormControl('', Validators.required),
    releaseDate: new FormControl('', Validators.required),
    plateform: new FormControl('', Validators.required),
    homeSection: new FormControl('', Validators.required),
    stock: new FormControl('', [Validators.required, Validators.min(0)]),
    image: new FormControl('', [Validators.required]),
  });

  id: number = 0;
  route = inject(ActivatedRoute);
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.gameService.getGameById(this.id).subscribe((data) => {
        this.gameForm.patchValue({
          title: data.title,
          description: data.description,
          price: String(data.price),
          category: data.category.name,
          releaseDate: new Date(data.releaseDate).toISOString().split('T')[0],
          stock: String(data.stock),
          image: data.imageUrl,
        });
        this.previewImage = data.imageUrl;
      }),
    );
  }
  loadCategories() {
    this.subscriptions.add(
      this.categoryService.getAllCategorie().subscribe((response) => {
        this.categories.set(response);
      }),
    );
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewImage = URL.createObjectURL(file);
    } else {
      this.previewImage = null;
    }
  }
  editGame() {
    if (this.gameForm.valid) {
      const fromData = new FormData();
      for (const [Key, value] of Object.entries(this.gameForm.value)) {
        fromData.append(Key, value as string);
      }
      if (this.selectedFile) {
        fromData.append('image', this.selectedFile);
      }
      this.subscriptions.add(
        this.gameService.updateGame(this.id, fromData).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Game Edited Successfully',
              text: 'The game has been edited successfully.',
            });
            this.router.navigate(['/games']);
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error Editing Game',
              text: 'There was an error editing the game. Please try again.',
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
