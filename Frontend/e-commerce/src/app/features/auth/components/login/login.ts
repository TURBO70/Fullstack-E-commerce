import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../core/services/user_service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private user: UserService,
    private route: Router,
  ) {}

  isLoading = signal(false);
  isFound = signal(false);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  inValidEmail() {
    return (
      this.loginForm.get('email')?.invalid &&
      (this.loginForm.get('email')?.touched || this.loginForm.get('email')?.dirty)
    );
  }

  inValidPassword() {
    return (
      this.loginForm.get('password')?.invalid &&
      (this.loginForm.get('password')?.touched || this.loginForm.get('password')?.dirty)
    );
  }
  found = false;
  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      let _user = {
        email: this.loginForm.get('email')?.value!,
        password: this.loginForm.get('password')?.value!,
      };
      this.isLoading.set(true);
      this.user.getAllUsers().subscribe({
        next: (res) => {
          const found = res.find((u) => u.email === _user.email && u.password === _user.password)!;
          
          if (found) {
            this.isLoading.set(false);
            this.route.navigate(['/home']);
          } else {
          this.isFound.set(true);

            this.isLoading.set(false);
          }
        },
        error: (err) => {
          this.isLoading.set(false);
        },
      });
    }
  }
}
