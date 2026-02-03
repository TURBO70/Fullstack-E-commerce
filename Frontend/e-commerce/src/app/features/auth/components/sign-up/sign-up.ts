import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user_service';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  constructor(private user: UserService) {}

  textReg = '^[A-Za-z]+(?: [A-Za-z]+)*$';
  passReg = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$';
  signUpForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(24),
      Validators.pattern(this.textReg),
    ]),

    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(24),
      Validators.pattern(this.textReg),
    ]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passReg)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  inValidName() {
    return (
      this.signUpForm.get('name')?.invalid &&
      (this.signUpForm.get('name')?.touched || this.signUpForm.get('name')?.dirty)
    );
  }

  inValidEmail() {
    return (
      this.signUpForm.get('email')?.invalid &&
      (this.signUpForm.get('email')?.touched || this.signUpForm.get('email')?.dirty)
    );
  }

  inValidCountry() {
    return (
      this.signUpForm.get('country')?.invalid &&
      (this.signUpForm.get('country')?.touched || this.signUpForm.get('country')?.dirty)
    );
  }

  inValidCity() {
    return (
      this.signUpForm.get('city')?.invalid &&
      (this.signUpForm.get('city')?.touched || this.signUpForm.get('city')?.dirty)
    );
  }

  inValidPassword() {
    return (
      this.signUpForm.get('password')?.invalid &&
      (this.signUpForm.get('password')?.touched || this.signUpForm.get('password')?.dirty)
    );
  }

  inValidConfirmPassword() {
    return (
      this.signUpForm.get('confirmPassword')?.invalid &&
      (this.signUpForm.get('confirmPassword')?.touched ||
        this.signUpForm.get('confirmPassword')?.dirty)
    );
  }
  @Output() isSignedEvent = new EventEmitter<boolean>();

  isSigned = signal(false);

  signUp() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      this.isSigned.set(true);
      let _user = {
        name: this.signUpForm.get('name')?.value!,
        email: this.signUpForm.get('email')?.value!,
        country: this.signUpForm.get('country')?.value!,
        city: this.signUpForm.get('city')?.value!,
        password: this.signUpForm.get('password')?.value!,
        role: 'customer',
      };
      this.user.addUser(_user).subscribe({
        next: (res) => {
          console.log(res);
          this.isSigned.set(false);
          this.isSignedEvent.emit(true);
        },
        error: (err) => {
          //console.log(err);
        },
      });
    }
  }
}