import { Component, inject, signal } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../../../Service/game-service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../Models/Category.models';
import { CategoryService } from '../../../Service/category-service';

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

  categories = signal<Category[]>([]);
  gameForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    category: new FormControl(''),
    releaseDate: new FormControl(''),
    platform: new FormControl(''),
    stock: new FormControl(''),
    image: new FormControl(''),
  });

  id: number = 0;
  route = inject(ActivatedRoute);
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGameById(this.id).subscribe((data) => {
      console.log(data);
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
    });
  }
  loadCategories() {
    this.categoryService.getAllCategorie().subscribe((response) => {
      this.categories.set(response);
    });
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
      this.gameService.addGame(fromData).subscribe((response) => {
        console.log('Game added successfully', response);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
