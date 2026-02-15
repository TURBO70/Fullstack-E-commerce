import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SignUp } from './components/sign-up/sign-up';
import { Login } from './components/login/login';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-auth',
  imports: [NgClass, SignUp, Login, RouterLink],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  constructor() {}
  
  reset($event: any) {
    if ($event === true) {
      console.log('here');
      this.activateLog();
      this.showMessage.set(true);
      this.messageOpacity.set(1);
      setTimeout(() => {
        this.messageOpacity.set(0);
        this.showMessage.set(false);
      }, 2000);
    }
  }
  isSigned = signal(false);
  showMessage = signal(false);
  messageOpacity = signal(1);
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
