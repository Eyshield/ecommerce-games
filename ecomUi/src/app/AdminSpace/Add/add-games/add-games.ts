import { Component, inject } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { GameService } from '../../../Service/game-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-games',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './add-games.html',
  styleUrl: './add-games.css',
})
export class AddGames {
  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  gameService = inject(GameService);
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
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewImage = URL.createObjectURL(file);
    } else {
      this.previewImage = null;
    }
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
