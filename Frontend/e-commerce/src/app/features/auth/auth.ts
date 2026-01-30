import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { SignUp } from './components/sign-up/sign-up';
import { Login } from './components/login/login';

@Component({
  selector: 'app-auth',
  imports: [NgClass, SignUp, Login],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  isLogin = true;
  isSign = false;

  activateLog() {
    this.isLogin = true;
    this.isSign = false;
  }
  activateSign() {
    this.isLogin = false;
    this.isSign = true;
  }
}
