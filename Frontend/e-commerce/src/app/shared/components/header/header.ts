import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private route: Router) {}
  isMenuOpen = false;
  isOpenProfile = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isOpenProfile = false;
  }
  toggleProfile() {
    this.isOpenProfile = !this.isOpenProfile;
    this.isMenuOpen = false;
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isOpenProfile = false;
  }
  logout() {
    this.route.navigate([''], {
      replaceUrl: true,
    });
  }
}
