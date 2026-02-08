import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Service/auth-service';
import { user } from '../../Models/User.models';

@Component({
  selector: 'app-personnal-info',
  imports: [ReactiveFormsModule],
  templateUrl: './personnal-info.html',
  styleUrl: './personnal-info.css',
})
export class PersonnalInfo implements OnInit {
  personnalInfo = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
  });
  authService = inject(AuthService);
  ngOnInit() {
    const user = signal<user | null>(null);
    user.set(this.authService.getCurrentUserInfo());
    if (user() !== null) {
      const userData = user();
      this.personnalInfo.patchValue({
        nom: userData!.nom,
        prenom: userData!.prenom,
        username: userData!.username,
        email: userData!.email,
      });
    }
  }
}
