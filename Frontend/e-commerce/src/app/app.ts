import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsList } from './features/products/products-list/products-list';

import { Auth } from './features/auth/auth';

import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { Cart } from "./features/cart/cart";
import { OrderComponent } from "./shared/components/order_component/order_component";
import { ProfileComponent } from "./shared/components/profile-component/profile-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Auth, Header, Footer, ProductsList, Cart, OrderComponent, ProfileComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('e-commerce');
}
