import { Component } from '@angular/core';
import { Navbar } from '../Widget/navbar/navbar';
import { SideBarClient } from '../Widget/side-bar-client/side-bar-client';

@Component({
  selector: 'app-dash-board-personel-account',
  imports: [Navbar, SideBarClient],
  templateUrl: './dash-board-personel-account.html',
  styleUrl: './dash-board-personel-account.css',
})
export class DashBoardPersonelAccount {}
