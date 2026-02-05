import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();

  footerLinks = {
    product: [
      { label: 'Fonctionnalités', url: '/features' },
      { label: 'Tarifs', url: '/pricing' },
      { label: 'Documentation', url: '/docs' },
    ],
    company: [
      { label: 'À propos', url: '/about' },
      { label: 'Blog', url: '/blog' },
      { label: 'Carrières', url: '/careers' },
    ],
    legal: [
      { label: 'Confidentialité', url: '/privacy' },
      { label: 'Conditions', url: '/terms' },
      { label: 'Cookies', url: '/cookies' },
    ],
  };
}
