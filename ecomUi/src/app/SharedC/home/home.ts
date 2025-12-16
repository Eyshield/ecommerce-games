import { Component } from '@angular/core';
import { Navbar } from '../Widget/navbar/navbar';
import { Banner } from '../Widget/banner/banner';

@Component({
  selector: 'app-home',
  imports: [Navbar, Banner],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
