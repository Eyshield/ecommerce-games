import { Component, inject } from '@angular/core';
import { SideBarAdmin } from '../../../SharedC/Widget/side-bar-admin/side-bar-admin';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../Service/user-service';
import { user } from '../../../Models/User.models';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { destroyScope } from '../../../utils/destroyScope';

@Component({
  selector: 'app-edit-users',
  imports: [SideBarAdmin, ReactiveFormsModule],
  templateUrl: './edit-users.html',
  styleUrl: './edit-users.css',
})
export class EditUsers {
  userService = inject(UserService);
  router = inject(Router);
  private subscriptions = destroyScope();
  id: number = 0;
  route = inject(ActivatedRoute);
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.userService.getUserById(this.id).subscribe((data) => {
        this.userForm.patchValue({
          email: data.email,
          username: data.username,
          nom: data.nom,
          prenom: data.prenom,
        });
      }),
    );
  }

  editUser() {
    if (this.userForm.valid) {
      const user: user = {
        email: this.userForm.get('email')?.value!,
        username: this.userForm.get('email')?.value!,
        telephone: Number(this.userForm.get('telephone')?.value),
        nom: this.userForm.get('nom')?.value!,
        prenom: this.userForm.get('prenom')?.value!,
      };
      this.subscriptions.add(
        this.userService.addUser(user).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'User Edited Successfully',
              text: 'The user has been edited successfully.',
            });
            this.router.navigate(['/users']);
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error Editing User',
              text: 'There was an error editing the user. Please try again.',
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
