import { Component } from '@angular/core';
import { Navbar } from '../Widget/navbar/navbar';
import { Banner } from '../Widget/banner/banner';
import { ListGames } from '../Widget/list-games/list-games';

@Component({
  selector: 'app-home',
  imports: [Navbar, Banner, ListGames],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  games = [
    {
      imageUrl: 'pes.jpg',
      title: 'pes',
      description:
        ' An epic journey through your football creer. enjoy playing with your freinds.',
      price: '42$',
    },
  ];
}
