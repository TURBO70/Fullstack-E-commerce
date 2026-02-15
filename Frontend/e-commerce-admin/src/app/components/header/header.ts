import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Route, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(
    private route: Router,
    private authServ: AuthService,
  ) {}

  isMenuOpen = false;
  isOpenProfile = false;
  ngOnInit(): void {
    this.route.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.isOpenProfile = false;
      }
    });
  }
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
    this.authServ.logout();
    this.route.navigate([''], {
      replaceUrl: true,
    });
  }
  user = localStorage.getItem('currentUser');

  currentUser = this.user ? JSON.parse(this.user) : null;
}
