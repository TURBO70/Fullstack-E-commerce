import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { ProductsList } from './features/products/products-list/products-list';

import { Auth } from './features/auth/auth';

import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { Cart } from './features/cart/cart';

import { OrderComponent } from './features/profile/order_component/order_component';
import { ParentComponent } from './features/profile/parent-component/parent-component';
import { ProductDetailsComponent } from './features/products/product-details/product-details';
import { ProfileComponent } from './features/profile/profile-component/profile-component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Auth,
    Header,
    Footer,
    ProductsList,
    OrderComponent,
    ParentComponent,
    ProfileComponent,
    ProductDetailsComponent,
    Cart,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('e-commerce');

  url = '';

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.route.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.url = ev.url;
      }
    });

    this.url = this.route.url || '';
  }
}
