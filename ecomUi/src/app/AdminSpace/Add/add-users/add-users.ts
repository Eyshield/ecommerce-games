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
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { destroyScope } from '../../../utils/destroyScope';
@Component({
  selector: 'app-add-users',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './add-users.html',
  styleUrl: './add-users.css',
})
export class AddUsers {
  userService = inject(UserService);
  router = inject(Router);
  private subscriptions = destroyScope();
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
      this.subscriptions.add(
        this.userService.addUser(user).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'User Added Successfully',
              text: 'The user has been added successfully.',
            });
            this.router.navigate(['/users']);
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error Adding User',
              text: 'There was an error adding the user. Please try again.',
            });
          },
        }),
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill out the form correctly before submitting.',
      });
    }
  }
}
