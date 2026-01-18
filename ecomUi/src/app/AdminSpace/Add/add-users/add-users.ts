import { Component, inject } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import { UserService } from '../../../Service/user-service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { user } from '../../../Models/User.models';
@Component({
  selector: 'app-add-users',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './add-users.html',
  styleUrl: './add-users.css',
})
export class AddUsers {
  userService = inject(UserService);
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
  });
  AddUser() {
    if (this.userForm.valid) {
      const user: user = {
        email: this.userForm.get('email')?.value!,
        username: this.userForm.get('username')?.value!,
        telephone: Number(this.userForm.get('telephone')?.value),
        nom: this.userForm.get('nom')?.value!,
        prenom: this.userForm.get('prenom')?.value!,
      };

      this.userService.addUser(user).subscribe((response) => {
        console.log('User added successfully', response);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
