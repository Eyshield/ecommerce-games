import { Component } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';

@Component({
  selector: 'app-edit-games',
  imports: [SideBarAdmin],
  templateUrl: './edit-games.html',
  styleUrl: './edit-games.css',
})
export class EditGames {
  previewImage: string | ArrayBuffer | null = null;
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.previewImage = URL.createObjectURL(file);
    } else {
      this.previewImage = null;
    }
  }
}
