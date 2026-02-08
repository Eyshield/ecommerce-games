import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-side-bar-client',
  imports: [],
  templateUrl: './side-bar-client.html',
  styleUrl: './side-bar-client.css',
})
export class SideBarClient {
  selectedMenu = output<string>();
  select(section: string) {
    this.selectedMenu.emit(section);
  }
}
