import { Component } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';

@Component({
  selector: 'app-add-games',
  imports: [SideBarAdmin],
  templateUrl: './add-games.html',
  styleUrl: './add-games.css',
})
export class AddGames {
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
