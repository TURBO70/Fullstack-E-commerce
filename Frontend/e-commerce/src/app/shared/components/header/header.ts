import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isMenuOpen = false;
  isOpenProfile = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  toggleProfile() {
    this.isOpenProfile = !this.isOpenProfile;
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isOpenProfile = false;
  }

}
