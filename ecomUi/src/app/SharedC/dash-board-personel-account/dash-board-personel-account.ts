import { Component } from '@angular/core';
import { Navbar } from '../Widget/navbar/navbar';
import { SideBarClient } from '../Widget/side-bar-client/side-bar-client';
import { PersonnalInfo } from '../personnal-info/personnal-info';
import { MyOrders } from '../my-orders/my-orders';

@Component({
  selector: 'app-dash-board-personel-account',
  imports: [Navbar, SideBarClient, PersonnalInfo, MyOrders],
  templateUrl: './dash-board-personel-account.html',
  styleUrl: './dash-board-personel-account.css',
})
export class DashBoardPersonelAccount {
  selectedSection: string = 'myAccount';
  onSelect(section: string) {
    this.selectedSection = section;
  }
}
